import { ZodError, type ZodIssue } from '#utils/zod';

import { HTTPError } from './http-error';

export type FormActionState = {
  status: 'UNSET' | 'SUCCESS' | 'ERROR' | 'VALIDATION_ERROR' | 'FIELD_ERROR';
  key?: string;
  message?: string;
  fieldErrors?: Record<string, ZodIssue[] | undefined>;
  timestamp?: number;
};

export const EMPTY_FORM_STATE: FormActionState = {
  status: 'UNSET' as const,
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
};

export const fromErrorToFormState = (error: unknown) => {
  if (error instanceof ZodError) {
    return {
      status: 'VALIDATION_ERROR' as const,
      message: '',
      fieldErrors: error.flatten(issue => issue).fieldErrors,
      timestamp: Date.now(),
    };
  }
  if (error instanceof HTTPError) {
    return {
      status: 'ERROR' as const,
      message: error.message,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  }
  return {
    status: 'ERROR' as const,
    message: 'unknown.title',
    fieldErrors: {},
    timestamp: Date.now(),
  };
};
