
import { motion } from "framer-motion";

interface WizardProgressProps {
  step: number;
  totalSteps: number;
  showProgress?: boolean; // Add option to hide progress bar
}

const WizardProgress = ({ step, totalSteps, showProgress = true }: WizardProgressProps) => {
  const progress = ((step + 1) / totalSteps) * 100;
  
  // If showProgress is false, don't render anything
  if (!showProgress) {
    return null;
  }
  
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
      <motion.div 
        className="h-full bg-[#04c8c8] rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
      ></motion.div>
    </div>
  );
};

export default WizardProgress;
