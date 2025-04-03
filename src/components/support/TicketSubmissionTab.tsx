
import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TicketSubmissionTab = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("normal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate ticket submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Support ticket submitted",
      description: "Our team will respond to your ticket shortly.",
    });
    
    // Reset form
    setSubject("");
    setMessage("");
    setPriority("normal");
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Submit a Support Ticket</CardTitle>
          <CardDescription>
            Fill out the form below to create a new support ticket
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Brief description of the issue"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={priority} 
                onValueChange={setPriority}
                disabled={isSubmitting}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Please provide details about your issue"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full gap-2" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Ticket"}
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="bg-muted/50 border-t flex flex-col items-start p-4">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-2">What happens next?</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>You'll receive a confirmation email with your ticket details</li>
              <li>A support team member will be assigned to your ticket</li>
              <li>We aim to provide an initial response within 24 hours</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TicketSubmissionTab;
