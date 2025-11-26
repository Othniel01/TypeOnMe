import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleQuestionMarkIcon } from "lucide-react";

export function Help() {
  return (
    <>
      <Dialog>
        <DialogTrigger className=" items-center flex">
          <Tooltip>
            <TooltipTrigger>
              <CircleQuestionMarkIcon className="w-4 cursor-pointer text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Help</p>
            </TooltipContent>
          </Tooltip>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Help</DialogTitle>
            <DialogDescription>
              List of all the commands to help you get started. <br /> Use / to
              open text commands.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="bg-muted flex justify-between text-xs  py-5 rounded-md px-4">
              <h2 className="text-sm ">Navigation/Command Menu</h2>
              <p className="text-[#858585]">Ctrl+⇧+F</p>
            </div>
            <div className="bg-muted flex justify-between text-xs   py-5 rounded-md px-4">
              <h2 className="text-sm ">Previous Note</h2>
              <p className="text-[#858585]">Alt+ArrowUp</p>
            </div>
            <div className="bg-muted flex justify-between text-xs  py-5 rounded-md px-4">
              <h2 className="text-sm ">Next Note</h2>
              <p className="text-[#858585]">Alt+ArrowDown</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
