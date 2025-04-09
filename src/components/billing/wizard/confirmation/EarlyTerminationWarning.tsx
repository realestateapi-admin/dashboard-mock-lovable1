
import React from "react";
import { AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface EarlyTerminationInfo {
  contractStartDate: Date;
  contractEndDate: Date;
  remainingMonths: number;
  monthsCompleted: number;
  earlyTerminationFee: string;
  remainingContractValue: string;
}

interface EarlyTerminationWarningProps {
  earlyTerminationInfo: EarlyTerminationInfo;
}

export const EarlyTerminationWarning: React.FC<EarlyTerminationWarningProps> = ({ 
  earlyTerminationInfo 
}) => {
  const isNewContract = earlyTerminationInfo.monthsCompleted === 0;
  
  return (
    <div className="flex items-start gap-3 bg-amber-50 text-amber-700 p-4 rounded-md border border-amber-100">
      <AlertCircle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-medium">Annual Contract Early Termination</p>
        <p className="text-sm mt-1">
          {isNewContract ? (
            <>Your annual contract will start on {format(earlyTerminationInfo.contractStartDate, 'MMMM d, yyyy')} 
            and end on {format(earlyTerminationInfo.contractEndDate, 'MMMM d, yyyy')}.</>
          ) : (
            <>Your current annual contract started on {format(earlyTerminationInfo.contractStartDate, 'MMMM d, yyyy')} 
            and ends on {format(earlyTerminationInfo.contractEndDate, 'MMMM d, yyyy')}.</>
          )}
        </p>
        <p className="text-sm mt-2">
          {isNewContract ? (
            <>This is a 12-month contract with {earlyTerminationInfo.remainingMonths} months of service.</>
          ) : (
            <>You've completed {earlyTerminationInfo.monthsCompleted} month{earlyTerminationInfo.monthsCompleted !== 1 ? 's' : ''} of your 12-month contract 
            with {earlyTerminationInfo.remainingMonths} month{earlyTerminationInfo.remainingMonths !== 1 ? 's' : ''} remaining.</>
          )}
        </p>
        <div className="mt-3 pt-2 border-t border-amber-200">
          <div className="flex justify-between text-sm">
            <span>Full contract value:</span>
            <span>{earlyTerminationInfo.remainingContractValue}</span>
          </div>
          <div className="flex justify-between font-medium mt-1">
            <span>Early termination fee:</span>
            <span>{earlyTerminationInfo.remainingContractValue}</span>
          </div>
        </div>
        <p className="text-xs mt-2 italic">
          Early termination will require satisfying all unpaid fees due for the remainder of the subscription term.
        </p>
      </div>
    </div>
  );
};
