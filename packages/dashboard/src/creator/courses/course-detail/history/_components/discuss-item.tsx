import type { IDiscussion } from '@oe/api/types/course/discuss';
import CheckFilledCircle from '@oe/assets/icons/check-filled-circle';
import CloseCircle from '@oe/assets/icons/close-circle';
import { formatTimeHourMinute } from '@oe/core/utils/datetime';
import { Card } from '@oe/ui/shadcn/card';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const DiscussItem = ({
  discuss,
  username,
}: {
  discuss: IDiscussion;
  username?: string;
}) => {
  const t = useTranslations('course.history.feedback');
  const isMe = username === discuss.username;
  const [isShowTime, setIsShowTime] = useState(!isMe);
  return (
    <Card
      className={cn(
        'flex w-[80%] flex-col gap-1 border-none bg-transparent p-0 shadow-none',
        isMe ? 'self-end' : 'self-start'
      )}
      onClick={() => {
        setIsShowTime(true);
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          {!isMe && <p className="font-bold text-sm">{discuss.username}</p>}
          {discuss.action === 'feedback' ? (
            ''
          ) : (
            <div className="flex items-center gap-4">
              {discuss.action === 'approved' ? (
                <CheckFilledCircle height={16} width={16} className="text-primary" />
              ) : (
                <CloseCircle height={16} width={16} />
              )}
              <p className="text-primary text-sm">{t('actionRequest', { action: discuss.action })}</p>
            </div>
          )}
        </div>
        {isShowTime && <p className="text-foreground/80 text-xs">{formatTimeHourMinute(discuss.send_date)}</p>}
      </div>

      <p className="rounded-sm bg-muted/80 p-4 text-sm">{discuss.content}</p>
    </Card>
  );
};

DiscussItem.displayName = 'DiscussItem';
export { DiscussItem };
