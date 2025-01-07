import { createAPIUrl } from '@oe/api/utils/fetch';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import type { HTMLAttributes } from 'react';
import { Link } from '#common/navigation';
import { LastUpdated } from '../../_components/last-updated';
import NavigateButton from './navigate-button';

interface ILessonMetadataProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  courseName: string;
  slug: string;
  updateAt: number;
}

const LessonMetadata = ({ title, courseName, slug, updateAt, ...props }: ILessonMetadataProps) => {
  const courseHref = createAPIUrl({
    endpoint: PLATFORM_ROUTES.courseDetail,
    params: { slug },
  });

  return (
    <div {...props}>
      <div className="flex justify-between gap-2">
        <h3 className="giant-iheading-semibold16 md:giant-iheading-semibold24 mb-0 text-primary md:line-clamp-1">
          {title}
        </h3>
        <NavigateButton />
      </div>
      <Link
        href={courseHref}
        className="giant-iheading-semibold16 md:giant-iheading-semibold20 !text-foreground/85 w-fit border-none p-0 hover:no-underline md:line-clamp-1"
      >
        Course: {courseName}
      </Link>
      <LastUpdated update_at={updateAt} />
    </div>
  );
};

export default LessonMetadata;
