
import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface TrialCountdownProps {
  daysLeft: number;
}

const TrialCountdown = ({ daysLeft }: TrialCountdownProps) => {
  // Calculate hours left in the current day
  const hoursLeft = 24 - new Date().getHours();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-3"
    >
      <div className="bg-amber-100 rounded-full p-2">
        <Clock className="h-5 w-5 text-amber-600" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-amber-800 text-sm">
          Limited time offer: Your free trial expires in
        </h3>
        <div className="flex gap-2 mt-1">
          <div className="bg-white rounded border border-amber-200 px-2 py-1">
            <span className="font-mono font-bold text-amber-800">{daysLeft}</span>
            <span className="text-xs text-amber-600 ml-1">days</span>
          </div>
          <div className="bg-white rounded border border-amber-200 px-2 py-1">
            <span className="font-mono font-bold text-amber-800">{hoursLeft}</span>
            <span className="text-xs text-amber-600 ml-1">hours</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrialCountdown;
