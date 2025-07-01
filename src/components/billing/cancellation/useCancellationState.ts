
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

type CancellationStep = 'initial' | 'questionnaire' | 'summary' | 'completed';

export const useCancellationState = (planName: string, isEnterprise: boolean, isAnnual: boolean) => {
  const [step, setStep] = useState<CancellationStep>('initial');
  const [reason, setReason] = useState('');
  const { toast } = useToast();
  
  const handleProceedToCancel = () => {
    console.log('handleProceedToCancel called', { isEnterprise, isAnnual });
    
    // For Enterprise plan, just complete the cancellation process with SE outreach
    if (isEnterprise) {
      handleCancellationComplete();
      return;
    }
    
    // If annual contract, go directly to summary
    if (isAnnual) {
      console.log('Annual plan detected, going to summary step');
      setStep('summary');
    } else {
      // For monthly plans, show questionnaire first
      console.log('Monthly plan detected, going to questionnaire step');
      setStep('questionnaire');
    }
  };

  const handleSubmitQuestionnaire = () => {
    console.log('handleSubmitQuestionnaire called, going to summary');
    setStep('summary');
  };

  const handleBackToInitial = () => {
    console.log('handleBackToInitial called');
    setStep('initial');
    setReason(''); // Reset reason when going back to initial
  };

  const handleCancellationComplete = () => {
    console.log('handleCancellationComplete called');
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
