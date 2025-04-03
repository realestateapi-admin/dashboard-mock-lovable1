
import React from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './SalesMotionFlowchart.css';
import { nodeTypes } from './nodes';
import { getSalesMotionNodes, getSalesMotionEdges, getNodeColor } from './data/salesMotionFlowData';

export const SalesMotionFlowchart = () => {
  const initialNodes = getSalesMotionNodes();
  const initialEdges = getSalesMotionEdges();

  return (
    <div className="flowchart-container">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        className="sales-flow"
      >
        <Background />
        <Controls />
        <MiniMap nodeColor={(node) => getNodeColor(node.type || '')} />
      </ReactFlow>
    </div>
  );
};

export default SalesMotionFlowchart;
