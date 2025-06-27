
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@/components/ui/select";

interface TieredEndpointSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const TieredEndpointSelector = ({ value, onChange }: TieredEndpointSelectorProps) => {
  // Define endpoint groups by metering bucket
  const endpointGroups = {
    "Property Data": [
      "Property Search",
      "Property Detail", 
      "Property Detail Bulk",
      "Property Comps",
      "CSV Generator",
      "PropGPT",
      "Address Verification",
      "Property Portfolio",
      "Property Boundary",
      "Mapping (Pins)"
    ],
    "Skip Trace Data": [
      "Skip Trace",
      "Bulk Skip Trace Await",
      "Bulk Skip Trace"
    ],
    "AVM Data": [
      "Lender Grade AVM",
      "Bulk Lender grade AVM"
    ],
    "Liens Data": [
      "Involuntary Liens"
    ]
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full lg:w-[250px]">
        <SelectValue placeholder="All Endpoints" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Endpoints</SelectItem>
        {Object.entries(endpointGroups).map(([category, endpoints]) => (
          <SelectGroup key={category}>
            <SelectLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {category}
            </SelectLabel>
            {endpoints.map((endpoint) => (
              <SelectItem key={endpoint} value={endpoint}>
                {endpoint}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
