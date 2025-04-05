
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

// Import our new components
import { CancellationInitial } from './cancellation/CancellationInitial';
import { CancellationQuestionnaire } from './cancellation/CancellationQuestionnaire';
import { CancellationSummary } from './cancellation/CancellationSummary';
import { CancellationCompleted } from './cancellation/CancellationCompleted';

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
  const [step, setStep] = React.useState<'initial' | 'questionnaire' | 'summary' | 'completed'>('initial');
  const [reason, setReason] = React.useState('');

  // Check if current plan is Enterprise
  const isEnterprise = planName.toLowerCase() === 'enterprise';

  const handleProceedToCancel = () => {
    // For Enterprise plan, just complete the cancellation process with SE outreach
    if (isEnterprise) {
      handleCancellationComplete();
      return;
    }
    
    // If annual contract, no questionnaire is shown
    if (isAnnual) {
      setStep('summary');
    } else {
      setStep('questionnaire');
    }
  };

  const handleSubmitQuestionnaire = () => {
    setStep('summary');
  };

  const handleBackToInitial = () => {
    setStep('initial');
  };

  const handleCancellationComplete = () => {
    setStep('completed');
    
    // In a real app, this would make an API call to cancel the subscription
    console.log(`Sending email to assigned sales rep for ${planName} cancellation`);
  };

  if (step === 'initial') {
    return (
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <CancellationInitial
            planName={planName}
            isAnnual={isAnnual}
            isEnterprise={isEnterprise}
            onProceed={handleProceedToCancel}
          />
        </AlertDialogContent>
      </AlertDialog>
    );
  }

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
