
import React from 'react';
import {
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

interface CancellationConfirmationProps {
  onDontCancel: () => void;
  onConfirmCancel: () => void;
}

export const CancellationConfirmation = ({
  onDontCancel,
  onConfirmCancel,
}: CancellationConfirmationProps) => {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
        <AlertDialogDescription>
          Cancellation will be effective at the end of your subscription term. 
          You can continue using our services until then.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onDontCancel}>
          Don't Cancel
        </AlertDialogCancel>
        <AlertDialogAction 
          onClick={onConfirmCancel}
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          Cancel
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
};
