import type { ICourseOwner } from '@oe/api';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { UserAvatar } from '#components/user-avatar';
import { userProfileUrl } from './_helper';

export function CourseCreator({ owner }: { owner: ICourseOwner }) {
  const tCourse = useTranslations('courseOutline');

  return (
    <Link href={userProfileUrl(owner?.username)} className="w-full max-w-fit flex-1 p-0 hover:no-underline">
      <div className="flex w-full items-center gap-2">
        <div className="mcaption-semibold16 line-clamp-1 flex flex-1 items-center gap-1">
          <span className="text-white">{tCourse('creator')}:</span>
          <span className="mcaption-semibold16 line-clamp-1 w-full text-secondary underline">
            {owner?.display_name && owner.display_name?.length > 0 ? owner.display_name : owner?.username}
          </span>
        </div>

        <UserAvatar src={owner?.avatar ?? ''} name={owner?.display_name ?? owner?.username ?? ''} />
      </div>
    </Link>
  );
}
