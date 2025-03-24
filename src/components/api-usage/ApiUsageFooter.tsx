
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

export const ApiUsageFooter = () => {
  return (
    <div className="bg-muted/20 border rounded-lg p-4 space-y-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h3 className="text-sm font-medium">Need more detailed usage analytics?</h3>
          <p className="text-sm text-muted-foreground">
            View your detailed API usage history with advanced filtering options.
          </p>
        </div>
        <Button asChild variant="default" className="bg-[#5014d0] hover:bg-[#5014d0]/90 w-full sm:w-auto">
          <Link to="/dashboard/usage/history">
            <History className="mr-2 h-4 w-4" />
            View Full Usage History
          </Link>
        </Button>
      </div>
    </div>
  );
};
