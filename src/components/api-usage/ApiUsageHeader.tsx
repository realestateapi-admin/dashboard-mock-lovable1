
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { History, FileDown } from "lucide-react";

export const ApiUsageHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">API Usage</h2>
        <p className="text-muted-foreground">
          Monitor your API usage and consumption
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <Link to="/dashboard/usage/history">
            <History className="mr-2 h-4 w-4" />
            Usage History
          </Link>
        </Button>
        <Button variant="outline" className="w-full sm:w-auto">
          <FileDown className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
    </div>
  );
};
