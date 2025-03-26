import type { CourseTriggerType, TFormTriggerConfirmationSettings } from '@oe/api/schemas/courseTrigger';
import type { IFormTriggerRequest } from '@oe/api/types/course/course-trigger';
import type { IFormResponse } from '@oe/api/types/form';
import { create } from 'zustand';

type FormTriggerStore = {
  type: CourseTriggerType;
  formId?: string;
  formData?: IFormResponse;
  formTrigger?: IFormTriggerRequest;
  disabledNextStep: boolean;
  disabledPrevStep: boolean;
  currentStep: number;
  isCreate: boolean;
  setType: (type: CourseTriggerType) => void;
  setFormId: (id: string) => void;
  setFormData: (formData: IFormResponse) => void;
  setFormTrigger: (formTrigger: IFormTriggerRequest) => void;
  setDisabledNextStep: (disabled: boolean) => void;
  setDisabledPrevStep: (disabled: boolean) => void;
  resetFormTrigger: () => void;
  handleBack: () => void;
  handleNext: () => void;
  setIsCreate: (isCreatee: boolean) => void;
  setCurrentStep: (currentStep: number) => void;
};

export const useFormTriggerStore = create<FormTriggerStore>(set => {
  return {
    type: 'form',
    formId: undefined,
    formData: undefined,
    formTrigger: undefined,
    disabledNextStep: true,
    disabledPrevStep: false,
    currentStep: 1,
    isCreate: true,
    setType: (type: CourseTriggerType) => set({ type }),
    setFormId: (id: string) => set({ formId: id }),
    setFormData: (formData: IFormResponse) => set({ formData }),
    setFormTrigger: (formTrigger: IFormTriggerRequest) => set({ formTrigger }),
    setDisabledNextStep: (disabledNextStep: boolean) => set({ disabledNextStep }),
    setDisabledPrevStep: (disabledPrevStep: boolean) => set({ disabledPrevStep }),
    setIsCreate: (isCreate: boolean) => set({ isCreate }),
    setCurrentStep: (currentStep: number) => set({ currentStep }),

    resetFormTrigger: () =>
      set({
        type: 'form',
        formId: undefined,
        formData: undefined,
        formTrigger: undefined,
        disabledNextStep: true,
        disabledPrevStep: false,
        currentStep: 1,
        isCreate: true,
      }),

    handleBack: () =>
      set(state => {
        if (!state.isCreate && state.currentStep === 2 && state.type === 'form') {
          return { currentStep: 2, disabledPrevStep: true };
        }
        const newStep = Math.max(1, state.currentStep - 1);
        const disabledPrevStep = newStep === 1;

        return { currentStep: newStep, disabledPrevStep };
      }),

    handleNext: () =>
      set(state => {
        const newStep = Math.min(3, state.currentStep + 1);
        const disabledNextStep = newStep !== 3;

        return { currentStep: newStep, disabledNextStep };
      }),
  };
});

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

export const useLearnerFormTriggerStore = create<LearnerFormTriggerStore>(set => {
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

export const useTriggerModalStore = create<TriggerModalState>(set => {
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
