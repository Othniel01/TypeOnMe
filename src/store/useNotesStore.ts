import { create } from "zustand";
import { EMPTY_DOC } from "@/lib/constants";
import { db } from "@/core/storage/db";
import type { JSONContent } from "@/components/ui/shadcn-io/editor";

export type Note = {
  id: string;
  title: string;
  content: JSONContent;
  updatedAt: number;
};

type NotesStore = {
  notes: Note[];
  selectedNoteId: string | null;
  addNote: (data?: {
    title?: string;
    content?: JSONContent;
  }) => Promise<string>;
  updateNote: (id: string, content: JSONContent) => Promise<void>;
  selectNote: (id: string) => void;
  deleteNote: (id: string) => Promise<void>;
  loadNotes: () => Promise<void>;
};

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  selectedNoteId: null,

  loadNotes: async () => {
    const allNotes = await db.notes.toArray();
    set({ notes: allNotes });
    if (allNotes.length > 0 && !get().selectedNoteId) {
      set({ selectedNoteId: allNotes[0].id });
    }
  },

  addNote: async (data?: { title?: string; content?: JSONContent }) => {
    const id = crypto.randomUUID();
    const newNote: Note = {
      id,
      title: data?.title ?? "Untitled Note",
      content: data?.content ?? EMPTY_DOC,
      updatedAt: Date.now(),
    };
    await db.notes.add(newNote);
    set((state) => ({
      notes: [...state.notes, newNote],
      selectedNoteId: id,
    }));
    return id;
  },

  updateNote: async (id, content) => {
    const updatedAt = Date.now();

    let newTitle = "Untitled Note";

    try {
      const firstNode = content.content?.[0];
      if (
        firstNode?.type === "paragraph" &&
        typeof firstNode.content?.[0]?.text === "string"
      ) {
        const text = firstNode.content[0].text.trim();
        newTitle = text ? text.slice(0, 6) : `Note ${get().notes.length + 1}`;
      } else {
        newTitle = `Note ${get().notes.length + 1}`;
      }
    } catch (err) {
      console.error("Failed to parse note title:", err);
      newTitle = `Note ${get().notes.length + 1}`;
    }

    await db.notes.update(id, { content, updatedAt, title: newTitle });

    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, content, updatedAt, title: newTitle } : note
      ),
    }));
  },

  deleteNote: async (id) => {
    await db.notes.delete(id);
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
      selectedNoteId:
        state.selectedNoteId === id
          ? state.notes[0]?.id || null
          : state.selectedNoteId,
    }));
  },

  deleteCurrentNote: async () => {
    const state = get();
    if (!state.selectedNoteId) return;

    await state.deleteNote(state.selectedNoteId);
  },

  nextNote: () => {
    const state = get();
    const idx = state.notes.findIndex((n) => n.id === state.selectedNoteId);
    if (idx < state.notes.length - 1) {
      state.selectNote(state.notes[idx + 1].id);
    }
  },

  prevNote: () => {
    const state = get();
    const idx = state.notes.findIndex((n) => n.id === state.selectedNoteId);
    if (idx > 0) {
      state.selectNote(state.notes[idx - 1].id);
    }
  },

  selectNote: (id) => set({ selectedNoteId: id }),
}));
