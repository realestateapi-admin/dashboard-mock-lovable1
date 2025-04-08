
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsOfServiceStepProps {
  termsAccepted: boolean;
  onTermsAccepted: (accepted: boolean) => void;
  isLoading: boolean;
  updateFormData: (field: string, value: any) => void;
}

export const TermsOfServiceStep = ({
  termsAccepted,
  onTermsAccepted,
  isLoading,
  updateFormData
}: TermsOfServiceStepProps) => {
  
  const handleTermsAccepted = (checked: boolean) => {
    onTermsAccepted(checked);
    updateFormData('termsAccepted', checked);
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-10 w-1/2" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Terms of Service</h3>
        <p className="text-muted-foreground">
          Please review and accept our terms of service to continue.
        </p>
      </div>
      
      <div className="border rounded-md p-4">
        <ScrollArea className="h-64 w-full pr-4">
          <div className="space-y-4 text-sm">
            <h4 className="font-medium">1. Acceptance of Terms</h4>
            <p>
              By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
              If you do not agree with any of these terms, you are prohibited from using or accessing our services.
            </p>
            
            <h4 className="font-medium">2. Use License</h4>
            <p>
              Permission is granted to temporarily use our services for personal, non-commercial transitory viewing only. 
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose;</li>
              <li>attempt to decompile or reverse engineer any software contained in our services;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            
            <h4 className="font-medium">3. Subscription and Billing</h4>
            <p>
              Our subscription-based services are billed in advance on a monthly or annual basis. 
              You agree to provide current, complete, and accurate purchase and account information for all purchases made via our services.
              You agree to promptly update your account and other information, including your email address and payment method details, 
              so we can complete your transactions and contact you as needed.
            </p>
            
            <h4 className="font-medium">4. Cancellation and Refunds</h4>
            <p>
              You may cancel your subscription at any time by contacting our customer support team. 
              Upon cancellation, you will continue to have access to your subscription until the end of your current billing period. 
              No refunds will be provided for partial subscription periods.
            </p>
            
            <h4 className="font-medium">5. Limitation of Liability</h4>
            <p>
              In no event shall our company be liable for any damages (including, without limitation, damages for loss of data or profit, 
              or due to business interruption) arising out of the use or inability to use our services, even if we have been notified orally 
              or in writing of the possibility of such damage.
            </p>
            
            <h4 className="font-medium">6. Changes to Terms</h4>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. 
              What constitutes a material change will be determined at our sole discretion.
            </p>
          </div>
        </ScrollArea>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          checked={termsAccepted} 
          onCheckedChange={(checked) => handleTermsAccepted(checked === true)}
        />
        <Label htmlFor="terms" className="text-sm">
          I have read and agree to the Terms of Service and Privacy Policy
        </Label>
      </div>
    </div>
  );
};
