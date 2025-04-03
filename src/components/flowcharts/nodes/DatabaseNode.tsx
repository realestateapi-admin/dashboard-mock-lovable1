
import React from 'react';
import { Database } from 'lucide-react';

interface NodeProps {
  data: { label: string };
}

export const DatabaseNode: React.FC<NodeProps> = ({ data }) => (
  <div className="label-container">
    <div className="icon-container">
      <Database className="icon" size={16} />
      <span>{data.label}</span>
    </div>
  </div>
);
