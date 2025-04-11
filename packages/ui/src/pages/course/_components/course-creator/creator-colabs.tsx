import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { UserAvatar } from '#components/user-avatar';
import { useCourseContext } from '../course-context';
import { CourseSection } from '../course-section';
import { userProfileUrl } from './_helper';
import { CreatorInfor } from './creator-info';
import { CreatorRole } from './creator-role';

export function CreatorColabs() {
  const tCourse = useTranslations('courseOutline.creatorAndColabs');
  const { creatorData } = useCourseContext();

  const userName = creatorData
    ? creatorData?.display_name?.length > 0
      ? creatorData?.display_name
      : creatorData?.username
    : '';

  return (
    creatorData && (
      <CourseSection title={tCourse('title')}>
        <div className="flex flex-col gap-4 lg:p-6">
          <div className="flex gap-4">
            <UserAvatar
              src={creatorData?.avatar ?? ''}
              name={userName}
              className="[&>div]:giant-iheading-semibold28 md:[&>div]:giant-iheading-bold40 h-16 w-16 md:h-[80px] md:w-[80px]"
            />
            <div>
              <Link
                href={userProfileUrl(creatorData?.username)}
                className="giant-iheading-bold16 lg:giant-iheading-semibold20 h-fit p-0 text-current hover:no-underline"
              >
                {userName}
              </Link>
              <CreatorRole roles={creatorData?.roles} />
            </div>
          </div>
          <CreatorInfor creatorData={creatorData} />
        </div>
      </CourseSection>
    )
  );
}
