import { EditProfileContent } from './_component/edit-profile-content';
import { ProfileHeader } from './_component/profile-header';

export function EditProfile() {
  return (
    <div className="mx-auto mb-20 max-w-[1080px]">
      <ProfileHeader />

      <EditProfileContent />
    </div>
  );
}
