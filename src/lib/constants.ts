import type { JSONContent } from "@/components/ui/shadcn-io/editor";

export const EMPTY_DOC: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [],
    },
  ],
};
