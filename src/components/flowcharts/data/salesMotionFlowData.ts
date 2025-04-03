
import { Node, Edge } from '@xyflow/react';
import { Calendar, Mail, Database, User, ExternalLink } from 'lucide-react';
import React from 'react';

export const getSalesMotionNodes = (): Node[] => [
  {
    id: '1',
    type: 'prospect',
    data: { label: 'Prospect' },
    position: { x: 300, y: 5 },
  },
  {
    id: '2',
    type: 'action',
    data: { label: 'Clicks CTA' },
    position: { x: 300, y: 75 },
  },
  {
    id: '3',
    type: 'system',
    data: { 
      label: 'Fills Calendly Form (Qualification)',
      icon: <Calendar className="icon" size={16} /> 
    },
    position: { x: 300, y: 150 },
  },
  {
    id: '4',
    type: 'decision',
    data: { label: 'Opportunity Size?' },
    position: { x: 300, y: 225 },
  },
  {
    id: '5',
    type: 'system',
    data: { 
      label: 'SE Assignment (Round Robin)',
      icon: <User className="icon" size={16} /> 
    },
    position: { x: 300, y: 300 },
  },
  {
    id: '6',
    type: 'database',
    data: { label: 'Record in Pipedrive' },
    position: { x: 500, y: 300 },
  },
  {
    id: '7',
    type: 'action',
    data: { label: 'Small Opportunity' },
    position: { x: 150, y: 300 },
  },
  {
    id: '8',
    type: 'action',
    data: { label: 'Large Opportunity' },
    position: { x: 450, y: 300 },
  },
  {
    id: '9',
    type: 'system',
    data: { 
      label: 'Welcome Email with Tutorial Videos & Free Trial Link',
      icon: <Mail className="icon" size={16} />
    },
    position: { x: 150, y: 375 },
  },
  {
    id: '10',
    type: 'system',
    data: { 
      label: 'Calendly Link for Live Call',
      icon: <Calendar className="icon" size={16} /> 
    },
    position: { x: 450, y: 375 },
  },
  {
    id: '11',
    type: 'action',
    data: { label: 'Prospect Starts Trial' },
    position: { x: 150, y: 450 },
  },
  {
    id: '12',
    type: 'action',
    data: { label: 'Prospect Books Call' },
    position: { x: 450, y: 450 },
  },
  {
    id: '13',
    type: 'database',
    data: { label: 'User Record with SE Metadata' },
    position: { x: 300, y: 525 },
  },
  {
    id: '14',
    type: 'database',
    data: { label: 'MongoDB Sync' },
    position: { x: 500, y: 525 },
  },
  {
    id: '15',
    type: 'result',
    data: { label: 'Dashboard with SE Widget' },
    position: { x: 300, y: 600 },
  },
  {
    id: '16',
    type: 'system',
    data: { 
      label: 'SE Widget Activates on: Trial Ending, Usage Threshold, or Support Request',
      icon: <ExternalLink className="icon" size={16} /> 
    },
    position: { x: 300, y: 675 },
  },
];

export const getSalesMotionEdges = (): Edge[] => [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e4-7', source: '4', target: '7', label: 'Small', animated: true },
  { id: 'e4-8', source: '4', target: '8', label: 'Large', animated: true },
  { id: 'e5-6', source: '5', target: '6' },
  { id: 'e7-9', source: '7', target: '9', animated: true },
  { id: 'e8-10', source: '8', target: '10', animated: true },
  { id: 'e9-11', source: '9', target: '11', animated: true },
  { id: 'e10-12', source: '10', target: '12', animated: true },
  { id: 'e11-13', source: '11', target: '13' },
  { id: 'e12-13', source: '12', target: '13' },
  { id: 'e13-14', source: '13', target: '14' },
  { id: 'e13-15', source: '13', target: '15' },
  { id: 'e15-16', source: '15', target: '16' },
];

export const getNodeColor = (nodeType: string): string => {
  switch (nodeType) {
    case 'prospect': return '#9b87f5';
    case 'action': return '#f5f5f5';
    case 'decision': return '#ffedd5';
    case 'system': return '#e0f2fe';
    case 'database': return '#dbeafe';
    case 'result': return '#dcfce7';
    default: return '#eee';
  }
};
