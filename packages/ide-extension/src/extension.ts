import * as vscode from "vscode";
import { cyclomaticComplexity, getComplexityLabel } from "./complexity";

let zenZoneEnabled = true;
let dimDecorationType: vscode.TextEditorDecorationType | undefined;
let flareDecorationType: vscode.TextEditorDecorationType | undefined;
let lastFlareRanges: vscode.Range[] = [];

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("zenflare");
  zenZoneEnabled = config.get<boolean>("zenZone.enabled", true);
  const dimOpacity = config.get<string>("zenZone.dimOpacity", "0.35");

  dimDecorationType = vscode.window.createTextEditorDecorationType({
    opacity: dimOpacity,
  });
  flareDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: "rgba(255, 200, 100, 0.15)",
    borderWidth: "0 0 0 3px",
    borderColor: "rgba(255, 180, 80, 0.6)",
  });

  const toggleZenZone = vscode.commands.registerCommand(
    "zenflare.toggleZenZone",
    () => {
      zenZoneEnabled = !zenZoneEnabled;
      updateZenZone(vscode.window.activeTextEditor);
      vscode.window.showInformationMessage(
        `ZenFlare: Zen Zone ${zenZoneEnabled ? "on" : "off"}`
      );
    }
  );

  const showFlare = vscode.commands.registerCommand(
    "zenflare.showFlare",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;
      showFlareForSelection(editor);
    }
  );

  context.subscriptions.push(toggleZenZone, showFlare);
  context.subscriptions.push({
    dispose: () => {
      dimDecorationType?.dispose();
      flareDecorationType?.dispose();
    },
  });

  vscode.window.onDidChangeActiveTextEditor((editor) => {
    updateZenZone(editor);
    updateFlare(editor);
  });
  vscode.window.onDidChangeTextEditorSelection((e) => {
    updateZenZone(e.textEditor);
    updateFlare(e.textEditor);
  });
  vscode.workspace.onDidChangeTextDocument((e) => {
    const editor = vscode.window.activeTextEditor;
    if (editor?.document === e.document) {
      updateZenZone(editor);
      updateFlare(editor);
    }
  });

  updateZenZone(vscode.window.activeTextEditor);
  updateFlare(vscode.window.activeTextEditor);
}

function getFocusRange(editor: vscode.TextEditor): vscode.Range {
  const doc = editor.document;
  const cursor = editor.selection.active;
  const line = doc.lineAt(cursor.line);
  return new vscode.Range(line.range.start, line.range.end);
}

function updateZenZone(editor: vscode.TextEditor | undefined) {
  if (!editor || !zenZoneEnabled || !dimDecorationType) {
    if (editor && dimDecorationType) editor.setDecorations(dimDecorationType, []);
    return;
  }
  const focusRange = getFocusRange(editor);
  const dimRanges: vscode.Range[] = [];
  for (let i = 0; i < editor.document.lineCount; i++) {
    const r = editor.document.lineAt(i).range;
    if (!focusRange.intersection(r)) dimRanges.push(r);
  }
  editor.setDecorations(dimDecorationType, dimRanges);
}

function getCurrentBlockText(editor: vscode.TextEditor): string {
  const doc = editor.document;
  const cursor = editor.selection.active;
  const line = doc.lineAt(cursor.line);
  const start = Math.max(0, cursor.line - 50);
  const end = Math.min(doc.lineCount - 1, cursor.line + 50);
  const range = new vscode.Range(
    doc.lineAt(start).range.start,
    doc.lineAt(end).range.end
  );
  return doc.getText(range);
}

function updateFlare(editor: vscode.TextEditor | undefined) {
  if (!editor || !flareDecorationType) return;
  const config = vscode.workspace.getConfiguration("zenflare");
  const threshold = config.get<number>("flare.complexityThreshold", 10);
  const text = getCurrentBlockText(editor);
  const complexity = cyclomaticComplexity(text);
  const label = getComplexityLabel(complexity, threshold);
  if (label === "flare") {
    const line = editor.document.lineAt(editor.selection.active.line);
    lastFlareRanges = [line.range];
    editor.setDecorations(flareDecorationType, lastFlareRanges);
  } else {
    lastFlareRanges = [];
    editor.setDecorations(flareDecorationType, []);
  }
}

function showFlareForSelection(editor: vscode.TextEditor) {
  const range = editor.selection;
  if (range.isEmpty) {
    vscode.window.showInformationMessage(
      "ZenFlare: Select a function to see Flare refactor suggestion."
    );
    return;
  }
  const text = editor.document.getText(range);
  const complexity = cyclomaticComplexity(text);
  const config = vscode.workspace.getConfiguration("zenflare");
  const threshold = config.get<number>("flare.complexityThreshold", 10);
  if (flareDecorationType) {
    editor.setDecorations(flareDecorationType, [range]);
  }
  if (complexity >= threshold) {
    vscode.window
      .showInformationMessage(
        `ZenFlare: Complexity ${complexity} (≥${threshold}). Opening refactor suggestions...`
      )
      .then(() => {
        showRefactorPanel(editor, range, complexity, threshold);
      });
  } else {
    vscode.window.showInformationMessage(
      `ZenFlare: Complexity ${complexity}. Select more complex code to see refactor suggestions.`
    );
  }
}

async function showRefactorPanel(
  editor: vscode.TextEditor,
  range: vscode.Range,
  complexity: number,
  threshold: number
) {
  type RefactorAction = {
    label: string;
    description: string;
    action: "addTodo" | "extractFunction";
  };

  const items: (RefactorAction & vscode.QuickPickItem)[] = [
    {
      label: "Add TODO comment",
      description: "Mark this block for future refactor.",
      detail: `Complexity ${complexity} (≥${threshold})`,
      action: "addTodo",
    },
    {
      label: "Extract to function",
      description: "Wrap the selected block into a helper function.",
      detail: `Complexity ${complexity} (≥${threshold})`,
      action: "extractFunction",
    },
  ];

  const picked = await vscode.window.showQuickPick(items, {
    title: "ZenFlare refactor suggestions",
    placeHolder: "Choose a refactor action or press ESC to cancel",
  });

  if (!picked) {
    return;
  }

  const edit = new vscode.WorkspaceEdit();
  const doc = editor.document;

  if (picked.action === "addTodo") {
    const indent =
      doc.lineAt(range.start.line).firstNonWhitespaceCharacterIndex;
    const indentStr = " ".repeat(indent);
    edit.insert(
      doc.uri,
      range.start,
      `${indentStr}// TODO(ZenFlare): consider extracting this block into a separate function\n`
    );
  } else if (picked.action === "extractFunction") {
    const funcName = "extractedZenFlareBlock";
    edit.insert(doc.uri, range.start, `function ${funcName}() {\n`);
    edit.insert(doc.uri, range.end, `\n}\n`);
  }

  await vscode.workspace.applyEdit(edit);
  vscode.window.showInformationMessage(
    "ZenFlare: Refactor suggestion applied."
  );
}

export function deactivate() {
  dimDecorationType?.dispose();
  flareDecorationType?.dispose();
}
