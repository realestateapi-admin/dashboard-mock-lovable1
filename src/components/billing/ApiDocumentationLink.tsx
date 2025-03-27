
import React from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const ApiDocumentationLink = () => {
  // Function to handle downloading the documentation
  const downloadPdf = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = '/documentation/dashboard-api-recommendations.txt';
    link.download = 'dashboard-api-recommendations.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Serve documentation from public folder instead of a route that could be protected
  const documentationPath = process.env.PUBLIC_URL + "/documentation/dashboard-api-recommendations.html";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          API Documentation
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <a 
            href={documentationPath} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex w-full items-center"
            onClick={(e) => {
              e.preventDefault();
              // Open the file directly using the window.open method
              window.open(documentationPath, '_blank');
            }}
          >
            View in Browser
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadPdf}>
          <Download className="h-4 w-4 mr-2" />
          Download as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
