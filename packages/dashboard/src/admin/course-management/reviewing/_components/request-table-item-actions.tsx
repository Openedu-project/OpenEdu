'use client';

import type { IApproval } from '@oe/api/types/approvals';
import type { ICourse } from '@oe/api/types/course/course';
import type { ICourseOrganizationRequestProps } from '@oe/api/types/course/org-request';
import { Button } from '@oe/ui/shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@oe/ui/shadcn/dropdown-menu';
import { Check, ChevronDown, NotebookPenIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCourseRequestStore } from '../_store/useAdminCourseManagement';

type IApprovalCourseRequest = IApproval<ICourse, ICourseOrganizationRequestProps>;

type Props = {
  item: IApprovalCourseRequest;
  setReadOnly: () => void;

  handleAction: (item: IApprovalCourseRequest, action: 'approve' | 'reject') => void;
  handleFeedbackModal: () => void;
};

export const CourseRequestItemActions = ({ item, setReadOnly, handleAction, handleFeedbackModal }: Props) => {
  const t = useTranslations('coursesManagement');
  const { setSelectedCourseRequest } = useCourseRequestStore.getState();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disabled={item.status === 'cancelled'}>
            {t('action')} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-30">
          <DropdownMenuItem
            onClick={() => {
              handleFeedbackModal();
              setSelectedCourseRequest(item);
              setReadOnly();
            }}
            className={`${
              item?.props?.discussion === null
                ? ''
                : item?.props?.is_admin_feedback
                  ? ''
                  : `after:-top-1 after:-right-1 relative after:absolute after:h-3 after:w-3 after:rounded-full after:bg-red-500 after:content-['']`
            }`}
          >
            <NotebookPenIcon className="mr-2 h-4 w-4" />
            <span>{t('feedback')}</span>
          </DropdownMenuItem>
          {(item.status === 'new' || item.status === 'pending') && (
            <>
              <DropdownMenuItem
                onClick={() => {
                  handleAction(item, 'approve');
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                <span>{t('approve')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleAction(item, 'reject');
                }}
              >
                <X className="mr-2 h-4 w-4" />
                <span>{t('reject')}</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
