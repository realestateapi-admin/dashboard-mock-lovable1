
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const ApiDocumentationLink = () => {
  // Function to generate and download PDF
  const downloadPdf = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = '/documentation/dashboard-api-recommendations.txt';
    link.download = 'dashboard-api-recommendations.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          API Documentation
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link to="/documentation/dashboard-api-recommendations.html" target="_blank">
            View in Browser
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadPdf}>
          <Download className="h-4 w-4 mr-2" />
          Download as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
