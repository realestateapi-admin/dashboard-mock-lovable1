
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, ChevronDown } from "lucide-react";

interface TermsOfServiceStepProps {
  isLoading?: boolean;
  termsAccepted: boolean;
  onTermsAccepted: (accepted: boolean) => void;
}

const ScrollIndicator = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;
  
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
      <div className="bg-primary/60 text-primary-foreground rounded-full p-2 shadow-md border border-background/20">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
};

export const TermsOfServiceStep = ({
  isLoading = false,
  termsAccepted,
  onTermsAccepted
}: TermsOfServiceStepProps) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const checkScrollPosition = () => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
      // Consider slightly more lenient threshold (scrollHeight - 50 instead of 30)
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
      const hasMoreContent = scrollHeight > clientHeight + 10;
      
      if (isAtBottom) {
        setHasScrolledToBottom(true);
      }
      
      setShowScrollIndicator(hasMoreContent && !isAtBottom);
    }
  };
  
  // Handle scroll event with debounce
  useEffect(() => {
    const scrollElement = scrollAreaRef.current;
    
    if (scrollElement) {
      const handleScroll = () => {
        checkScrollPosition();
      };
      
      scrollElement.addEventListener('scroll', handleScroll);
      
      // Check initial scroll position (in case content is short)
      const timeouts = [100, 500, 1000].map(delay => 
        setTimeout(checkScrollPosition, delay)
      );
      
      return () => {
        timeouts.forEach(clearTimeout);
        scrollElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Terms of Service</h3>
      
      <Alert className="bg-blue-50 border-blue-200">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Please read and accept our Terms of Service to continue
        </AlertDescription>
      </Alert>
      
      <div className="border rounded-md shadow-sm relative">
        <ScrollArea className="h-[400px] rounded-md" ref={scrollAreaRef}>
          <div className="p-4 text-sm text-gray-700 space-y-4">
            <h4 className="text-base font-semibold">1. Acceptance of Terms</h4>
            <p>By accessing or using our service, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.</p>
            
            <h4 className="text-base font-semibold">2. Use License</h4>
            <p>Permission is granted to temporarily access the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            
            <h4 className="text-base font-semibold">3. Disclaimer</h4>
            <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            
            <h4 className="text-base font-semibold">4. Limitations</h4>
            <p>In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>
            
            <h4 className="text-base font-semibold">5. Accuracy of Materials</h4>
            <p>The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current. We may make changes to the materials contained on its website at any time without notice.</p>
            
            <h4 className="text-base font-semibold">6. Links</h4>
            <p>We have not reviewed all of the sites linked to its website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.</p>
            
            <h4 className="text-base font-semibold">7. Modifications</h4>
            <p>We may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
            
            <h4 className="text-base font-semibold">8. Governing Law</h4>
            <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
            
            <h4 className="text-base font-semibold">9. Privacy Policy</h4>
            <p>Your use of our website is also governed by our Privacy Policy, which is incorporated into these Terms of Service by reference.</p>
            
            <h4 className="text-base font-semibold">10. Termination</h4>
            <p>We may terminate your access to the website, without cause or notice, which may result in the forfeiture and destruction of all information associated with your account.</p>
            
            <h4 className="text-base font-semibold">11. Subscription Terms</h4>
            <p>By subscribing to our service, you agree to pay all fees associated with the subscription plan you select. All fees are exclusive of taxes, which we will charge as applicable. You agree to provide current, complete, and accurate payment information and authorize us to charge your credit card or bank account for all fees associated with your subscription.</p>
          </div>
        </ScrollArea>
        <ScrollIndicator isVisible={showScrollIndicator} />
      </div>
      
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox 
          id="terms" 
          checked={termsAccepted}
          onCheckedChange={(checked) => onTermsAccepted(checked === true)}
          disabled={!hasScrolledToBottom}
        />
        <Label 
          htmlFor="terms" 
          className={!hasScrolledToBottom ? "text-gray-400" : ""}
        >
          I have read and agree to the Terms of Service
          {!hasScrolledToBottom && (
            <span className="ml-2 text-amber-600 text-sm font-medium">
              (Please scroll to the bottom to enable)
            </span>
          )}
        </Label>
      </div>
    </div>
  );
};
