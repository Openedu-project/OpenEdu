import ProfileHeader from '../_component/profile-header';
import MyCertificateSettings from './_components/my-certificates-setting';

export default function EditCertificate() {
  return (
    <div className="mx-auto mb-20 max-w-[1080px]">
      <ProfileHeader />
      <MyCertificateSettings />
    </div>
  );
}
