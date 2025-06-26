
import React from 'react';
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
    <div className="space-y-6">
      {endpoints.map((endpoint) => (
        <EndpointListItem key={endpoint.endpoint} endpoint={endpoint} />
      ))}
    </div>
  );
};
