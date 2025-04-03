
import { useState } from "react";
import { Message } from "../ChatMessage";
import { initialMessages } from "./initialMessages";

export const useChatMessages = () => {
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

  return {
    chatMessage,
    setChatMessage,
    messages,
    isLoading,
    handleSendMessage,
  };
};
