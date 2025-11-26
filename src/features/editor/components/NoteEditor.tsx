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
  EditorNodeCode,
  EditorNodeTable,
  EditorSelector,
  EditorNodeHeading2,
  EditorNodeOrderedList,
  EditorNodeHeading3,
  EditorFormatUnderline,
  EditorFormatItalic,
  EditorNodeTaskList,
  EditorFormatStrike,
  EditorFormatCode,
  EditorFormatSuperscript,
  EditorFormatSubscript,
  EditorLinkSelector,
  EditorClearFormatting,
  EditorTableMenu,
  EditorTableColumnMenu,
  EditorTableColumnBefore,
  EditorTableColumnAfter,
  EditorTableColumnDelete,
  EditorTableRowBefore,
  EditorTableRowMenu,
  EditorTableRowDelete,
  EditorTableRowAfter,
  // EditorTableGlobalMenu,
  // EditorTableHeaderColumnToggle,
  // EditorTableHeaderRowToggle,
  // EditorTableDelete,
  // EditorTableMergeCells,
  // EditorTableSplitCell,
  // EditorTableFix,
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
      placeholder="Click Here..."
      className="w-full h-full overflow-y-auto"
    >
      <EditorFloatingMenu>
        <EditorNodeHeading1 hideName />
        <EditorNodeBulletList hideName />
        <EditorNodeQuote hideName />
        <EditorNodeCode hideName />
        <EditorNodeTable hideName />
      </EditorFloatingMenu>

      <EditorBubbleMenu>
        <EditorSelector title="Text">
          <EditorNodeText />
          <EditorNodeHeading1 />
          <EditorNodeHeading2 />
          <EditorNodeHeading3 />
          <EditorNodeBulletList />
          <EditorNodeOrderedList />
          <EditorNodeTaskList />
          <EditorNodeQuote />
          <EditorNodeCode />
        </EditorSelector>
        <EditorSelector title="Format">
          <EditorFormatBold />
          <EditorFormatItalic />
          <EditorFormatUnderline />
          <EditorFormatStrike />
          <EditorFormatCode />
          <EditorFormatSuperscript />
          <EditorFormatSubscript />
        </EditorSelector>
        <EditorLinkSelector />
        <EditorClearFormatting />
      </EditorBubbleMenu>
      <EditorTableMenu>
        <EditorTableColumnMenu>
          <EditorTableColumnBefore />
          <EditorTableColumnAfter />
          <EditorTableColumnDelete />
        </EditorTableColumnMenu>
        <EditorTableRowMenu>
          <EditorTableRowBefore />
          <EditorTableRowAfter />
          <EditorTableRowDelete />
        </EditorTableRowMenu>
        {/* 
        <EditorTableGlobalMenu>
          <EditorTableHeaderColumnToggle />
          <EditorTableHeaderRowToggle />
          <EditorTableDelete />
          <EditorTableMergeCells />
          <EditorTableSplitCell />
          <EditorTableFix />
        </EditorTableGlobalMenu> */}
      </EditorTableMenu>
    </EditorProvider>
  );
}
