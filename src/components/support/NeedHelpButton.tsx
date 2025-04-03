
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, Building2 } from "lucide-react";
import { useAccountExecutive } from '@/contexts/AccountExecutiveContext';

export const NeedHelpButton = () => {
  const { toggleWidget, isEnterprisePlan } = useAccountExecutive();

  return (
    <Button
      className={`fixed bottom-4 right-4 z-40 rounded-full shadow-lg ${
        isEnterprisePlan 
          ? 'bg-primary hover:bg-primary/90' 
          : 'bg-[#9b87f5] hover:bg-[#7E69AB]'
      }`}
      onClick={toggleWidget}
      size="icon"
    >
      {isEnterprisePlan ? (
        <Building2 className="h-5 w-5" />
      ) : (
        <MessageCircle className="h-5 w-5" />
      )}
      <span className="sr-only">
        {isEnterprisePlan ? "Contact Solutions Engineer" : "Need Help?"}
      </span>
    </Button>
  );
};
