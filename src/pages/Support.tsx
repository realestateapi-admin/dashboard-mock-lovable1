import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KnowledgeBaseTab from "@/components/support/KnowledgeBaseTab";
import AiAssistantTab from "@/components/support/AiAssistantTab";
import ApiDocumentationTab from "@/components/support/ApiDocumentationTab";
import TicketSubmissionTab from "@/components/support/TicketSubmissionTab";
const Support = () => {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.3
  }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Support</h1>
        <p className="text-muted-foreground mt-1">
          Find help and resources for using RealEstateAPI
        </p>
      </div>
      
      <Tabs defaultValue="ai-assistant" className="space-y-6">
        <TabsList className="grid grid-cols-4 max-w-2xl gap-2 h-auto p-2 bg-muted/50 border py-[4px] px-[4px]">
          <TabsTrigger value="ai-assistant" className="px-4 py-3 border border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm">
            AI Copilot
          </TabsTrigger>
          <TabsTrigger value="knowledge-base" className="px-4 py-3 border border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Knowledge Base
          </TabsTrigger>
          <TabsTrigger value="api-docs" className="px-4 py-3 border border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm">
            API Documentation
          </TabsTrigger>
          <TabsTrigger value="submit-ticket" className="px-4 py-3 border border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Submit Ticket
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai-assistant">
          <AiAssistantTab />
        </TabsContent>
        
        <TabsContent value="knowledge-base">
          <KnowledgeBaseTab />
        </TabsContent>
        
        <TabsContent value="api-docs">
          <ApiDocumentationTab />
        </TabsContent>
        
        <TabsContent value="submit-ticket">
          <TicketSubmissionTab />
        </TabsContent>
      </Tabs>
    </motion.div>;
};
export default Support;