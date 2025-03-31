
import React from 'react';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileForm } from './ProfileForm';

const ProfileInfo = () => {
  // These would typically come from a user context or API in a real app
  const initialName = 'John Doe';
  const initialEmail = 'john@example.com';
  const initialCompanyName = 'Acme Inc.';

  return (
    <div className="space-y-6">
      <ProfileAvatar initialImage={null} />
      <ProfileForm 
        initialName={initialName}
        initialEmail={initialEmail}
        initialCompanyName={initialCompanyName}
      />
    </div>
  );
};

export default ProfileInfo;
