'use client';

import { useGetMe } from '@oe/api/hooks/useMe';
import { useGetNewUserSignIn } from '@oe/api/hooks/useNewUserSignIn';
import { postSubmitForm } from '@oe/api/services/forms';
import type { IAnswerParams, IFormResponse } from '@oe/api/types/form';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useTriggerModalStore } from '#components/course-form-trigger';
import { MODAL_ID } from '../course-form-trigger/_utils';
import { FormRendererSlideModal } from '../dynamic-form/editor/form-renderer-slide-modal';

export const NewUserSignInTriggerModal = () => {
  const t = useTranslations('general');
  const { setOpenTriggerModal, modals } = useTriggerModalStore();
  const { dataMe, mutateMe } = useGetMe();
  const { dataNewUserSignIn } = useGetNewUserSignIn(Boolean(dataMe && !dataMe?.new_user_survey_completed));
  useEffect(() => {
    if (dataMe && !dataMe?.new_user_survey_completed) {
      setOpenTriggerModal(MODAL_ID.newUserSignInFormTrigger, true);
    }
  }, [dataMe, setOpenTriggerModal]);

  const handleSubmit = useCallback(
    async (values: IAnswerParams[]) => {
      try {
        const res = await postSubmitForm(undefined, {
          formId: dataNewUserSignIn?.id ?? '',
          payload: {
            answers: values,
          },
        });

        if (!res) {
          toast.error(t('failedSubmitAnswer'));
          return;
        }

        toast.success(t('successSubmitAnswer'));

        mutateMe?.();
      } catch (error) {
        console.error(error);
        toast.error(t('failedSubmitAnswer'));
      }
    },
    [dataNewUserSignIn, mutateMe, t]
  );

  return (
    dataNewUserSignIn && (
      <FormRendererSlideModal
        open={modals[MODAL_ID.newUserSignInFormTrigger]}
        onClose={() => setOpenTriggerModal(MODAL_ID.newUserSignInFormTrigger, false)}
        formData={dataNewUserSignIn as unknown as IFormResponse}
        onSubmit={handleSubmit}
        hasCancelButton={false}
      />
    )
  );
};
