
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Message = {
  id: number;
  role: "user" | "system";
  content: string;
  timestamp: string;
};

const ChatMessage = ({ message }: { message: Message }) => {
  return (
    <div
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
  );
};

export default ChatMessage;
