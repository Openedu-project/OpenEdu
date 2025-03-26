import type { TFormTriggerConfirmationSettings } from '@oe/api/schemas/courseTrigger';
import type { FormTriggerCondition, IFormTrigger } from '@oe/api/types/course/course-trigger';
import { useCallback } from 'react';
import { useLearnerFormTriggerStore, useTriggerModalStore } from './_store';

export const MODAL_ID = {
  afterSubmitFormTrigger: 'after_submit_form_trigger',
  learnerCourseFormTrigger: 'learner_form_trigger',
};

export const findFormRelationByEntityId = (formRelations: IFormTrigger[], entityId: string) =>
  formRelations.find(relation => relation.start_when.entity_id === entityId && relation.enabled && !relation.submitted);

const useNotiTrigger = () => {
  const { setOpenTriggerModal } = useTriggerModalStore();

  const { resetLearnerFormTrigger } = useLearnerFormTriggerStore();

  const handleShowFormAfterSubmission = useCallback(
    (currentConfirmationSettings?: TFormTriggerConfirmationSettings) => {
      const settings = currentConfirmationSettings?.enabled;
      const seconds =
        currentConfirmationSettings?.auto_close_after_seconds &&
        currentConfirmationSettings.auto_close_after_seconds * 1000;

      if (!settings) {
        resetLearnerFormTrigger();
        return;
      }
      // Open modal MODAL_ID.afterSubmitFormTrigger
      setOpenTriggerModal(MODAL_ID.afterSubmitFormTrigger, true);
      console.log(settings, 'setting');

      // After 5000ms the after submission form will be closed
      if (currentConfirmationSettings?.auto_close_enabled) {
        setTimeout(() => {
          setOpenTriggerModal(MODAL_ID.afterSubmitFormTrigger, false);
          resetLearnerFormTrigger();
        }, seconds);
      }
    },
    [resetLearnerFormTrigger, setOpenTriggerModal]
  );

  return { handleShowFormAfterSubmission };
};

export const useActivedTrigger = () => {
  const { setOpenTriggerModal } = useTriggerModalStore();
  const { setActivedTriggerId, setCurrentFormId, setCurrentConfirmationSettings, setTriggerType } =
    useLearnerFormTriggerStore();
  const { handleShowFormAfterSubmission } = useNotiTrigger();

  const checkActivedTrigger = ({
    relations,
    entityId,
    type,
  }: {
    relations?: IFormTrigger[];
    entityId?: string;
    type?: FormTriggerCondition;
  }) => {
    if (relations && entityId && type) {
      const currentTrigger = findFormRelationByEntityId(relations, entityId);

      return !!(currentTrigger && currentTrigger.submitted === false && currentTrigger?.start_when?.type === type);
    }
  };

  const activedTrigger = ({
    relations,
    entityId,
  }: {
    relations?: IFormTrigger[];
    entityId?: string;
  }) => {
    if (relations && entityId) {
      const currentTrigger = findFormRelationByEntityId(relations, entityId);

      console.log(currentTrigger, 'currentTrigger');

      if (currentTrigger) {
        setActivedTriggerId(currentTrigger.id);
        setTriggerType(currentTrigger.type);
        if (currentTrigger.confirmation_settings?.enabled) {
          setCurrentConfirmationSettings(currentTrigger.confirmation_settings);
        }

        if (currentTrigger.type === 'form') {
          setCurrentFormId(currentTrigger.form_id);
          setOpenTriggerModal(MODAL_ID.learnerCourseFormTrigger, true);
        } else {
          handleShowFormAfterSubmission(currentTrigger?.confirmation_settings);
        }
      }
    }
  };

  return { activedTrigger, checkActivedTrigger };
};
