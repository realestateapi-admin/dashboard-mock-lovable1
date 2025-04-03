
import { MarkerType, Position } from '@xyflow/react';
import React from 'react';
import { CalendarDays, Database, FileText, Home, UserSquare2, Users } from 'lucide-react';

// Node types
export const nodeTypes = {
  prospect: 'prospect',
  action: 'action',
  decision: 'decision',
  result: 'result',
  system: 'system',
};

// Define the flow data
export const salesMotionFlowData = {
  nodes: [
    {
      id: 'homepage',
      type: 'system',
      data: { 
        label: 'Website Homepage',
        icon: React.createElement(Home, { size: 16 })
      },
      position: { x: 300, y: 5 },
    },
    {
      id: 'userClick',
      type: 'decision',
      data: { label: 'User clicks CTA?' },
      position: { x: 300, y: 100 },
    },
    {
      id: 'cta1',
      type: 'action',
      data: { 
        label: 'CTA 1: "Schedule Demo"' 
      },
      position: { x: 100, y: 200 },
    },
    {
      id: 'cta2',
      type: 'action',
      data: { 
        label: 'CTA 2: "Start Free Trial"' 
      },
      position: { x: 500, y: 200 },
    },
    {
      id: 'calendly',
      type: 'system',
      data: { 
        label: 'Calendly Form',
        icon: React.createElement(CalendarDays, { size: 16 })
      },
      position: { x: 100, y: 300 },
    },
    {
      id: 'qualify',
      type: 'action',
      data: { label: 'Sales Team Qualification' },
      position: { x: 100, y: 400 },
    },
    {
      id: 'signup',
      type: 'system',
      data: { 
        label: 'Signup Wizard',
        icon: React.createElement(UserSquare2, { size: 16 })
      },
      position: { x: 500, y: 300 },
    },
    {
      id: 'qualifyDecision',
      type: 'decision',
      data: { label: 'Qualified?' },
      position: { x: 100, y: 500 },
    },
    {
      id: 'notQualified',
      type: 'result',
      data: { label: 'Lead Rejected' },
      position: { x: -100, y: 600 },
    },
    {
      id: 'sendEmail',
      type: 'action',
      data: { label: 'Send Email with Trial Signup Instructions' },
      position: { x: 100, y: 600 },
    },
    {
      id: 'demoBooking',
      type: 'action',
      data: { label: 'Book Personalized Demo' },
      position: { x: 300, y: 600 },
    },
    {
      id: 'customerDatabase',
      type: 'system',
      data: { 
        label: 'Customer Database',
        icon: React.createElement(Database, { size: 16 })
      },
      position: { x: 500, y: 400 },
    },
    {
      id: 'onboarding',
      type: 'system',
      data: { 
        label: 'Onboarding Process',
        icon: React.createElement(FileText, { size: 16 })
      },
      position: { x: 500, y: 500 },
    },
    {
      id: 'support',
      type: 'system',
      data: { 
        label: 'Support System',
        icon: React.createElement(Users, { size: 16 })
      },
      position: { x: 500, y: 600 },
    },
  ],
  edges: [
    {
      id: 'homepage-userClick',
      source: 'homepage',
      target: 'userClick',
      animated: true,
    },
    {
      id: 'userClick-cta1',
      source: 'userClick',
      target: 'cta1',
      animated: true,
      label: 'Demo CTA',
      labelStyle: { fill: '#888' },
    },
    {
      id: 'userClick-cta2',
      source: 'userClick',
      target: 'cta2',
      animated: true,
      label: 'Trial CTA',
      labelStyle: { fill: '#888' },
    },
    {
      id: 'cta1-calendly',
      source: 'cta1',
      target: 'calendly',
      animated: true,
    },
    {
      id: 'calendly-qualify',
      source: 'calendly',
      target: 'qualify',
      animated: true,
    },
    {
      id: 'qualify-qualifyDecision',
      source: 'qualify',
      target: 'qualifyDecision',
      animated: true,
    },
    {
      id: 'qualifyDecision-notQualified',
      source: 'qualifyDecision',
      target: 'notQualified',
      animated: true,
      label: 'No',
      labelStyle: { fill: '#888' },
    },
    {
      id: 'qualifyDecision-sendEmail',
      source: 'qualifyDecision',
      target: 'sendEmail',
      animated: true,
      label: 'Yes - SMB',
      labelStyle: { fill: '#888' },
    },
    {
      id: 'qualifyDecision-demoBooking',
      source: 'qualifyDecision',
      target: 'demoBooking',
      animated: true,
      label: 'Yes - Enterprise',
      labelStyle: { fill: '#888' },
    },
    {
      id: 'sendEmail-onboarding',
      source: 'sendEmail',
      target: 'onboarding',
      animated: true,
      type: 'smoothstep',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: 'cta2-signup',
      source: 'cta2',
      target: 'signup',
      animated: true,
    },
    {
      id: 'signup-customerDatabase',
      source: 'signup',
      target: 'customerDatabase',
      animated: true,
    },
    {
      id: 'customerDatabase-onboarding',
      source: 'customerDatabase',
      target: 'onboarding',
      animated: true,
    },
    {
      id: 'onboarding-support',
      source: 'onboarding',
      target: 'support',
      animated: true,
    },
  ],
};

// Helper function to get nodes for React Flow
export const getSalesMotionNodes = () => {
  return salesMotionFlowData.nodes;
};

// Helper function to get edges for React Flow
export const getSalesMotionEdges = () => {
  return salesMotionFlowData.edges;
};

// Helper function to get node color based on type
export const getNodeColor = (nodeType: string) => {
  switch(nodeType) {
    case 'system':
      return '#3b82f6'; // blue
    case 'action':
      return '#10b981'; // green
    case 'decision':
      return '#f59e0b'; // yellow/amber
    case 'result':
      return '#ef4444'; // red
    case 'prospect':
      return '#8b5cf6'; // purple
    default:
      return '#64748b'; // slate
  }
};
