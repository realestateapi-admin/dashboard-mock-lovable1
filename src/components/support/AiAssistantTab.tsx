
import { useState } from "react";
import { Send, FileText, LifeBuoy, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatMessage, { Message } from "./ChatMessage";

// Mock chat messages for AI support
const initialMessages: Message[] = [
  {
    id: 1,
    role: "system",
    content: "Hi there! I'm your RealEstateAPI assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
];

const AiAssistantTab = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: chatMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setChatMessage("");
    
    // Simulate AI response after a short delay
    setIsLoading(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: "system",
        content: "Thank you for your question. Let me check that information for you. Our property search API supports filtering by price range, bedrooms, bathrooms, square footage, and many other parameters. You can find detailed documentation in our API reference guide.",
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setChatMessage(question);
    // Simulate click on submit button
    document.getElementById("submit-chat")?.click();
  };

  return (
    <div className="space-y-6">
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle>AI Support Assistant</CardTitle>
          <CardDescription>
            Get instant answers from our AI-powered assistant
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex justify-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 bg-muted">
                      <div className="flex space-x-2 items-center">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-pulse"></div>
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  className="flex-1"
                  placeholder="Type your question here..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  disabled={isLoading}
                />
                <Button id="submit-chat" type="submit" size="icon" disabled={isLoading || !chatMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
              onClick={() => handleSuggestedQuestion("How do I authenticate API requests?")}
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-primary" />
                <span>API Authentication</span>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-auto py-3"
              onClick={() => handleSuggestedQuestion("What are the rate limits for the Basic plan?")}
            >
              <div className="flex items-center">
                <LifeBuoy className="h-4 w-4 mr-2 text-primary" />
                <span>Rate Limits</span>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-auto py-3"
              onClick={() => handleSuggestedQuestion("How do I filter properties by specific criteria?")}
            >
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                <span>Property Filtering</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiAssistantTab;
