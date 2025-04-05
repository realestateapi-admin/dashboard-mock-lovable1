
import React from 'react';

export const TermsOfServiceModalSection: React.FC = () => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">Terms of Service Modal Implementation</h3>
      <p className="mb-2">
        The sign-up page now includes a Terms of Service and Privacy Policy modal integration:
      </p>
      <ul className="list-disc ml-5 mb-4">
        <li>Modal appears when users click on "Terms of Service" or "Privacy Policy" links in the sign-up form</li>
        <li>Uses the Dialog component from shadcn/ui for the modal implementation</li>
        <li>Includes specific terms related to the free trial period</li>
        <li>Uses ScrollArea component to handle overflow content</li>
        <li>Supports two content views: Terms of Service and Privacy Policy</li>
      </ul>
      
      <h4 className="text-lg font-medium mb-2">Technical Implementation Details:</h4>
      <ul className="list-disc ml-5 mb-4">
        <li>The implementation uses a reusable TermsOfServiceModal component that accepts isOpen, onOpenChange, and isPrivacyPolicy props</li>
        <li>The component renders different content based on the isPrivacyPolicy flag</li>
        <li>Modal state is managed in the SignUp component with separate state variables for Terms and Privacy modals</li>
        <li>The component handles scrolling for long content with a fixed maximum height</li>
      </ul>
      
      <h4 className="text-lg font-medium mb-2">Integration with User Signup Flow:</h4>
      <ul className="list-disc ml-5 mb-4">
        <li>Users must explicitly check an agreement checkbox before account creation</li>
        <li>The modal clearly highlights free trial terms and conditions</li>
        <li>Implementation follows accessibility best practices with proper focus management</li>
        <li>The modal includes an effective date and proper closing mechanism</li>
      </ul>
      
      <h4 className="text-lg font-medium mb-2">Payment Methods Implementation:</h4>
      <ul className="list-disc ml-5 mb-4">
        <li>Implemented a modular payment methods system with credit card and ACH bank account options</li>
        <li>Created separate hooks for state management, validation, and operations</li>
        <li>Added proper error handling and validation for all payment forms</li>
        <li>Supports setting a default payment method and removing existing methods</li>
        <li>Implemented backup credit card requirement for ACH payment methods</li>
      </ul>
      
      <h4 className="text-lg font-medium mb-2">Payment Method Architecture:</h4>
      <ul className="list-disc ml-5 mb-4">
        <li>Used React context pattern for managing payment method state across components</li>
        <li>Created specialized hooks for different concerns: usePaymentMethodState, usePaymentMethodOperations, etc.</li>
        <li>Built responsive UI with proper validation feedback</li>
        <li>Added security features like masking card numbers and displaying trust indicators</li>
        <li>Implemented a tabbed interface for different payment method types</li>
      </ul>
    </div>
  );
};
