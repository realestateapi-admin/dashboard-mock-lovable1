
import { ProspectNode } from './ProspectNode';
import { ActionNode } from './ActionNode';
import { DecisionNode } from './DecisionNode';
import { SystemNode } from './SystemNode';
import { DatabaseNode } from './DatabaseNode';
import { ResultNode } from './ResultNode';

export const nodeTypes = {
  prospect: ProspectNode,
  action: ActionNode,
  decision: DecisionNode,
  system: SystemNode,
  database: DatabaseNode,
  result: ResultNode,
};

export { 
  ProspectNode,
  ActionNode,
  DecisionNode,
  SystemNode,
  DatabaseNode,
  ResultNode
};
