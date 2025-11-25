import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@/components/ui/shadcn-io/status";
import { DropDown } from "@/components/DropDown";

export default function NavBar() {
  return (
    <>
      <div className="absolute z-20 bg-[#f2f2f2] items-center flex gap-1 px-4 top-2 right-7">
        <Status className="rounded-full font-normal text-xs" status="online">
          <StatusIndicator />
          <StatusLabel />
        </Status>
        <p className="text-xs text-muted-foreground">[11/24/25 mon 3:47 p]</p>
        <DropDown />
      </div>
    </>
  );
}
