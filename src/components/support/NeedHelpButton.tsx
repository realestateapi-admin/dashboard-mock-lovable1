
import React from 'react';
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useAccountExecutive } from '@/contexts/AccountExecutiveContext';

export const NeedHelpButton = () => {
  const { toggleWidget } = useAccountExecutive();

  return (
    <Button
      className="fixed bottom-4 right-4 z-40 rounded-full shadow-lg bg-[#9b87f5] hover:bg-[#7E69AB]"
      onClick={toggleWidget}
      size="icon"
    >
      <HelpCircle className="h-5 w-5" />
      <span className="sr-only">Need Help?</span>
    </Button>
  );
};
