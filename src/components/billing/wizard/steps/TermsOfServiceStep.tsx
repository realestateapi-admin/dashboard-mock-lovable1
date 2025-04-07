
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface TermsOfServiceStepProps {
  termsAccepted: boolean;
  onTermsAccepted: (accepted: boolean) => void;
  isLoading: boolean;
}

export const TermsOfServiceStep = ({
  termsAccepted,
  onTermsAccepted,
  isLoading
}: TermsOfServiceStepProps) => {
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-1">Terms of Service</h3>
        <p className="text-sm text-muted-foreground">
          Please review and accept our terms of service
        </p>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <ScrollArea className="h-64 p-4 bg-gray-50">
          <div className="space-y-4">
            <h4 className="font-medium">RealEstateAPI Terms of Service</h4>
            
            <p className="text-sm">
              By using the RealEstateAPI services, you agree to these terms and conditions.
              This agreement governs your relationship with RealEstateAPI and use of the
              services provided.
            </p>
            
            <h5 className="font-medium text-sm mt-4">1. Service Usage</h5>
            <p className="text-sm">
              The RealEstateAPI provides access to real estate data through our API. Your subscription
              plan determines the number of API calls and records you can access each month. Exceeding
              these limits may result in additional charges or service restrictions based on your
              selected overage handling preference.
            </p>
            
            <h5 className="font-medium text-sm mt-4">2. Data Licensing</h5>
            <p className="text-sm">
              The data provided through our API is licensed, not sold. You may use the data for your
              business purposes but may not resell the raw data or create competing services with it.
              You are responsible for complying with all applicable laws when using our data.
            </p>
            
            <h5 className="font-medium text-sm mt-4">3. Billing and Payments</h5>
            <p className="text-sm">
              You agree to pay the fees for your selected subscription plan. For monthly plans, you will
              be billed on a recurring monthly basis. For annual plans, you will be billed monthly but
              are committing to a 12-month contract. Early termination of annual plans may result in
              early termination fees.
            </p>
            
            <h5 className="font-medium text-sm mt-4">4. Service Availability</h5>
            <p className="text-sm">
              We strive to maintain 99.9% service uptime, but do not guarantee uninterrupted service.
              Scheduled maintenance will be announced in advance. We are not liable for service
              disruptions beyond our reasonable control.
            </p>
            
            <h5 className="font-medium text-sm mt-4">5. Termination</h5>
            <p className="text-sm">
              Either party may terminate this agreement with 30 days' written notice. Upon termination,
              you will lose access to our API services, but may retain any previously downloaded data
              subject to the original licensing terms.
            </p>
            
            <h5 className="font-medium text-sm mt-4">6. Privacy and Security</h5>
            <p className="text-sm">
              We take data privacy seriously. Please review our Privacy Policy for details on how we
              collect, use, and protect your information. You are responsible for maintaining the
              security of your API keys and credentials.
            </p>
            
            <h5 className="font-medium text-sm mt-4">7. Modifications to Service</h5>
            <p className="text-sm">
              We reserve the right to modify, suspend, or discontinue any part of our service with or
              without notice. We may also update these terms from time to time, and your continued use
              of the service constitutes acceptance of any changes.
            </p>
          </div>
        </ScrollArea>
      </div>
      
      <div className="flex items-center space-x-2 mt-4">
        <Checkbox 
          id="termsAccepted" 
          checked={termsAccepted}
          onCheckedChange={(checked) => onTermsAccepted(checked === true)}
        />
        <label
          htmlFor="termsAccepted"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I have read and agree to the Terms of Service
        </label>
      </div>
      
      {!termsAccepted && (
        <p className="text-sm text-amber-600">
          You must accept the terms of service to continue.
        </p>
      )}
    </div>
  );
};
