import Dexie from "dexie";
import type { Note } from "@/store/useNotesStore";

export class NotesDB extends Dexie {
  notes!: Dexie.Table<Note, string>;

  constructor() {
    super("notesDB");
    this.version(1).stores({
      notes: "id, title, updatedAt",
    });
  }
}

export const db = new NotesDB();
