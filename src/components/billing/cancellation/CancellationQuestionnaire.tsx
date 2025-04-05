
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface CancellationQuestionnaireProps {
  reason: string;
  setReason: (reason: string) => void;
  onSubmit: () => void;
}

export const CancellationQuestionnaire = ({
  reason,
  setReason,
  onSubmit,
}: CancellationQuestionnaireProps) => {
  const navigate = useNavigate();

  return (
    <>
      <DialogHeader>
        <DialogTitle>Help us improve</DialogTitle>
        <DialogDescription>
          We're sorry to see you go. Please let us know why you're cancelling.
        </DialogDescription>
      </DialogHeader>
      
      <div className="py-4">
        <RadioGroup value={reason} onValueChange={setReason}>
          <div className="flex items-start space-x-2 my-2">
            <RadioGroupItem value="too_expensive" id="too_expensive" />
            <Label htmlFor="too_expensive" className="font-normal">
              Too expensive
            </Label>
          </div>
          <div className="flex items-start space-x-2 my-2">
            <RadioGroupItem value="missing_features" id="missing_features" />
            <Label htmlFor="missing_features" className="font-normal">
              Missing features I need
            </Label>
          </div>
          <div className="flex items-start space-x-2 my-2">
            <RadioGroupItem value="difficult" id="difficult" />
            <Label htmlFor="difficult" className="font-normal">
              Product was difficult to use
            </Label>
          </div>
          <div className="flex items-start space-x-2 my-2">
            <RadioGroupItem value="not_needed" id="not_needed" />
            <Label htmlFor="not_needed" className="font-normal">
              No longer need it
            </Label>
          </div>
          <div className="flex items-start space-x-2 my-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="font-normal">
              Other reason
            </Label>
          </div>
        </RadioGroup>
      </div>
    
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Keep My Subscription
          </Button>
        </DialogClose>
        <Button 
          variant="destructive" 
          onClick={onSubmit}
          disabled={!reason}
        >
          Continue
        </Button>
      </DialogFooter>
    </>
  );
};
