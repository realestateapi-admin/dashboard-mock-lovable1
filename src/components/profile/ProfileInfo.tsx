
import React, { useState, useEffect } from 'react';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileForm } from './ProfileForm';

const ProfileInfo = () => {
  // Check localStorage first, then fall back to default values
  const [userEmail, setUserEmail] = useState(() => 
    localStorage.getItem('userEmail') || 'john@example.com'
  );
  const initialName = 'John Doe';
  const initialCompanyName = 'Acme Inc.';

  // Update the email in localStorage whenever it changes
  const handleEmailChange = (newEmail: string) => {
    setUserEmail(newEmail);
  };

  return (
    <div className="space-y-6">
      <ProfileAvatar initialImage={null} />
      <ProfileForm 
        initialName={initialName}
        initialEmail={userEmail}
        initialCompanyName={initialCompanyName}
        onEmailChange={handleEmailChange}
      />
    </div>
  );
};

export default ProfileInfo;
