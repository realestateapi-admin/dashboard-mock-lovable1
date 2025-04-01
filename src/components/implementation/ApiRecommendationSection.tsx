
import React from 'react';

interface ApiSectionProps {
  title: string;
  api: string;
  collection: string;
  purpose: string;
  responseStructure: string;
  implementationNotes: string[];
}

export const ApiRecommendationSection: React.FC<ApiSectionProps> = ({
  title,
  api,
  collection,
  purpose,
  responseStructure,
  implementationNotes,
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="mb-2"><strong>API:</strong> {api}</p>
      <p className="mb-2"><strong>MongoDB Collection:</strong> {collection}</p>
      <p className="mb-2"><strong>Purpose:</strong> {purpose}</p>
      
      <h4 className="font-medium mt-4 mb-2">Response Structure:</h4>
      <pre className="bg-gray-800 text-white p-4 rounded mb-3 overflow-x-auto">
        {responseStructure}
      </pre>
      
      <h4 className="font-medium mb-2">Implementation Notes:</h4>
      <ul className="list-disc ml-5 mb-4">
        {implementationNotes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};
