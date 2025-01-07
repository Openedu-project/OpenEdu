import type { ICourse } from '@oe/api/types/course/course';
import { VideoSquare } from '@oe/assets/icons/video-square';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { TooltipLink } from '@oe/ui/shadcn/tooltip';
import { useTranslations } from 'next-intl';
import { AITag, type IAITag } from './ai-tag';

export default function CourseNameCell({ item }: { item: ICourse }) {
  const tErrors = useTranslations('errors');

  return (
    <div className="flex max-w-[200px] items-center gap-spacing-s">
      {item.is_ai_generated && (
        <AITag
          status={
            item.ai_generate_status.toLowerCase() === 'waiting' &&
            item.ai_course?.general_info_status?.toLowerCase() === 'completed'
              ? 'setting'
              : (item.ai_generate_status.toLowerCase() as unknown as IAITag['status'])
          }
          errorMessage={tErrors(item.ai_course?.error?.code?.toString() ?? 'Error')}
          toolIcon={
            item.ai_course?.offer_type === 'youtube_playlist' && <VideoSquare width={16} height={16} className="ml-1" />
          }
        />
      )}
      <div className="min-w-0 flex-1">
        {/* Thêm wrapper với min-w-0 và flex-1 */}
        {item.is_ai_generated && item.ai_generate_status?.toLowerCase() !== 'completed' ? (
          item.ai_course?.general_info_status?.toLowerCase() === 'completed' ? (
            <TooltipLink name={item.name} href={CREATOR_ROUTES.aiGeneralInfo} prefetch />
          ) : (
            <TooltipLink
              name={item.ai_course?.playlist_link ?? ''}
              href={item.ai_course?.playlist_link ?? '/'}
              target="_blank"
            />
          )
        ) : (
          <TooltipLink
            name={item.name}
            href={buildUrl({ endpoint: CREATOR_ROUTES.aiSettingUp, params: { courseId: item.id } })}
            prefetch
          />
        )}
      </div>
    </div>
  );
}
