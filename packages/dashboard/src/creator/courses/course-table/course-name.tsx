import type { ICourse } from '@oe/api/types/course/course';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import TooltipLink from '@oe/ui/shadcn/tooltip';
import { useTranslations } from 'next-intl';

export default function CourseName({ data }: { data: ICourse }) {
  const tCourses = useTranslations('courses');
  const isAiGenerated = data.is_ai_generated;
  const aiCourse = data.ai_course;
  const aiCompleted = data?.ai_generate_status === 'completed';
  const aiName = aiCourse?.course_title || aiCourse?.playlist_link;
  const name = isAiGenerated ? aiName : data.name;
  const isAiYoutubeLink = isAiGenerated && !aiCompleted;
  const href = isAiGenerated
    ? aiCourse?.general_info_status === 'completed'
      ? buildUrl({
          endpoint: CREATOR_ROUTES.aiGeneralInfo,
          queryParams: { courseId: data.id },
        })
      : aiCourse?.playlist_link
    : buildUrl({
        endpoint: CREATOR_ROUTES.courseSettingUp,
        params: { courseId: data.id },
      });

  if (href && name) {
    return (
      <TooltipLink
        name={name}
        href={href}
        className="block h-auto truncate no-underline"
        external={isAiYoutubeLink}
        target={isAiYoutubeLink ? '_blank' : undefined}
      />
    );
  }
  return <span>{name ?? tCourses('noName')}</span>;
}
