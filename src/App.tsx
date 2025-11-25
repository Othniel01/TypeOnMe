// App.tsx
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import NoteEditor from "@/features/editor/components/NoteEditor";
import { useNotesStore } from "@/store/useNotesStore";
import { EMPTY_DOC } from "@/lib/constants";
import { CommandPalette } from "@/components/CommandPallete";
import "./styles/global.css";

function App() {
  const notes = useNotesStore((s) => s.notes);
  const selectedNoteId = useNotesStore((s) => s.selectedNoteId);
  const updateNote = useNotesStore((s) => s.updateNote);
  const loadNotes = useNotesStore((s) => s.loadNotes);
  const selectNote = useNotesStore((s) => s.selectNote);
  const addNote = useNotesStore((s) => s.addNote);

  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await loadNotes();

      const { notes: currentNotes, selectedNoteId: currentSelected } =
        useNotesStore.getState();

      if (currentNotes.length === 0) {
        await addNote();
      } else if (!currentSelected) {
        selectNote(currentNotes[0].id);
      }

      // setLoading(false);
    };

    init();
  }, [loadNotes, selectNote, addNote]);

  // if (loading) return <div></div>;
  const note = notes.find((n) => n.id === selectedNoteId);
  if (!note) return <div>No notes yet</div>;

  return (
    <>
      {" "}
      <div className="bg-[#f2f2f2] relative w-full h-screen">
        <NavBar />
        <div className="absolute">
          <CommandPalette />
        </div>
        <div className="p-4 h-full text-sm w-full">
          <NoteEditor
            key={note.id}
            value={note.content ?? EMPTY_DOC}
            onChange={(content) => updateNote(note.id, content)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
