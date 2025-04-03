
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X, Calendar, Mail, MessageCircle } from "lucide-react";
import { useAccountExecutive } from '@/contexts/AccountExecutiveContext';

export const AccountExecutiveWidget = () => {
  const { ae, isWidgetVisible, hideWidget } = useAccountExecutive();
  const [showHumanOptions, setShowHumanOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // If the widget isn't visible or there's no AE data, don't render anything
  if (!isWidgetVisible || !ae) return null;

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const supportOptions = [
    {
      id: 'query-help',
      title: 'Need help writing a query?',
      content: (
        <div className="text-sm">
          <p className="mb-3">Here's our documentation on common API queries:</p>
          <ul className="list-disc ml-5 mb-3 space-y-1 text-blue-600">
            <li><a href="#" className="hover:underline">Property search queries</a></li>
            <li><a href="#" className="hover:underline">Transaction history queries</a></li>
            <li><a href="#" className="hover:underline">Ownership filters</a></li>
          </ul>
          <p className="text-muted-foreground">Still stuck? Talk to a human.</p>
        </div>
      )
    },
    {
      id: 'billing',
      title: 'Got billing questions?',
      content: (
        <div className="text-sm">
          <p className="mb-3">Here are our billing resources:</p>
          <ul className="list-disc ml-5 mb-3 space-y-1 text-blue-600">
            <li><a href="#" className="hover:underline">Pricing plan comparison</a></li>
            <li><a href="#" className="hover:underline">Credits FAQ</a></li>
            <li><a href="#" className="hover:underline">Billing cycle information</a></li>
          </ul>
          <p className="text-muted-foreground">Have a specific question? Talk to a human.</p>
        </div>
      )
    },
    {
      id: 'human',
      title: 'Connect with a human',
      content: null
    }
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    if (optionId === 'human') {
      setShowHumanOptions(true);
    }
  };

  const handleBack = () => {
    setSelectedOption(null);
    setShowHumanOptions(false);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80 shadow-lg transition-all duration-300 ease-in-out translate-y-0">
      <Card className="overflow-hidden border border-border bg-card text-card-foreground animate-in slide-in-from-right">
        <CardHeader className="p-4 pb-2 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg">
              {showHumanOptions ? "Contact Your Solutions Engineer" : "RealEstateAPI Support"}
            </CardTitle>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={hideWidget}
              className="h-6 w-6 text-white hover:bg-white/20 rounded-full p-1"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-5">
          {!selectedOption ? (
            <div className="space-y-3">
              {supportOptions.map((option) => (
                <Button
                  key={option.id}
                  className="w-full justify-start text-left h-auto py-3 text-sm"
                  variant={option.id === 'human' ? "default" : "outline"}
                  onClick={() => handleOptionSelect(option.id)}
                >
                  {option.title}
                </Button>
              ))}
            </div>
          ) : showHumanOptions ? (
            <>
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16 border-2 border-white shadow">
                  <AvatarImage src={ae.photo} alt={ae.name} />
                  <AvatarFallback>{getInitials(ae.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-lg">{ae.name}</h3>
                  <p className="text-sm text-muted-foreground">Solutions Engineer</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button asChild className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
                  <a 
                    href={ae.calendly} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule a Call
                  </a>
                </Button>
                
                <Button asChild variant="outline" className="w-full">
                  <a 
                    href={`mailto:${ae.email}?subject=RealEstateAPI%20Support%20Request`}
                    className="flex items-center justify-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Send Email
                  </a>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full mt-2 text-sm text-muted-foreground"
                  onClick={handleBack}
                >
                  Back to support options
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {supportOptions.find(option => option.id === selectedOption)?.content}
              
              <div className="pt-2 border-t">
                <Button 
                  onClick={() => handleOptionSelect('human')} 
                  className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] mt-1"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Talk to a Human
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full mt-2 text-sm text-muted-foreground"
                  onClick={handleBack}
                >
                  Back to support options
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
