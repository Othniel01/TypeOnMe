import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { useNotesStore } from "@/store/useNotesStore";
import {
  getCommands,
  type CommandItem as CmdItem,
} from "@/core/commands/commands";
import { ThemeToggle } from "@/components/ThemeToggle";

export function DropDown() {
  const addNote = useNotesStore((s) => s.addNote);
  const notes = useNotesStore((s) => s.notes);

  const commands: CmdItem[] = getCommands("@", notes);

  const handleCommand = (id: string) => {
    const cmd = commands.find((c) => c.id === id);
    if (cmd) cmd.action();
  };

  const handleNew = (e?: React.MouseEvent) => {
    e?.preventDefault();
    addNote();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreHorizontalIcon className="w-4 cursor-pointer ml-2 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-42" align="start">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleCommand("backup_notes")}
          >
            Backup
            <DropdownMenuShortcut>Ctrl⇧B</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleCommand("export_note_json")}
          >
            Export
            <DropdownMenuShortcut>Ctrl+E</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleCommand("import_note_json")}
          >
            Import
            <DropdownMenuShortcut>Ctrl+I</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" onClick={handleNew}>
            New
            <DropdownMenuShortcut>Alt+N</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <a target="blank" href="https://github.com/Othniel01/TypeOnMe">
            <DropdownMenuItem className="cursor-pointer">
              Github
            </DropdownMenuItem>
          </a>

          <DropdownMenuItem>
            <ThemeToggle />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
