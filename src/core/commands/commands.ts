import { useNotesStore, type Note } from "@/store/useNotesStore";

export type CommandItem = {
  id: string;
  title: string;
  description?: string;
  shortcut?: string;
  action: () => void;
};

export function getCommands(query: string, notes: Note[]): CommandItem[] {
  const q = query.toLowerCase();

  const otherCommands: CommandItem[] = [
    {
      id: "new_note",
      title: "New Note",
      description: "Create a new note",
      shortcut: "Ctrl+N",
      action: () => useNotesStore.getState().addNote(),
    },
    {
      id: "export_note_json",
      title: "Export Note JSON",
      description: "Export current note as JSON",
      action: () => console.log("export JSON"),
    },
    {
      id: "import_note_json",
      title: "Import Note JSON",
      description: "Import note from JSON",
      action: () => console.log("import JSON"),
    },
    {
      id: "backup_notes",
      title: "Backup All Notes",
      description: "Backup notes to IndexedDB",
      action: () => console.log("backup notes"),
    },
  ];

  if (query.startsWith("@")) {
    const cmdQuery = q.slice(1);

    if (cmdQuery === "") {
      return otherCommands;
    }

    return otherCommands.filter((cmd) =>
      cmd.title.toLowerCase().includes(cmdQuery)
    );
  }

  const noteCommands: CommandItem[] = notes
    .filter((n) => n.title.toLowerCase().includes(q))
    .slice(0, 3)
    .map((note) => ({
      id: "note_" + note.id,
      title: note.title,
      description: "Open note",
      action: () => useNotesStore.getState().selectNote(note.id),
    }));

  return noteCommands;
}
