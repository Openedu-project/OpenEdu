'use client';

import type { z } from '@oe/api/utils/zod';
import { type ReactNode, createContext, useCallback, useContext, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export type FormSchema = z.ZodObject<Record<string, z.ZodTypeAny>>;

interface FormContextType {
  forms: Record<string, UseFormReturn<FormSchema>>;
  registerForm: (name: string, form: UseFormReturn<FormSchema>) => void;
  submitForms: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [forms, setForms] = useState<Record<string, UseFormReturn<FormSchema>>>({});

  const registerForm = useCallback((name: string, form: UseFormReturn<FormSchema>) => {
    setForms(prevForms => ({ ...prevForms, [name]: form }));
  }, []);

  const submitForms = async () => {
    const results = await Promise.all(
      Object.entries(forms).map(async ([name, form]) => {
        const isValid = await form.trigger();
        const data = form.getValues();
        return { name, isValid, data };
      })
    );

    const allValid = results.every(r => r.isValid);
    const formData = results.reduce(
      (acc, { name, data }) => {
        acc[name] = data;
        return acc;
      },
      {} as Record<string, FormSchema>
    );

    return {
      isValid: allValid,
      formData,
    };
  };

  return <FormContext.Provider value={{ forms, registerForm, submitForms }}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
