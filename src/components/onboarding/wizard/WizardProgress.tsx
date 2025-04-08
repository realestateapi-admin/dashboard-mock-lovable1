
import { motion } from "framer-motion";

interface WizardProgressProps {
  step: number;
  totalSteps: number;
}

const WizardProgress = ({ step, totalSteps }: WizardProgressProps) => {
  // Return empty component as we're removing the progress bar
  return null;
};

export default WizardProgress;
