'use client';

import { useGetMe } from '@oe/api/hooks/useMe';
import { useGetNewUserSignIn } from '@oe/api/hooks/useNewUserSignIn';
import type { IAnswerParams } from '@oe/api/types/form';
import { useCallback, useEffect } from 'react';
import { useLearnerFormTriggerStore, useTriggerModalStore } from '#components/course-form-trigger';
import { MODAL_ID } from '../course-form-trigger/_utils';
import { FormRendererSlideModal } from '../dynamic-form/editor/form-renderer-slide-modal';

export const NewUserSignInTriggerModal = () => {
  const { setOpenTriggerModal, modals } = useTriggerModalStore();
  const { formData, triggerType } = useLearnerFormTriggerStore();
  const { dataMe } = useGetMe();
  const { dataNewUserSignIn } = useGetNewUserSignIn(Boolean(dataMe && !dataMe?.new_user_survey_completed));
  useEffect(() => {
    if (dataMe && !dataMe?.new_user_survey_completed) {
      setOpenTriggerModal(MODAL_ID.newUserSignInFormTrigger, true);
      console.log('12312313');
    }
  }, [dataMe, setOpenTriggerModal]);

  const handleSubmit = useCallback((values: IAnswerParams[]) => {
    console.log('values', values);
  }, []);

  return (
    triggerType === 'form' &&
    dataNewUserSignIn && (
      <FormRendererSlideModal
        open={modals[MODAL_ID.newUserSignInFormTrigger]}
        onClose={() => setOpenTriggerModal(MODAL_ID.newUserSignInFormTrigger, false)}
        formData={dataNewUserSignIn}
        onSubmit={handleSubmit}
        hasCancelButton={false}
      />
    )
  );
};
