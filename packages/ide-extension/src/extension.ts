import * as vscode from "vscode";

let zenZoneEnabled = true;
let flareDecoration: vscode.TextEditorDecorationType | undefined;

export function activate(context: vscode.ExtensionContext) {
  // Zen Zone: dim everything except current function/block
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

  // Flare: show glow when complexity is high; on click → refactor
  const showFlare = vscode.commands.registerCommand(
    "zenflare.showFlare",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;
      showFlareForSelection(editor);
    }
  );

  context.subscriptions.push(toggleZenZone, showFlare);

  vscode.window.onDidChangeActiveTextEditor(updateZenZone);
  vscode.workspace.onDidChangeTextDocument((e) => {
    if (vscode.window.activeTextEditor?.document === e.document) {
      updateZenZone(vscode.window.activeTextEditor);
    }
  });

  const config = vscode.workspace.getConfiguration("zenflare");
  zenZoneEnabled = config.get<boolean>("zenZone.enabled", true);

  updateZenZone(vscode.window.activeTextEditor);
}

function updateZenZone(editor: vscode.TextEditor | undefined) {
  if (!editor || !zenZoneEnabled) {
    clearZenZone(editor);
    return;
  }
  const doc = editor.document;
  const cursor = editor.selection.active;
  const line = doc.lineAt(cursor.line);
  const range = new vscode.Range(line.range.start, line.range.end);
  const dimRanges: vscode.Range[] = [];
  for (let i = 0; i < doc.lineCount; i++) {
    const r = doc.lineAt(i).range;
    if (!range.intersection(r)) dimRanges.push(r);
  }
  editor.setDecorations(getDimDecoration(), dimRanges);
}

function getDimDecoration(): vscode.TextEditorDecorationType {
  return vscode.window.createTextEditorDecorationType({
    opacity: "0.35",
  });
}

function clearZenZone(editor: vscode.TextEditor | undefined) {
  if (editor) editor.setDecorations(getDimDecoration(), []);
}

function showFlareForSelection(editor: vscode.TextEditor) {
  const range = editor.selection;
  if (range.isEmpty) {
    vscode.window.showInformationMessage(
      "ZenFlare: Select a function to see Flare refactor suggestion."
    );
    return;
  }
  vscode.window.showInformationMessage(
    "ZenFlare: Flare refactor (AI) will suggest a simpler version here. Coming soon."
  );
}

export function deactivate() {
  flareDecoration?.dispose();
}
