import type { IDiscussion } from '@oe/api/types/course/discuss';
import CheckFilledCircle from '@oe/assets/icons/check-filled-circle';
import CloseCircle from '@oe/assets/icons/close-circle';
import { formatTimeHourMinute } from '@oe/core/utils/datetime';
import { useTranslations } from 'next-intl';

const DiscussItem = ({
  discuss,
  username,
}: {
  discuss: IDiscussion;
  username?: string;
}) => {
  const t = useTranslations('course.history.feedback');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="mcaption-semibold16 flex gap-2">
          <p> {discuss.username}</p>
          <p>{username === discuss.username ? t('you') : ''}</p>
          {discuss.action === 'feedback' ? (
            ''
          ) : (
            <div className="flex items-center gap-4">
              {discuss.action === 'approved' ? (
                <CheckFilledCircle height={16} width={16} />
              ) : (
                <CloseCircle height={16} width={16} />
              )}
              <p className="giant-iheading-regular16">{t('actionRequest', { action: discuss.action })}</p>
            </div>
          )}
        </div>
        <p className="mcaption-regular14">{formatTimeHourMinute(discuss.send_date)}</p>
      </div>

      <p className="rounded-sm bg-muted/80 p-4">{discuss.content}</p>
    </div>
  );
};

DiscussItem.displayName = 'DiscussItem';
export { DiscussItem };
