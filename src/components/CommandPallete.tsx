import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import {
  getCommands,
  type CommandItem as CmdItem,
} from "@/core/commands/commands";

import { useNotesStore } from "@/store/useNotesStore";
import { useUIStore } from "@/store/useUiStore";

export function CommandPalette() {
  const open = useUIStore((s) => s.commandOpen);
  const setOpen = useUIStore((s) => s.setCommandOpen);

  const query = useUIStore((s) => s.commandQuery);
  const setQuery = useUIStore((s) => s.setCommandQuery);

  const [commands, setCommands] = useState<CmdItem[]>([]);

  const notes = useNotesStore((s) => s.notes);
  const deleteNote = useNotesStore((s) => s.deleteNote);

  useEffect(() => {
    setCommands(getCommands(query, notes));
  }, [query, notes]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "F") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[600px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search notes or type @ for commands..."
            value={query}
            onValueChange={setQuery}
          />

          <CommandList>
            {commands.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}

            {commands.map((cmd) => (
              <CommandItem
                key={cmd.id}
                className="flex justify-between items-center"
                onSelect={() => {
                  cmd.action();
                  setOpen(false);
                  setQuery("");
                }}
              >
                <div className="flex flex-col">
                  <span>{cmd.title}</span>
                  {cmd.description && (
                    <span className="text-xs text-muted-foreground">
                      {cmd.description}
                    </span>
                  )}
                </div>

                {cmd.id.startsWith("note_") && (
                  <button
                    className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      const noteId = cmd.id.replace("note_", "");
                      deleteNote(noteId);
                    }}
                  >
                    Delete
                  </button>
                )}

                {cmd.shortcut && (
                  <CommandShortcut>{cmd.shortcut}</CommandShortcut>
                )}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
