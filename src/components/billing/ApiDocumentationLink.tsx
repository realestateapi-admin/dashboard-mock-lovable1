
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ApiDocumentationLink = () => {
  return (
    <Button variant="outline" className="flex items-center gap-2" asChild>
      <Link to="/documentation/dashboard-api-recommendations.html" target="_blank">
        <FileText className="h-4 w-4" />
        View API Documentation
      </Link>
    </Button>
  );
};
