
import React from 'react';

interface NodeProps {
  data: { label: string };
}

export const ActionNode: React.FC<NodeProps> = ({ data }) => (
  <div className="label-container">{data.label}</div>
);
