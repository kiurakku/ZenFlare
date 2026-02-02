import * as vscode from "vscode";

let zenZoneEnabled = true;
let dimDecorationType: vscode.TextEditorDecorationType | undefined;
let flareDecorationType: vscode.TextEditorDecorationType | undefined;

export function activate(context: vscode.ExtensionContext) {
  dimDecorationType = vscode.window.createTextEditorDecorationType({
    opacity: "0.35",
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

  vscode.window.onDidChangeActiveTextEditor(updateZenZone);
  vscode.window.onDidChangeTextEditorSelection((e) => updateZenZone(e.textEditor));
  vscode.workspace.onDidChangeTextDocument((e) => {
    if (vscode.window.activeTextEditor?.document === e.document) {
      updateZenZone(vscode.window.activeTextEditor);
    }
  });

  const config = vscode.workspace.getConfiguration("zenflare");
  zenZoneEnabled = config.get<boolean>("zenZone.enabled", true);

  updateZenZone(vscode.window.activeTextEditor);
}

function getFocusRange(editor: vscode.TextEditor): vscode.Range {
  const doc = editor.document;
  const cursor = editor.selection.active;
  const line = doc.lineAt(cursor.line);
  return new vscode.Range(line.range.start, line.range.end);
}

function updateZenZone(editor: vscode.TextEditor | undefined) {
  if (!editor || !zenZoneEnabled || !dimDecorationType) {
    if (editor && dimDecorationType) {
      editor.setDecorations(dimDecorationType, []);
    }
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

function clearZenZone(editor: vscode.TextEditor | undefined) {
  if (editor && dimDecorationType) editor.setDecorations(dimDecorationType, []);
}

function showFlareForSelection(editor: vscode.TextEditor) {
  const range = editor.selection;
  if (range.isEmpty) {
    vscode.window.showInformationMessage(
      "ZenFlare: Select a function to see Flare refactor suggestion."
    );
    return;
  }
  if (flareDecorationType) {
    editor.setDecorations(flareDecorationType, [range]);
  }
  vscode.window.showInformationMessage(
    "ZenFlare: Flare refactor (AI) will suggest a simpler version here. Use ZenFlare cloud for full refactor."
  );
}

export function deactivate() {
  dimDecorationType?.dispose();
  flareDecorationType?.dispose();
}
