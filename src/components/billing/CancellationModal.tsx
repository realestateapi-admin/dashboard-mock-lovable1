
import React from 'react';
import { useAccountExecutive } from '@/contexts/AccountExecutiveContext';

import {
  AlertDialog,
  AlertDialogContent,
} from '@/components/ui/alert-dialog';

import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

// Import our cancellation components
import { CancellationInitial } from './cancellation/CancellationInitial';
import { CancellationQuestionnaire } from './cancellation/CancellationQuestionnaire';
import { CancellationSummary } from './cancellation/CancellationSummary';
import { CancellationCompleted } from './cancellation/CancellationCompleted';

// Import the cancellation state hook
import { useCancellationState } from './cancellation/useCancellationState';

interface CancellationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  isAnnual: boolean;
}

export const CancellationModal = ({
  isOpen,
  onOpenChange,
  planName,
  isAnnual,
}: CancellationModalProps) => {
  const { ae } = useAccountExecutive();
  
  // Check if current plan is Enterprise
  const isEnterprise = planName.toLowerCase() === 'enterprise';
  
  // Use the cancellation state hook with all required parameters
  const {
    step,
    reason,
    setReason,
    handleProceedToCancel,
    handleSubmitQuestionnaire,
    handleBackToInitial,
    handleCancellationComplete
  } = useCancellationState(planName, isEnterprise, isAnnual);

  // Handle closing the modal - prevent closing during flow transitions
  const handleOpenChange = (open: boolean) => {
    console.log('Modal handleOpenChange called:', { open, currentStep: step });
    
    if (!open) {
      // Only allow closing if we're on initial step or completed step
      if (step === 'initial' || step === 'completed') {
        console.log('Allowing modal close from step:', step);
        handleBackToInitial();
        onOpenChange(false);
      } else {
        console.log('Preventing modal close from step:', step);
        // Prevent closing during the flow
        return;
      }
    } else {
      onOpenChange(true);
    }
  };

  // When step is 'initial', show the AlertDialog
  if (step === 'initial') {
    return (
      <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
        <AlertDialogContent>
          <CancellationInitial
            planName={planName}
            isAnnual={isAnnual}
            isEnterprise={isEnterprise}
            onProceed={() => {
              console.log('CancellationInitial onProceed called');
              handleProceedToCancel();
            }}
          />
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // For other steps, show the regular Dialog with forced open state
  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        {step === 'questionnaire' && (
          <CancellationQuestionnaire
            reason={reason}
            setReason={setReason}
            onSubmit={handleSubmitQuestionnaire}
          />
        )}
        
        {step === 'summary' && (
          <CancellationSummary
            isAnnual={isAnnual}
            planName={planName}
            onGoBack={handleBackToInitial}
            onComplete={handleCancellationComplete}
          />
        )}
        
        {step === 'completed' && (
          <CancellationCompleted ae={ae} />
        )}
      </DialogContent>
    </Dialog>
  );
};
