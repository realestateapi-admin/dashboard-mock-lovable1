
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

type CancellationStep = 'initial' | 'questionnaire' | 'summary' | 'completed';

export const useCancellationState = (planName: string, isEnterprise: boolean, isAnnual: boolean) => {
  const [step, setStep] = useState<CancellationStep>('initial');
  const [reason, setReason] = useState('');
  const { toast } = useToast();
  
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
    setReason(''); // Reset reason when going back to initial
  };

  const handleCancellationComplete = () => {
    setStep('completed');
    
    // In a real app, this would make an API call to cancel the subscription
    toast({
      title: "Subscription Update",
      description: isEnterprise 
        ? "Your request has been received. Your Solutions Engineer will contact you shortly."
        : "Your subscription has been cancelled successfully.",
    });
    
    // Simulating backend email trigger
    console.log(`Sending email to assigned sales rep for ${planName} cancellation`);
  };

  return {
    step,
    reason,
    setReason,
    handleProceedToCancel,
    handleSubmitQuestionnaire,
    handleBackToInitial,
    handleCancellationComplete
  };
};
