import EditProfileHeader from '../_components/edit-profile-header';
import NotificationContent from './_components/edit-notification-content';

export default function NotificationProfile() {
  return (
    <div className="mx-auto mb-20 max-w-[1080px]">
      <EditProfileHeader />

      <NotificationContent />
    </div>
  );
}
