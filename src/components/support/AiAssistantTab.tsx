
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from "./chat/ChatInterface";
import SuggestedTopics from "./chat/SuggestedTopics";
import { useChatMessages } from "./chat/useChatMessages";

const AiAssistantTab = () => {
  const {
    chatMessage,
    setChatMessage,
    messages,
    isLoading,
    handleSendMessage,
  } = useChatMessages();

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
          <ChatInterface 
            messages={messages}
            isLoading={isLoading}
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            handleSendMessage={handleSendMessage}
          />
        </CardContent>
      </Card>
      
      <SuggestedTopics onSelectTopic={handleSuggestedQuestion} />
    </div>
  );
};

export default AiAssistantTab;
