
import { useState } from "react";
import { Search, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import KnowledgeBaseArticle, { KnowledgeBaseArticleProps } from "./KnowledgeBaseArticle";

// Mock knowledge base articles
const kbArticles: KnowledgeBaseArticleProps[] = [
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

const KnowledgeBaseTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Searching knowledge base",
      description: `Searching for "${searchQuery}"...`,
    });
  };

  const filteredArticles = searchQuery
    ? kbArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : kbArticles;

  return (
    <div className="space-y-6">
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
              <KnowledgeBaseArticle key={article.id} article={article} />
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
    </div>
  );
};

export default KnowledgeBaseTab;
