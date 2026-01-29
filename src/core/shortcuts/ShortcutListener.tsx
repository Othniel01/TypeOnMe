import { useEffect } from "react";
import { shortcutsMap } from "@/core/shortcuts/shortcuts";
import { useNotesStore } from "@/store/useNotesStore";
import { useUIStore } from "@/store/useUiStore";
import { getCommands } from "@/core/commands/commands";

export function ShortcutsListener() {
  const notes = useNotesStore((s) => s.notes);
  const selectedNoteId = useNotesStore((s) => s.selectedNoteId);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      let combo = "";
      if (e.ctrlKey) combo += "Ctrl+";
      if (e.shiftKey) combo += "Shift+";
      if (e.altKey) combo += "Alt+";

      const key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      combo += key;

      const commandId = shortcutsMap[combo];
      if (!commandId) return;

      e.preventDefault();

      switch (commandId) {
        case "new_note":
          useNotesStore.getState().addNote();
          break;

        case "toggle_narrow_layout":
          useUIStore.getState().toggleNarrowLayout();
          break;

        // case "delete_note":
        //   if (selectedNoteId) {
        //     useNotesStore.getState().deleteNote(selectedNoteId);
        //   }
        //   break;

        case "prev_note":
        case "next_note": {
          if (!selectedNoteId || notes.length === 0) break;
          const idx = notes.findIndex((n) => n.id === selectedNoteId);
          let newIdx = idx;
          if (commandId === "prev_note")
            newIdx = idx > 0 ? idx - 1 : notes.length - 1;
          if (commandId === "next_note")
            newIdx = idx < notes.length - 1 ? idx + 1 : 0;
          useNotesStore.getState().selectNote(notes[newIdx].id);
          break;
        }

        default: {
          const commands = getCommands("@", notes);
          const cmd = commands.find((c) => c.id === commandId);
          if (cmd) cmd.action();
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [notes, selectedNoteId]);

  return null;
}
