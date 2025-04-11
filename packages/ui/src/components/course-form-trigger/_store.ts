import type { IFormResponse } from '@oe/api';
import type { CourseTriggerType, TFormTriggerConfirmationSettings } from '@oe/api';
import { createStore } from '@oe/core';

type LearnerFormTriggerStore = {
  activedTriggerId?: string;
  currentFormId?: string;
  formData?: IFormResponse;
  currentConfirmationSettings?: TFormTriggerConfirmationSettings;
  triggerType: CourseTriggerType;
  setActivedTriggerId: (id: string) => void;
  setCurrentFormId: (currentFormId: string) => void;
  setFormData: (formData: IFormResponse) => void;
  setCurrentConfirmationSettings: (currentConfirmationSettings: TFormTriggerConfirmationSettings) => void;
  setTriggerType: (type: CourseTriggerType) => void;
  resetLearnerFormTrigger: () => void;
};

export const useLearnerFormTriggerStore = createStore<LearnerFormTriggerStore>(set => {
  return {
    activedTriggerId: undefined,
    formData: undefined,
    currentFormId: undefined,
    currentConfirmationSettings: undefined,
    triggerType: 'form',
    setActivedTriggerId: (id: string) => set({ activedTriggerId: id }),
    setFormData: (formData: IFormResponse) => set({ formData }),
    setCurrentFormId: (currentFormId: string) => set({ currentFormId }),
    setCurrentConfirmationSettings: (currentConfirmationSettings: TFormTriggerConfirmationSettings) =>
      set({ currentConfirmationSettings }),
    setTriggerType: (type: CourseTriggerType) => set({ triggerType: type }),
    resetLearnerFormTrigger: () =>
      set({
        triggerType: 'form',
        activedTriggerId: undefined,
        formData: undefined,
        currentConfirmationSettings: undefined,
      }),
  };
});

interface TriggerModalState {
  modals: Record<string, boolean>;
  setOpenTriggerModal: (id: string, isOpen: boolean) => void;
}

export const useTriggerModalStore = createStore<TriggerModalState>(set => {
  return {
    modals: {},
    setOpenTriggerModal: (id: string, isOpen: boolean) =>
      set(state => {
        return {
          modals: {
            ...state.modals,
            [id]: isOpen,
          },
        };
      }),
  };
});
