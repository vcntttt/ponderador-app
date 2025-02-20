import { create } from "zustand";
import { createJSONStorage, persist } from 'expo-zustand-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ESCALA_SETTINGS_STORAGE_KEY } from "@/constants/storage";

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
      name: ESCALA_SETTINGS_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
