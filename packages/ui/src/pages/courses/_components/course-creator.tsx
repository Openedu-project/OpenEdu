import { createAPIUrl } from '@oe/api/utils/fetch';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { UserAvatar } from '#components/user-avatar';
import { useCourseOutlineDetailStore } from '../_store/useCourseOutlineStore';

export default function CourseCreator() {
  const tCourse = useTranslations('courseOutline');
  const { courseOutline } = useCourseOutlineDetailStore();

  const owner = courseOutline?.owner;

  return (
    <Link
      href={
        owner?.username && owner.username?.length > 0
          ? createAPIUrl({
              endpoint: PLATFORM_ROUTES.userProfile,
              params: { username: owner?.username },
            })
          : ''
      }
      className="max-w-fit flex-1 p-0 hover:no-underline"
    >
      <div className="flex items-center gap-2">
        <div className="mcaption-semibold14 md:mcaption-semibold18 line-clamp-1 flex items-center gap-1">
          <span className="text-foreground/70">{tCourse('creator')}:</span>
          <h2 className="mcaption-semibold14 md:mcaption-semibold18 mb-0 line-clamp-1 text-primary">
            {owner?.display_name && owner.display_name?.length > 0 ? owner.display_name : owner?.username}
          </h2>
        </div>

        <UserAvatar src={owner?.avatar ?? ''} name={owner?.display_name ?? owner?.username ?? ''} />
      </div>
    </Link>
  );
}
