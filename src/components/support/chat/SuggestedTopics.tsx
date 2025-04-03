
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, LifeBuoy, MessageSquare } from "lucide-react";

interface SuggestedTopicsProps {
  onSelectTopic: (question: string) => void;
}

const SuggestedTopics = ({ onSelectTopic }: SuggestedTopicsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggested Topics</CardTitle>
        <CardDescription>
          Common questions our AI assistant can help with
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            className="justify-start h-auto py-3"
            onClick={() => onSelectTopic("How do I authenticate API requests?")}
          >
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2 text-primary" />
              <span>API Authentication</span>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="justify-start h-auto py-3"
            onClick={() => onSelectTopic("What are the rate limits for the Basic plan?")}
          >
            <div className="flex items-center">
              <LifeBuoy className="h-4 w-4 mr-2 text-primary" />
              <span>Rate Limits</span>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="justify-start h-auto py-3"
            onClick={() => onSelectTopic("How do I filter properties by specific criteria?")}
          >
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-primary" />
              <span>Property Filtering</span>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedTopics;
