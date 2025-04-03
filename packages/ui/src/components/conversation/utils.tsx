import { fileResponseSchema } from '@oe/api/types/file';
import { z } from '@oe/api/utils/zod';
import React from 'react';
import { DESKTOP_BREAKPOINT } from './constants';

const nonWhitespaceRegex = /\S/;

export const chatSchema = z.object({
  message: z
    .string()
    .min(1, 'formValidation.required')
    .refine(value => nonWhitespaceRegex.test(value), {
      message: 'formValidation.required',
    }),
  files: z
    .array(
      fileResponseSchema.optional().refine(data => data !== undefined, {
        message: 'formValidation.required',
      })
    )
    .optional()
    .nullable(),
});

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const onChange = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isDesktop;
}

export const formatDate = (timestamp: number) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const yesterday = today - 86_400_000; // 24 hours in milliseconds

  if (timestamp === today) {
    return 'Today';
  }
  if (timestamp === yesterday) {
    return 'Yesterday';
  }

  // Format as dd/mm/yyyy for all other dates
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
