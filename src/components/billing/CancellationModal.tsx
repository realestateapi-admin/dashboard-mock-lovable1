
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
import { CancellationConfirmation } from './cancellation/CancellationConfirmation';
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
    handleConfirmCancel,
    handleDontCancel,
    handleSubmitQuestionnaire,
    handleBackToInitial,
    handleCancellationComplete
  } = useCancellationState(planName, isEnterprise, isAnnual);

  // When step is 'initial' or 'confirmation', show the AlertDialog
  if (step === 'initial' || step === 'confirmation') {
    return (
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          {step === 'initial' && (
            <CancellationInitial
              planName={planName}
              isAnnual={isAnnual}
              isEnterprise={isEnterprise}
              onProceed={handleProceedToCancel}
            />
          )}
          
          {step === 'confirmation' && (
            <CancellationConfirmation
              onDontCancel={handleDontCancel}
              onConfirmCancel={handleConfirmCancel}
            />
          )}
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // For other steps, show the regular Dialog
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
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
