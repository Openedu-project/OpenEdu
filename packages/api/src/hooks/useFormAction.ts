'use client';

import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// import type { FormActionState } from '@oe/core/types/form';
import type { FieldValues, Path, UseFormProps } from 'react-hook-form';
import type { FormActionState } from '../utils/form';

type UseFormActionProps<TFieldValues extends FieldValues = FieldValues, TContext = unknown> = UseFormProps<
  TFieldValues,
  TContext
> & {
  formState?: FormActionState;
  onSuccess?: () => void | Promise<void>;
};

export function useFormAction<TFieldValues extends FieldValues = FieldValues, TContext = unknown>({
  formState,
  onSuccess,
  ...props
}: UseFormActionProps<TFieldValues, TContext>) {
  const tErrors = useTranslations('errors');
  const tToast = useTranslations('toast');
  const form = useForm({
    ...props,
  });

  useEffect(() => {
    if (!hasState(formState)) {
      return;
    }
    form.clearErrors();

    switch (formState.status) {
      case 'ERROR': {
        toast.error(tErrors(formState.message));
        break;
      }
      case 'VALIDATION_ERROR': {
        const { fieldErrors } = formState;

        if (!fieldErrors) {
          break;
        }

        for (const [key, issues] of Object.entries(fieldErrors)) {
          form.setError(key as Path<TFieldValues>, {
            message: issues?.map(issue => issue.message).join('. '),
          });
        }
        break;
      }
      case 'FIELD_ERROR': {
        form.setError(formState.key as Path<TFieldValues>, { message: formState.message });
        break;
      }
      case 'SUCCESS': {
        toast.success(tToast(formState.message));
        (async () => await onSuccess?.())();
        form.reset();
        break;
      }
      default:
      // Skip
    }
  }, [formState, form, tErrors, tToast, onSuccess]);

  return {
    ...form,
  };
}

const hasState = (formState?: FormActionState | null): formState is FormActionState => {
  if (!formState || typeof formState !== 'object') {
    return false;
  }

  return 'status' in formState;
};
