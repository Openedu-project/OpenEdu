import EditProfileHeader from '../_components/edit-profile-header';
import EditPasswordContent from './_components/edit-password-content';

export default function ProfileEditPassword() {
  return (
    <div className="mx-auto mb-20 max-w-[1080px]">
      <EditProfileHeader />

      <EditPasswordContent />
    </div>
  );
}
