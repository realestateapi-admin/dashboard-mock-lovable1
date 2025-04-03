
import { Message } from "../ChatMessage";

// Mock chat messages for AI support
export const initialMessages: Message[] = [
  {
    id: 1,
    role: "system",
    content: "Hi there! I'm your RealEstateAPI assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
];
