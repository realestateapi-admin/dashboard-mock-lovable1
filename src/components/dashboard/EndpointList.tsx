
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EndpointListItem } from "./EndpointListItem";
import { EndpointUsageSkeleton } from "./LoadingState";
import { EndpointUsageItem } from "@/types/usage";

interface EndpointListProps {
  endpoints: EndpointUsageItem[];
  isLoading?: boolean;
}

export const EndpointList = ({ endpoints, isLoading = false }: EndpointListProps) => {
  if (isLoading) {
    return <EndpointUsageSkeleton />;
  }

  return (
    <>
      <div className="space-y-6">
        {endpoints.map((endpoint) => (
          <EndpointListItem key={endpoint.endpoint} endpoint={endpoint} />
        ))}
      </div>
      
      <div className="pt-2">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/dashboard/usage">
            View Detailed Usage Analytics
          </Link>
        </Button>
      </div>
    </>
  );
};
