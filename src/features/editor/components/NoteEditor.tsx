"use client";
import {
  EditorProvider,
  EditorFloatingMenu,
  EditorBubbleMenu,
  EditorNodeText,
  EditorNodeHeading1,
  EditorFormatBold,
  EditorNodeBulletList,
  EditorNodeQuote,
} from "@/components/ui/shadcn-io/editor";
import type { JSONContent, Editor } from "@/components/ui/shadcn-io/editor";

type Props = {
  value: JSONContent;
  onChange: (content: JSONContent) => void;
};

export default function NoteEditor({ value, onChange }: Props) {
  const handleUpdate = ({ editor }: { editor: Editor }) => {
    onChange(editor.getJSON());
  };

  return (
    <EditorProvider
      content={value}
      onUpdate={handleUpdate}
      placeholder="Click Here & Start typing..."
      className="w-full h-full overflow-y-auto"
    >
      <EditorFloatingMenu>
        <EditorNodeHeading1 hideName />
        <EditorNodeBulletList hideName />
        <EditorNodeQuote hideName />
      </EditorFloatingMenu>

      <EditorBubbleMenu>
        <EditorNodeText />
        <EditorFormatBold />
      </EditorBubbleMenu>
    </EditorProvider>
  );
}
