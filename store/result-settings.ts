import { create } from "zustand";
import { createJSONStorage, persist } from 'expo-zustand-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";

type Store = {
  numColumns: number;
  ascending: boolean;
  setNumColumns: (num: number) => void;
  toggleAscending: () => void;
};

export const useResultSettingsStore = create<Store>()(
  persist(
    (set) => ({
      numColumns: 2,
      ascending: true,
      setNumColumns: (num: number) => set({ numColumns: num }),
      toggleAscending: () => set((state) => ({ ascending: !state.ascending })),
    }),
    {
      name: "result-settings",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
