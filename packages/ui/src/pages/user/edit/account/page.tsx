import { EditProfileHeader } from '../_components/edit-profile-header';
import { EditAccountContent } from './_components/edit-account';

export function EditAccount() {
  return (
    <div className="mx-auto mb-20 max-w-[1080px]">
      <EditProfileHeader />

      <EditAccountContent />
    </div>
  );
}
