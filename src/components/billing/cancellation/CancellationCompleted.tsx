
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AccountExecutive } from '@/contexts/AccountExecutiveContext';

interface CancellationCompletedProps {
  ae?: AccountExecutive | null;
}

export const CancellationCompleted = ({
  ae,
}: CancellationCompletedProps) => {
  const navigate = useNavigate();

  return (
    <>
      <DialogHeader>
        <DialogTitle>Subscription Cancelled</DialogTitle>
        <DialogDescription>
          Your subscription has been cancelled successfully. Your service will remain active
          until the end of the current billing period.
        </DialogDescription>
      </DialogHeader>
      <div className="py-6 text-center">
        {ae && (
          <div className="mt-4 text-sm text-muted-foreground">
            Your account executive {ae.name} has been notified and will reach out shortly.
          </div>
        )}
      </div>
      <DialogFooter>
        <Button onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </Button>
      </DialogFooter>
    </>
  );
};
