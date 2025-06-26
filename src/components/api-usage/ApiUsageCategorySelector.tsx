
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export type DataCategory = 'property' | 'demographic' | 'avm';

interface ApiUsageCategorySelectorProps {
  value: DataCategory;
  onChange: (value: DataCategory) => void;
}

export const ApiUsageCategorySelector = ({ 
  value, 
  onChange 
}: ApiUsageCategorySelectorProps) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">API Data Category:</span>
        <Select
          value={value}
          onValueChange={(value) => onChange(value as DataCategory)}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select data category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="property">Property Data</SelectItem>
            <SelectItem value="demographic">Demographic Data</SelectItem>
            <SelectItem value="avm">AVM Data</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
