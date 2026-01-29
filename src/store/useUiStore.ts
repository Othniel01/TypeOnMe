import { create } from "zustand";
import { persist } from "zustand/middleware";

type UIState = {
  commandOpen: boolean;
  commandQuery: string;
  narrowLayout: boolean;
  setCommandOpen: (v: boolean) => void;
  setCommandQuery: (v: string) => void;
  toggleNarrowLayout: () => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      commandOpen: false,
      commandQuery: "",
      narrowLayout: false,
      setCommandOpen: (v) => set({ commandOpen: v }),
      setCommandQuery: (v) => set({ commandQuery: v }),
      toggleNarrowLayout: () => set((state) => ({ narrowLayout: !state.narrowLayout })),
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({ narrowLayout: state.narrowLayout }),
    }
  )
);
