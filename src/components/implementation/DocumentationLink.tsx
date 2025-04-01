
import React from 'react';

interface DocumentationLinkProps {
  title: string;
  description: string;
  url: string;
}

export const DocumentationLink: React.FC<DocumentationLinkProps> = ({
  title,
  description,
  url,
}) => {
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
      <h4 className="font-medium mb-2 text-blue-800">{title}</h4>
      <p className="mb-2">{description}</p>
      <a href={url} 
         target="_blank" 
         rel="noopener noreferrer" 
         className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
        View Documentation
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
};
