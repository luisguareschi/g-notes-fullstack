import { create } from "zustand";
import { persist } from "zustand/middleware";

type LocalSettingsState = {
  selectedVaultId: string | null;
};

type LocalSettingsActions = {
  setSelectedVaultId: (vaultId: LocalSettingsState["selectedVaultId"]) => void;
};

type LocalSettingsStore = LocalSettingsState & LocalSettingsActions;

const initialState: LocalSettingsState = {
  selectedVaultId: null,
};

export const useLocalSettings = create<LocalSettingsStore>()(
  persist(
    (set) => ({
      ...initialState,
      setSelectedVaultId: (vaultId) => set({ selectedVaultId: vaultId }),
    }),
    {
      name: "g-notes-local-settings", // storage key in localStorage
    },
  ),
);
