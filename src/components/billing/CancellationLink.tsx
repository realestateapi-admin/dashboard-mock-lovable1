
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CancellationModal } from './CancellationModal';

interface CancellationLinkProps {
  planName: string;
  isAnnual: boolean;
}

export const CancellationLink = ({ planName, isAnnual }: CancellationLinkProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full text-center mt-6">
        <Button 
          variant="link" 
          className="text-muted-foreground text-sm hover:text-destructive"
          onClick={() => setIsModalOpen(true)}
        >
          Need to cancel?
        </Button>
      </div>
      
      <CancellationModal 
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        planName={planName}
        isAnnual={isAnnual}
      />
    </>
  );
};
