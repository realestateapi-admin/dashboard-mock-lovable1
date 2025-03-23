import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Send, FileText, LifeBuoy, MessageSquare, ExternalLink, ChevronRight,
  ArrowRight, BookOpen, Mail 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock knowledge base articles
const kbArticles = [
  {
    id: 1,
    title: "Getting Started with RealEstateAPI",
    excerpt: "Learn how to set up your first API call and authenticate your requests.",
    category: "Guide",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Understanding Rate Limits",
    excerpt: "Learn about our rate limits and how to handle rate limiting in your application.",
    category: "Documentation",
    readTime: "3 min read",
  },
  {
    id: 3,
    title: "Property Search API Reference",
    excerpt: "Complete guide to using the property search endpoint with all available parameters.",
    category: "API Reference",
    readTime: "8 min read",
  },
  {
    id: 4,
    title: "Webhook Integration Guide",
    excerpt: "Set up webhooks to receive real-time updates about properties and market changes.",
    category: "Guide",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Common Error Codes and Troubleshooting",
    excerpt: "Understand the most common error codes and how to resolve them.",
    category: "Troubleshooting",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Authentication Best Practices",
    excerpt: "Security recommendations for managing your API keys and authentication.",
    category: "Security",
    readTime: "5 min read",
  },
];

// Define the Message type more strictly
type Message = {
  id: number;
  role: "user" | "system";
  content: string;
  timestamp: string;
};

// Mock chat messages for AI support
const initialMessages: Message[] = [
  {
    id: 1,
    role: "system",
    content: "Hi there! I'm your RealEstateAPI assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
];

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [subject, setSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Searching knowledge base",
      description: `Searching for "${searchQuery}"...`,
    });
  };

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

  const filteredArticles = searchQuery
    ? kbArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : kbArticles;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Support</h1>
        <p className="text-muted-foreground mt-1">
          Find help and resources for using RealEstateAPI
        </p>
      </div>
      
      <Tabs defaultValue="knowledge-base" className="space-y-6">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="knowledge-base">Knowledge Base</TabsTrigger>
          <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>
        
        <TabsContent value="knowledge-base" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>
                Search our documentation and guides to find answers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex w-full items-center space-x-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search documentation..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArticles.map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start mb-1">
                          <Badge variant="outline" className="mb-2">
                            {article.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {article.readTime}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <p className="text-sm text-muted-foreground mb-4">
                          {article.excerpt}
                        </p>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-primary font-medium gap-1">
                          Read article 
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4 bg-muted/50">
              <div className="text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 inline-block mr-1" />
                Showing {filteredArticles.length} of {kbArticles.length} articles
              </div>
              <Button variant="outline" size="sm">
                Browse All Articles
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-assistant" className="space-y-6">
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
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {message.role === "system" && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/assistant-avatar.png" />
                            <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`rounded-lg px-4 py-2 max-w-[80%] ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span className="text-xs opacity-70 mt-1 block">
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        {message.role === "user" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>YC</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
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
                    <Button type="submit" size="icon" disabled={isLoading || !chatMessage.trim()}>
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
                  onClick={() => {
                    setChatMessage("How do I authenticate API requests?");
                    document.getElementById("submit-chat")?.click();
                  }}
                >
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <span>API Authentication</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-3"
                  onClick={() => {
                    setChatMessage("What are the rate limits for the Basic plan?");
                    document.getElementById("submit-chat")?.click();
                  }}
                >
                  <div className="flex items-center">
                    <LifeBuoy className="h-4 w-4 mr-2 text-primary" />
                    <span>Rate Limits</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-3"
                  onClick={() => {
                    setChatMessage("How do I filter properties by specific criteria?");
                    document.getElementById("submit-chat")?.click();
                  }}
                >
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                    <span>Property Filtering</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-6">
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
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Support;
