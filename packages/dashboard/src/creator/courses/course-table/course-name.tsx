import type { ICourse } from '@oe/api';
import { CREATOR_ROUTES } from '@oe/core';
import { buildUrl } from '@oe/core';
import { TooltipLink } from '@oe/ui';
import { useTranslations } from 'next-intl';

export function CourseName({ data }: { data: ICourse }) {
  const tCourse = useTranslations('course');
  const isAiGenerated = data.is_ai_generated;
  const aiCourse = data.ai_course;
  const aiCompleted = data?.ai_generate_status === 'completed';
  const aiName = aiCourse?.course_title || aiCourse?.playlist_link;
  const name = aiName ?? data.name;
  const isAiYoutubeLink = !aiCompleted && aiCourse?.offer_type === 'youtube_playlist';
  const href =
    aiCompleted || !isAiGenerated
      ? buildUrl({
          endpoint: CREATOR_ROUTES.courseSettingUp,
          params: { courseId: data.id },
        })
      : aiCourse?.general_info_status === 'completed'
        ? buildUrl({
            endpoint: CREATOR_ROUTES.aiGeneralInfo,
            params: { id: data.id },
          })
        : aiCourse?.playlist_link;

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
  return <span>{name ?? tCourse('common.noName')}</span>;
}
