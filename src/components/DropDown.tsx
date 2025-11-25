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

export function DropDown() {
  const addNote = useNotesStore((s) => s.addNote);

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
          <DropdownMenuItem className="cursor-pointer">
            Backup
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">Export</DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">Import</DropdownMenuItem>

          {/* NEW note — use onClick to ensure handler runs */}
          <DropdownMenuItem className="cursor-pointer" onClick={handleNew}>
            New
            <DropdownMenuShortcut>⌘⇧⏎</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">Github</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Help</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
