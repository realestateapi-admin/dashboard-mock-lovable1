
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

  // Get display value for the selected item
  const getDisplayValue = () => {
    if (value === "all") return "All Endpoints";
    return value || "All Endpoints";
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full lg:w-[250px]">
        <SelectValue placeholder="All Endpoints">
          {getDisplayValue()}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="p-0">
        <SelectItem value="all" className="mx-2 my-1">All Endpoints</SelectItem>
        <Accordion type="multiple" className="w-full">
          {Object.entries(endpointGroups).map(([category, endpoints]) => (
            <AccordionItem key={category} value={category} className="border-none">
              <AccordionTrigger className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide hover:no-underline">
                {category}
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                {endpoints.map((endpoint) => (
                  <SelectItem key={endpoint} value={endpoint} className="pl-6">
                    {endpoint}
                  </SelectItem>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SelectContent>
    </Select>
  );
};
