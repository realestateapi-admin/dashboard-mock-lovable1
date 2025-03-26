
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export type KnowledgeBaseArticleProps = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
};

const KnowledgeBaseArticle = ({ article }: { article: KnowledgeBaseArticleProps }) => {
  return (
    <motion.div
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
  );
};

export default KnowledgeBaseArticle;
