import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@/components/ui/shadcn-io/status";
import { DropDown } from "@/components/DropDown";
import DateTimeStamp from "./DateTimeStamp";

export default function NavBar() {
  return (
    <>
      <div className="absolute z-20 bg-[#f2f2f2] dark:bg-[#1c1c22f2] items-center flex gap-1 px-4 top-2 right-7">
        <Status
          className="rounded-full dark:bg-[#1c1c22f2] bg-[#f2f2f2] font-normal text-xs"
          status="maintenance"
        >
          <StatusIndicator />
          <StatusLabel />
        </Status>
        <p className="text-xs text-muted-foreground">
          <DateTimeStamp />
        </p>
        <DropDown />
      </div>
    </>
  );
}
