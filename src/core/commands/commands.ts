import { EMPTY_DOC } from "@/lib/constants";
import JSZip from "jszip";
import { useNotesStore, type Note } from "@/store/useNotesStore";

export type CommandItem = {
  id: string;
  title: string;
  description?: string;
  shortcut?: string;
  action: () => void;
};

export function getCommands(query: string, notes: Note[]): CommandItem[] {
  const lowerQuery = query.toLowerCase();

  const noteCommands: CommandItem[] = notes
    .filter((note) => note.title.toLowerCase().includes(lowerQuery))
    .slice(0, 3)
    .map((note) => ({
      id: "note_" + note.id,
      title: note.title,
      description: "Open note",
      action: () => {
        useNotesStore.getState().selectNote(note.id);
      },
    }));

  const otherCommands: CommandItem[] = [
    {
      id: "new_note",
      title: "New Note",
      description: "Create a new note",
      shortcut: "Alt+N",
      action: async () => await useNotesStore.getState().addNote(),
    },
    {
      id: "export_note_json",
      title: "Export Note JSON",
      description: "Export current note as JSON file",
      shortcut: "Ctrl+E",
      action: () => {
        const selectedId = useNotesStore.getState().selectedNoteId;
        const note = useNotesStore
          .getState()
          .notes.find((n) => n.id === selectedId);

        if (!note) {
          alert("No note selected to export!");
          return;
        }

        const exportData = {
          title: note.title,
          content: note.content,
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${note.title || "untitled_note"}.json`;
        a.click();
        URL.revokeObjectURL(url);
      },
    },
    {
      id: "import_note_json",
      title: "Import Note JSON",
      description: "Import note from JSON",
      shortcut: "Ctrl+I",
      action: () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = async (e: Event) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (!file) return;

          try {
            const text = await file.text();
            const json = JSON.parse(text);

            const content = json.content ?? EMPTY_DOC;
            const title = json.title || "Imported Note";

            await useNotesStore.getState().addNote({ title, content });
          } catch (err) {
            console.error("Failed to import note:", err);
            alert("Invalid JSON file.");
          }
        };
        input.click();
      },
    },
    // {
    //   id: "delete_note",
    //   title: "Delete Current Note",
    //   description: "Delete the selected note",
    //   shortcut: "Alt+D",
    //   action: () => {
    //     const store = useNotesStore.getState();
    //     const id = store.selectedNoteId;
    //     if (!id) return;

    //     const confirmed = confirm("Are you sure you want to delete this note?");
    //     if (!confirmed) return;

    //     store.deleteNote(id);
    //   },
    // },
    {
      id: "prev_note",
      title: "Previous Note",
      description: "Switch to previous note",
      shortcut: "Alt+ArrowUp",
      action: () => {
        const store = useNotesStore.getState();
        const notes = store.notes;
        const selected = store.selectedNoteId;

        if (!selected || notes.length === 0) return;

        const index = notes.findIndex((n) => n.id === selected);
        const prevIndex = (index - 1 + notes.length) % notes.length;

        store.selectNote(notes[prevIndex].id);
      },
    },
    {
      id: "next_note",
      title: "Next Note",
      description: "Switch to next note",
      shortcut: "Alt+ArrowDown",
      action: () => {
        const store = useNotesStore.getState();
        const notes = store.notes;
        const selected = store.selectedNoteId;

        if (!selected || notes.length === 0) return;

        const index = notes.findIndex((n) => n.id === selected);
        const nextIndex = (index + 1) % notes.length;

        store.selectNote(notes[nextIndex].id);
      },
    },
    {
      id: "backup_notes",
      title: "Backup All Notes",
      description: "Backup all notes as a ZIP file",
      shortcut: "Ctrl+Shift+B",
      action: async () => {
        const notes = useNotesStore.getState().notes;
        if (notes.length === 0) {
          alert("No notes to backup!");
          return;
        }

        const zip = new JSZip();

        notes.forEach((note) => {
          const noteData = {
            title: note.title,
            content: note.content,
            updatedAt: note.updatedAt,
          };
          zip.file(
            `${note.title || "untitled_note"}_${note.id}.json`,
            JSON.stringify(noteData, null, 2)
          );
        });

        const content = await zip.generateAsync({ type: "blob" });

        const url = URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = url;
        a.download = `notes_backup_${Date.now()}.zip`;
        a.click();
        URL.revokeObjectURL(url);
      },
    },
  ];

  if (query.startsWith("@")) {
    const cmdQuery = query.slice(1).toLowerCase();
    if (cmdQuery === "") return otherCommands;
    return otherCommands.filter((cmd) =>
      cmd.title.toLowerCase().includes(cmdQuery)
    );
  }

  return [...noteCommands];
}
