import { useAdminFeedback } from '@oe/api/hooks/useApprovals';
import { useGetMe } from '@oe/api/hooks/useMe';
import type { IListApproval } from '@oe/api/types/approvals';
import type { ICourse } from '@oe/api/types/course/course';
import type { IDiscussion } from '@oe/api/types/course/discuss';
import type { ICourseOrganizationRequestProps } from '@oe/api/types/course/org-request';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import CheckFilledCircle from '@oe/assets/icons/check-filled-circle';
import CloseCircle from '@oe/assets/icons/close-circle';
import { formatTimeHourMinute } from '@oe/core/utils/datetime';
import { Modal } from '@oe/ui/components/modal';
import { Label } from '@oe/ui/shadcn/label';
import { toast } from '@oe/ui/shadcn/sonner';
import { Textarea } from '@oe/ui/shadcn/textarea';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyedMutator } from 'swr';
import { useCourseRequestStore } from '../_store/useAdminCourseManagement';

interface IProps {
  open: boolean;
  onClose: () => void;
  mutate?: KeyedMutator<IListApproval<ICourse, ICourseOrganizationRequestProps>>;
  readOnly?: boolean;
}

const AdminFeedbackCourseModal = ({ open, onClose, mutate, readOnly = false }: IProps) => {
  const t = useTranslations('coursesManagement');
  const tError = useTranslations('errors');

  const { selectedCourseRequest, setSelectedCourseRequest } = useCourseRequestStore.getState();
  const { triggerAdminFeedback } = useAdminFeedback(selectedCourseRequest?.id ?? '');

  const [val, setVal] = useState('');
  const { dataMe: me } = useGetMe();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.scrollIntoView();
      }
    }, 0);
  }, []);

  const handleSendFeedback = useCallback(async () => {
    try {
      const res = await triggerAdminFeedback({ content: val });

      if (!res) {
        throw new Error('Fail');
      }

      setVal('');
      setSelectedCourseRequest(res);
      scrollToBottom();
      await mutate?.();
    } catch (error) {
      console.error('Error', error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [tError, triggerAdminFeedback, val, setSelectedCourseRequest, mutate, scrollToBottom]);

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [scrollToBottom, open]);

  const FeedbackConversationItem = useMemo(() => {
    return ({
      discuss,
      username,
    }: {
      discuss: IDiscussion;
      username?: string;
    }) => (
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="mcaption-semibold16 flex gap-2">
            <p> {discuss.username}</p>
            <p>{username === discuss.username ? ' (You)' : ''}</p>
            {discuss.action === 'feedback' ? (
              ''
            ) : (
              <div className="flex items-center gap-4">
                {discuss.action === 'approved' ? (
                  <CheckFilledCircle height={16} width={16} className="text-primary" />
                ) : (
                  <CloseCircle height={16} width={16} />
                )}
                <p className="giant-iheading-regular16">{`${discuss.action} your request`}</p>
              </div>
            )}
          </div>
          <p className="mcaption-regular14 text-neutral-600">{formatTimeHourMinute(discuss.send_date)}</p>
        </div>

        <p className="rounded-sm bg-bg-bg-gray-50 p-4">{discuss.content}</p>
      </div>
    );
  }, []);

  return (
    <Modal
      open={true}
      title={t('sendFeedback')}
      onClose={onClose}
      buttons={[
        {
          type: 'button',
          label: t('cancel'),
          variant: 'outline',
          onClick: () => onClose(),
        },
        {
          type: 'button',
          label: 'Send',
          variant: 'default',
          onClick: handleSendFeedback,
        },
      ]}
    >
      <>
        <div className="flex min-h-[350px] flex-col gap-5 py-1">
          {selectedCourseRequest?.props?.discussion?.map(discuss => (
            <FeedbackConversationItem key={discuss.id} discuss={discuss} username={me?.username} />
          ))}
        </div>
        {!readOnly && (
          <div className="flex flex-col gap-5 border-neutral-50 border-t-[1px] pt-5">
            <Label>{t('yourFeedback')}</Label>

            {selectedCourseRequest?.props?.is_include_change && <p>{t('updatedCourseVersion')}</p>}

            <Textarea
              value={val}
              onChange={e => {
                if (e) {
                  setVal(e.currentTarget.value);
                }
              }}
              placeholder={t('writeResponse')}
              ref={textareaRef}
            />
          </div>
        )}
      </>
    </Modal>
  );
};

export { AdminFeedbackCourseModal };
