
import { ScrollArea } from "@/components/ui/scroll-area";

export const TermsOfServiceTab = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Terms of Service</h3>
      
      <div className="border rounded-md shadow-sm">
        <ScrollArea className="h-[600px] rounded-md">
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
            
            <h4 className="text-base font-semibold">12. Data Processing</h4>
            <p>We process your data in accordance with our Data Processing Agreement, which forms an integral part of these Terms of Service. By using our services, you acknowledge and agree to the collection, use, and processing of your data as described therein.</p>
            
            <h4 className="text-base font-semibold">13. Service Level Agreement</h4>
            <p>Our Service Level Agreement (SLA) outlines our commitments regarding service availability and support response times. The SLA is incorporated by reference into these Terms of Service.</p>
            
            <h4 className="text-base font-semibold">14. Intellectual Property</h4>
            <p>All content, features, and functionality of our service, including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof, are owned by us, our licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
            
            <h4 className="text-base font-semibold">15. User Obligations</h4>
            <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.</p>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
