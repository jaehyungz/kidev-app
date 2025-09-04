import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = { id: string; pw: string };
type Action = {
  setUser: (user: State) => void;
};

export const defaultInitState: State = {
  id: "",
  pw: "",
};

// Create your store, which includes both state and (optionally) actions
export const useAuthStore = createStore<State & Action>()(
  persist<State & Action>(
    (set) => ({
      ...defaultInitState,
      setUser: (user: State) => set(() => ({ ...user })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => window.localStorage),
    }
  )
);
