
import React from "react";
import { Check } from "lucide-react";
import { AddOnData } from "@/types/billing";

interface AddOnsListProps {
  currentAddOns: AddOnData[];
}

export const AddOnsList = ({ currentAddOns }: AddOnsListProps) => {
  return (
    <div>
      <h4 className="font-medium mb-3">Active Add-ons:</h4>
      {currentAddOns.length > 0 ? (
        <ul className="space-y-2">
          {currentAddOns.map((addon) => (
            <li key={addon.id} className="flex items-center">
              <Check className="h-5 w-5 text-primary-teal mr-2" />
              <span>{addon.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No add-ons currently active</p>
      )}
    </div>
  );
};
