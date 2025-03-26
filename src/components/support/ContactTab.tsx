
import { useState } from "react";
import { ExternalLink, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const ContactTab = () => {
  const [subject, setSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !emailMessage.trim()) return;
    
    setIsLoading(true);
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Support ticket created",
      description: "We've received your message and will respond shortly.",
    });
    
    setSubject("");
    setEmailMessage("");
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>
            Get help from our support team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="Briefly describe your issue"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Provide details about your issue or question"
                rows={6}
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 border-t p-4 bg-muted/50">
          <h4 className="text-sm font-medium">Other Ways to Reach Us</h4>
          <div className="grid gap-2 w-full">
            <Button variant="outline" className="justify-start w-full">
              <Mail className="h-4 w-4 mr-2" />
              Email: support@realestateapi.com
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                Twitter
              </Button>
              <Button variant="outline" className="flex-1 justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                Discord
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Quick answers to common questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-medium">What payment methods do you accept?</h3>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards (Visa, Mastercard, American Express) 
                as well as PayPal for our subscription plans.
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-base font-medium">How do I upgrade my subscription?</h3>
              <p className="text-sm text-muted-foreground">
                You can upgrade your subscription at any time from the Billing section 
                in your dashboard. The price difference will be prorated for the 
                remainder of your billing cycle.
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-base font-medium">How can I get additional API credits?</h3>
              <p className="text-sm text-muted-foreground">
                If you need additional API credits beyond your current plan, you can 
                purchase add-on packs from the Billing section in your dashboard, or 
                contact our sales team for a custom solution.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-center border-t">
          <Button variant="link" className="text-primary gap-1">
            View all FAQs <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContactTab;
