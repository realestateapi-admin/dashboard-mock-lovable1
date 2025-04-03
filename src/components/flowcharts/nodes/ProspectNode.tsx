
import React from 'react';
import { User } from 'lucide-react';

interface NodeProps {
  data: { label: string };
}

export const ProspectNode: React.FC<NodeProps> = ({ data }) => (
  <div className="label-container">
    <div className="icon-container">
      <User className="icon" size={16} />
      <span>{data.label}</span>
    </div>
  </div>
);
