import { EditProfileHeader } from '../_components/edit-profile-header';
import { PrivacyContent } from './_components/privacy-content';

export function ProfilePrivacy() {
  return (
    <div className="mx-auto mb-20 max-w-[1080px]">
      <EditProfileHeader />

      <PrivacyContent />
    </div>
  );
}
