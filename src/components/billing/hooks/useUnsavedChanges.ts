
import { useState, useEffect, useRef } from "react";

export const useUnsavedChanges = (initialData: any) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const initialDataRef = useRef(initialData);
  const pendingNavigationRef = useRef<(() => void) | null>(null);

  // Update initial data reference when it changes
  useEffect(() => {
    initialDataRef.current = initialData;
  }, [initialData]);

  const setInitialData = (data: any) => {
    initialDataRef.current = data;
  };

  const checkForUnsavedChanges = (currentData: any) => {
    const hasChanges = JSON.stringify(currentData) !== JSON.stringify(initialDataRef.current);
    setHasUnsavedChanges(hasChanges);
    return hasChanges;
  };

  const handleNavigation = (navigationFn: () => void) => {
    if (hasUnsavedChanges) {
      pendingNavigationRef.current = navigationFn;
      setShowUnsavedDialog(true);
    } else {
      navigationFn();
    }
  };

  const confirmNavigation = () => {
    if (pendingNavigationRef.current) {
      pendingNavigationRef.current();
      pendingNavigationRef.current = null;
    }
    setShowUnsavedDialog(false);
    setHasUnsavedChanges(false);
  };

  const cancelNavigation = () => {
    pendingNavigationRef.current = null;
    setShowUnsavedDialog(false);
  };

  const markAsSaved = () => {
    setHasUnsavedChanges(false);
  };

  return {
    hasUnsavedChanges,
    showUnsavedDialog,
    setShowUnsavedDialog,
    checkForUnsavedChanges,
    handleNavigation,
    confirmNavigation,
    cancelNavigation,
    markAsSaved,
    setInitialData,
  };
};
