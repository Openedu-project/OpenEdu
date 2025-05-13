import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { UserAvatar } from '#components/user-avatar';
import { useCourseContext } from '../course-context';
import { CourseSection } from '../course-section';
import { userProfileUrl } from './_helper';
import { CreatorInfor } from './creator-info';

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
      <CourseSection title={tCourse('title')} childrenClass="flex gap-4 items-center">
        {/* <div className="flex gap-4"> */}
        <UserAvatar
          src={creatorData?.avatar ?? ''}
          name={userName}
          className="[&>div]:giant-iheading-semibold28 md:[&>div]:giant-iheading-bold40 h-16 w-16 md:h-[80px] md:w-[80px]"
        />
        <div className="flex-1 space-y-3">
          <Link
            href={userProfileUrl(creatorData?.username)}
            className="giant-iheading-bold16 lg:giant-iheading-semibold20 h-fit p-0 text-current hover:no-underline"
          >
            {userName}
          </Link>

          <p className="mcaption-semibold14 lg:mcaption-semibold16 line-clamp-2">{creatorData?.headline}</p>
          {/* <CreatorRole roles={creatorData?.roles} /> */}
          <CreatorInfor creatorData={creatorData} />
        </div>
        {/* </div> */}
      </CourseSection>
    )
  );
}
