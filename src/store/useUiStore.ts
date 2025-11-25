import { create } from "zustand";

type UIState = {
  commandOpen: boolean;
  commandQuery: string;
  setCommandOpen: (v: boolean) => void;
  setCommandQuery: (v: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  commandOpen: false,
  commandQuery: "",
  setCommandOpen: (v) => set({ commandOpen: v }),
  setCommandQuery: (v) => set({ commandQuery: v }),
}));
