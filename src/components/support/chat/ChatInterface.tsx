
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ChatMessage, { Message } from "../ChatMessage";

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  chatMessage: string;
  setChatMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
}

const ChatInterface = ({
  messages,
  isLoading,
  chatMessage,
  setChatMessage,
  handleSendMessage,
}: ChatInterfaceProps) => {
  return (
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
  );
};

export default ChatInterface;
