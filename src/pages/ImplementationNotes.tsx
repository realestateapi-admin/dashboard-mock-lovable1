
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

const ImplementationNotes = () => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocumentation = async () => {
      try {
        // Fetch the HTML content
        const response = await fetch('/documentation/dashboard-api-recommendations.html');
        
        if (!response.ok) {
          throw new Error(`Failed to load documentation: ${response.status}`);
        }
        
        const htmlContent = await response.text();
        setContent(htmlContent);
        setLoading(false);
      } catch (err) {
        console.error('Error loading documentation:', err);
        setError('Failed to load implementation notes. Please try again later.');
        setLoading(false);
      }
    };

    fetchDocumentation();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-pulse text-xl">Loading implementation notes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 max-w-4xl mx-auto">
        <div className="text-center text-red-500">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Implementation Notes on Demo</h1>
      <Card className="p-0 overflow-hidden">
        <iframe
          srcDoc={content}
          title="Implementation Notes"
          className="w-full min-h-[80vh] border-0"
          sandbox="allow-same-origin"
        />
      </Card>
    </div>
  );
};

export default ImplementationNotes;
