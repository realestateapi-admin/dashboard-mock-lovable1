
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Bell, CalendarCheck, Info, AlertTriangle, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define update types
type UpdateType = 'announcement' | 'release' | 'maintenance' | 'alert';

interface Update {
  id: string;
  type: UpdateType;
  title: string;
  content: string;
  date: string;
  isNew?: boolean;
}

// Mock updates data
const mockUpdates: Update[] = [
  {
    id: '1',
    type: 'alert',
    title: 'API Service Interruption',
    content: 'We are experiencing intermittent issues with the Property Search endpoint. Our team is investigating.',
    date: '2025-04-05',
    isNew: true
  },
  {
    id: '2',
    type: 'release',
    title: 'New Endpoint: Property Insights',
    content: "We've launched a new endpoint that provides market trends and valuation insights for properties.",
    date: '2025-04-03',
    isNew: true
  },
  {
    id: '3',
    type: 'maintenance',
    title: 'Scheduled Maintenance',
    content: 'Planned database maintenance on April 10th from 2-4 AM EST. Expect brief service interruptions.',
    date: '2025-04-02'
  },
  {
    id: '4',
    type: 'announcement',
    title: 'Improved Rate Limits',
    content: "We've increased rate limits by 20% for all subscription tiers, effective immediately.",
    date: '2025-03-29'
  }
];

// Icons for different update types
const getUpdateIcon = (type: UpdateType) => {
  switch (type) {
    case 'announcement':
      return <Info className="h-5 w-5 text-blue-500" />;
    case 'release':
      return <CalendarCheck className="h-5 w-5 text-green-600" />;
    case 'maintenance':
      return <Bell className="h-5 w-5 text-amber-500" />;
    case 'alert':
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    default:
      return <MessageSquare className="h-5 w-5 text-slate-500" />;
  }
};

// Badge for different update types
const getUpdateBadge = (type: UpdateType) => {
  switch (type) {
    case 'announcement':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Announcement</Badge>;
    case 'release':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">New Feature</Badge>;
    case 'maintenance':
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Maintenance</Badge>;
    case 'alert':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Alert</Badge>;
    default:
      return <Badge variant="outline">Update</Badge>;
  }
};

interface UpdatesSectionProps {
  isLoading?: boolean;
}

export const UpdatesSection = ({ isLoading = false }: UpdatesSectionProps) => {
  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Updates</CardTitle>
          <CardDescription>
            Latest news and announcements from the team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Updates</CardTitle>
        <CardDescription>
          Latest news and announcements from the team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockUpdates.map((update) => (
            <div key={update.id} className="flex gap-4 items-start pb-4 border-b last:border-b-0 last:pb-0 relative">
              <div className="mt-1 flex-shrink-0">{getUpdateIcon(update.type)}</div>
              <div className="space-y-1 flex-1">
                <div className="flex justify-between items-start gap-2">
                  <div className="font-medium">{update.title}</div>
                  {update.isNew && (
                    <span className="px-1.5 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">New</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{update.content}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">
                    {new Date(update.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  {getUpdateBadge(update.type)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
