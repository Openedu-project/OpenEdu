import { ProfileHeader } from '../_component/profile-header';
import { MyCourseSettings } from './_components/my-courses-setting';

export function EditCourses() {
  return (
    <div className="mx-auto mb-20 max-w-[1080px]">
      <ProfileHeader />
      <MyCourseSettings />
    </div>
  );
}
