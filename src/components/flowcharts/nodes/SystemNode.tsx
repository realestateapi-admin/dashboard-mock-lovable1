
import React from 'react';

interface NodeProps {
  data: { 
    label: string; 
    icon?: React.ReactNode;
  };
}

export const SystemNode: React.FC<NodeProps> = ({ data }) => (
  <div className="label-container">
    <div className="icon-container">
      {data.icon}
      <span>{data.label}</span>
    </div>
  </div>
);
