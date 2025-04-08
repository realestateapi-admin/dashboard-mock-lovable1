
// This file now serves as an entry point for the refactored hooks
import { useUpgradeFlowState as useRefactoredUpgradeFlowState } from "./upgrade/useUpgradeFlowState";
export type { UpgradeStep } from "./upgrade/useWizardStepManagement";

// Export the refactored hook with the same interface
export const useUpgradeFlowState = useRefactoredUpgradeFlowState;
