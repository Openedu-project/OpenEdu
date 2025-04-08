'use client';

import { useParams } from 'next/navigation';
import { useCallback } from 'react';

import { useGetCourseOutline } from '@oe/api/hooks/useCourse';
import { postSubmitForm } from '@oe/api/services/forms';
import type { IAnswerParams } from '@oe/api/types/form';
import { getCookieClient } from '@oe/core/utils/cookie';
import { buildUrl } from '@oe/core/utils/url';
import type { VariantProps } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Link } from '#common/navigation';
import { Modal } from '#components/modal';
import { Button, buttonVariants } from '#shadcn/button';
import { cn } from '#utils/cn';
import { FormRendererModal } from '../dynamic-form/editor/form-renderer-modal';
import { useNotiTrigger } from './_hooks';
import { useLearnerFormTriggerStore, useTriggerModalStore } from './_store';
import { MODAL_ID } from './_utils';

interface IProps {
  type?: 'page' | 'slide';
  mutate?: () => void;
}
// interface IBaseItem {
//   id: string;
// }

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
type ButtonVariant = ButtonVariantProps['variant'];

// function addNewId<T extends IBaseItem>(data: T[]) {
//   return data.map((item, index) => (item.id ? item : { ...item, id: `item-${index}` }));
// }

const CourseFormTriggerModal = ({ mutate }: IProps) => {
  // const CourseFormTriggerModal = ({ type = 'page', mutate }: IProps) => {
  const t = useTranslations('courseTriggerModal');
  const { slug } = useParams();

  const { setOpenTriggerModal, modals } = useTriggerModalStore();
  const { formData, currentConfirmationSettings, triggerType, activedTriggerId, currentFormId } =
    useLearnerFormTriggerStore();

  const accessTokenKey = process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY;
  const accessToken = getCookieClient(accessTokenKey);

  const { handleShowFormAfterSubmission } = useNotiTrigger();

  const getButtonVariant = (variant: string) =>
    buttonVariants({
      variant: (variant as ButtonVariant) ?? 'default',
    });

  const { course } = useGetCourseOutline(slug as string);

  let source = '';
  const fromSourceStorage = getCookieClient(String(process.env.NEXT_PUBLIC_COOKIE_FROM_SOURCE));

  if (fromSourceStorage) {
    const fromSourceData: { fromSource: string; courseSlug: string }[] = fromSourceStorage
      ? typeof fromSourceStorage === 'string'
        ? JSON.parse(fromSourceStorage)
        : fromSourceStorage
      : [];
    // Filter entries with matching courseSlug and sort by most recent (assuming they're added in order)
    const matchingEntries = fromSourceData
      ?.filter(entry => entry?.courseSlug === slug)
      ?.sort((a, b) => fromSourceData?.indexOf(b) - fromSourceData?.indexOf(a));

    if (matchingEntries?.length > 0) {
      source = matchingEntries[0]?.fromSource ?? '';
    }
  }

  const handleCloseFormAfterModal = () => {
    // If the noti trigger has link that was redirected with accessToken, cuid params
    if (currentConfirmationSettings?.buttons?.[0]?.type) {
      const directLink = buildUrl({
        endpoint: currentConfirmationSettings?.buttons?.[0]?.type ?? '',
        queryParams: {
          access_token: accessToken,
          course_cuid: course?.cuid,
          course_name: course?.name,
        },
      });

      window.open(directLink, '_blank');
    }

    // If the noti trigger have type (link), keep open modal
    setOpenTriggerModal(
      MODAL_ID.afterSubmitFormTrigger,
      currentConfirmationSettings?.buttons?.[0]?.type?.trim() !== ''
    );
  };

  const handleSubmit = useCallback(
    async (values: IAnswerParams[]) => {
      if (currentFormId) {
        try {
          const res = await postSubmitForm(undefined, {
            formId: currentFormId,
            payload: {
              form_relation_id: activedTriggerId,
              answers: values,
            },
            queryParams: { source },
          });

          if (!res) {
            toast.success(t('submitError'));
            return;
          }

          toast.success(t('submitSuccess'));

          handleShowFormAfterSubmission(currentConfirmationSettings);

          mutate?.();
        } catch (error) {
          console.error(error);
        }
      } else {
        toast.error(t('formNotFound'));
      }
    },
    [currentConfirmationSettings, activedTriggerId, currentFormId, mutate, source, handleShowFormAfterSubmission]
    // [activedTriggerId, currentConfirmationSettings, handleShowFormAfterSubmission, mutate, submitForm, tError, toast]
  );

  return triggerType === 'form' && formData ? (
    <>
      <FormRendererModal
        open={modals[MODAL_ID.learnerCourseFormTrigger]}
        onClose={() => setOpenTriggerModal(MODAL_ID.learnerCourseFormTrigger, false)}
        formData={formData}
        onSubmit={handleSubmit}
        hasCancelButton={false}
      />

      {currentConfirmationSettings?.enabled && (
        <Modal
          open={modals[MODAL_ID.afterSubmitFormTrigger]}
          onClose={() => setOpenTriggerModal(MODAL_ID.afterSubmitFormTrigger, false)}
          title={currentConfirmationSettings.title}
          hasCancelButton={false}
          hasCloseIcon
        >
          <div className="flex justify-end gap-3 pb-4">
            {currentConfirmationSettings?.buttons?.map((btn, idx) => (
              <Button
                key={`'confirm_settings_btn_'${idx}`}
                onClick={handleCloseFormAfterModal}
                className={cn(getButtonVariant(btn?.variant ?? ''))}
              >
                {btn?.text || 'Close'}
              </Button>
            ))}
          </div>
        </Modal>
      )}
    </>
  ) : (
    currentConfirmationSettings && (
      <Modal
        open={modals[MODAL_ID.afterSubmitFormTrigger]}
        onClose={() => setOpenTriggerModal(MODAL_ID.afterSubmitFormTrigger, false)}
        title={currentConfirmationSettings?.title || ''}
        hasCancelButton={false}
        hasCloseIcon
      >
        {currentConfirmationSettings?.description}

        <div className="flex justify-end gap-3 pb-4">
          {currentConfirmationSettings?.buttons?.map((btn, index) => {
            const directLink = buildUrl({
              endpoint: btn?.type ?? '',
              queryParams: {
                access_token: accessToken,
                course_cuid: course?.cuid,
                course_name: course?.name,
              },
            });

            return btn?.type?.includes('http') ? (
              <Link
                target="_blank"
                href={directLink}
                key={index}
                className={cn(getButtonVariant(btn?.variant), 'hover:no-underline')}
              >
                {btn?.text}
              </Link>
            ) : (
              <Button className={cn(getButtonVariant(btn?.variant))} key={index}>
                {btn?.text}
              </Button>
            );
          })}
        </div>
      </Modal>
    )
  );
};

CourseFormTriggerModal.displayName = 'CourseFormTriggerModal';
export { CourseFormTriggerModal };
