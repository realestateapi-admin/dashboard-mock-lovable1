
import { create } from "zustand";

interface UpgradeWizardState {
  showWizard: boolean;
  startWizard: () => void;
  closeWizard: () => void;
}

export const useUpgradeWizard = create<UpgradeWizardState>((set) => ({
  showWizard: false,
  startWizard: () => set({ showWizard: true }),
  closeWizard: () => set({ showWizard: false }),
}));
