
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isPrivacyPolicy?: boolean;
}

const TermsOfServiceModal = ({ 
  isOpen, 
  onOpenChange,
  isPrivacyPolicy = false 
}: TermsOfServiceModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>
            {isPrivacyPolicy ? "Privacy Policy" : "Terms of Service"}
          </DialogTitle>
          <DialogDescription>
            Effective Date: April 1, 2025
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            {isPrivacyPolicy ? (
              <PrivacyPolicyContent />
            ) : (
              <TermsOfServiceContent />
            )}
          </div>
        </ScrollArea>
        
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const TermsOfServiceContent = () => (
  <>
    <div>
      <h3 className="font-semibold text-base mb-2">1. Agreement to Terms</h3>
      <p>
        By accessing or using RealEstateAPI's services, including during your free trial period, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use our services.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">2. Free Trial Terms</h3>
      <p>
        2.1 <span className="font-medium">Trial Period:</span> RealEstateAPI offers a 14-day free trial to new users. During this period, you will have access to features as specified in your selected plan.
      </p>
      <p className="mt-2">
        2.2 <span className="font-medium">No Credit Card Required for Trial:</span> We do not require credit card information to start your free trial.
      </p>
      <p className="mt-2">
        2.3 <span className="font-medium">Trial Limitations:</span> Free trial accounts may have usage limits which will be displayed in your account dashboard.
      </p>
      <p className="mt-2">
        2.4 <span className="font-medium">Conversion to Paid Account:</span> To continue using our services after the trial period, you must select a paid plan. If you do not convert to a paid plan, your account will be limited to read-only access.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">3. Account Registration</h3>
      <p>
        3.1 <span className="font-medium">Account Creation:</span> To use our services, you must register for an account by providing accurate and complete information.
      </p>
      <p className="mt-2">
        3.2 <span className="font-medium">Account Security:</span> You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.
      </p>
      <p className="mt-2">
        3.3 <span className="font-medium">Notification:</span> You must immediately notify RealEstateAPI of any unauthorized use of your account or any other breach of security.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">4. API Usage</h3>
      <p>
        4.1 <span className="font-medium">Permitted Use:</span> You may use our API for your internal business purposes in accordance with our documentation and these Terms.
      </p>
      <p className="mt-2">
        4.2 <span className="font-medium">API Limitations:</span> RealEstateAPI reserves the right to set and enforce limits on your API usage, including the number of API requests that may be made and the number of users that may access the API.
      </p>
      <p className="mt-2">
        4.3 <span className="font-medium">Restrictions:</span> You shall not:
      </p>
      <ul className="list-disc ml-6 mt-1 mb-2">
        <li>Use the API in a way that exceeds rate limitations</li>
        <li>Use the API for any illegal purpose</li>
        <li>Interfere with or disrupt the integrity or performance of the API</li>
        <li>Attempt to gain unauthorized access to the API or related systems</li>
        <li>Redistribute or resell API data without express written permission</li>
      </ul>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">5. Data Privacy</h3>
      <p>
        5.1 <span className="font-medium">Data Collection:</span> We collect and process information as described in our Privacy Policy.
      </p>
      <p className="mt-2">
        5.2 <span className="font-medium">Data Security:</span> RealEstateAPI implements reasonable security measures to protect your data, but we cannot guarantee absolute security.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">6. Intellectual Property</h3>
      <p>
        6.1 <span className="font-medium">Ownership:</span> RealEstateAPI owns all rights, title, and interest in the services, including all intellectual property rights.
      </p>
      <p className="mt-2">
        6.2 <span className="font-medium">License:</span> RealEstateAPI grants you a limited, non-exclusive, non-transferable, revocable license to use our services in accordance with these Terms.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">7. Disclaimer of Warranties</h3>
      <p>
        RealEstateAPI provides the service and trial "as is" and "as available" without any warranty of any kind. We explicitly disclaim all warranties, whether express, implied, or statutory.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">8. Limitation of Liability</h3>
      <p>
        In no event shall RealEstateAPI be liable for any indirect, incidental, special, consequential, or exemplary damages arising out of or in connection with the use of our services.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">9. Termination</h3>
      <p>
        RealEstateAPI reserves the right to suspend or terminate your access to our services, including during the free trial period, for any reason, without notice.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">10. Changes to Terms</h3>
      <p>
        RealEstateAPI may modify these Terms at any time. Your continued use of our services after such modifications constitutes acceptance of the modified Terms.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">11. Contact Information</h3>
      <p>
        If you have any questions about these Terms, please contact us at legal@realestateapi.com.
      </p>
    </div>
  </>
);

const PrivacyPolicyContent = () => (
  <>
    <div>
      <h3 className="font-semibold text-base mb-2">1. Introduction</h3>
      <p>
        This Privacy Policy explains how RealEstateAPI collects, uses, and discloses information about you when you use our services, including during your free trial period.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">2. Information We Collect</h3>
      <p>
        2.1 <span className="font-medium">Account Information:</span> We collect information you provide when creating an account, such as your name, email address, and company information.
      </p>
      <p className="mt-2">
        2.2 <span className="font-medium">Usage Information:</span> We collect information about how you use our services, including API requests, feature usage, and interaction with our platform.
      </p>
      <p className="mt-2">
        2.3 <span className="font-medium">Device Information:</span> We collect information about the device and browser you use to access our services.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">3. How We Use Your Information</h3>
      <p>
        We use the information we collect to:
      </p>
      <ul className="list-disc ml-6 mt-1 mb-2">
        <li>Provide, maintain, and improve our services</li>
        <li>Process transactions and manage your account</li>
        <li>Send you technical notices, updates, and support messages</li>
        <li>Respond to your comments and questions</li>
        <li>Monitor and analyze trends, usage, and activities</li>
        <li>Detect, prevent, and address fraud and abuse</li>
        <li>Personalize your experience</li>
      </ul>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">4. Information Sharing</h3>
      <p>
        We may share your information with:
      </p>
      <ul className="list-disc ml-6 mt-1 mb-2">
        <li>Service providers who perform services on our behalf</li>
        <li>Professional advisors, such as lawyers and accountants</li>
        <li>Authorities when required by law</li>
        <li>Business partners with your consent</li>
      </ul>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">5. Data Retention</h3>
      <p>
        We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">6. Security</h3>
      <p>
        We implement reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is completely secure.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">7. Your Rights</h3>
      <p>
        Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. Please contact us to exercise these rights.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">8. Children's Privacy</h3>
      <p>
        Our services are not directed to children under 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16, we will take steps to delete that information.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">9. Changes to this Privacy Policy</h3>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-base mb-2">10. Contact Us</h3>
      <p>
        If you have any questions about this Privacy Policy, please contact us at privacy@realestateapi.com.
      </p>
    </div>
  </>
);

export default TermsOfServiceModal;
