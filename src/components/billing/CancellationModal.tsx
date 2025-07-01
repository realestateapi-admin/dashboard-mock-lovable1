
import React from 'react';
import { useAccountExecutive } from '@/contexts/AccountExecutiveContext';

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

  // Handle closing the modal - allow closing from initial or completed steps
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

  // Use Dialog component for all steps
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={step === 'initial' ? "sm:max-w-lg" : "sm:max-w-md"}>
        {step === 'initial' && (
          <CancellationInitial
            planName={planName}
            isAnnual={isAnnual}
            isEnterprise={isEnterprise}
            onProceed={() => {
              console.log('CancellationInitial onProceed called');
              handleProceedToCancel();
            }}
          />
        )}
        
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
