
import { motion } from "framer-motion";

interface WizardProgressProps {
  step: number;
  totalSteps: number;
}

const WizardProgress = ({ step, totalSteps }: WizardProgressProps) => {
  const progress = ((step + 1) / totalSteps) * 100;
  
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
