import { useCallback, useContext, useRef, useState } from 'react';

import type { z } from '@oe/api/utils/zod';
import { createContext } from 'react';
import type { IFormContextValue, IFormMetadata, IFormNestedProviderProps, ITabMetadata } from './types';
import { scrollToError } from './utils';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const FormContext = createContext<IFormContextValue<any> | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export function FormNestedProvider<TFormSchema extends z.ZodType>({
  children,
  defaultTab,
  scrollOptions,
  className,
  onSubmit,
  onError,
}: IFormNestedProviderProps) {
  const formsRef = useRef<Map<string, IFormMetadata<TFormSchema>>>(new Map());
  const [tabsMetadata, setTabsMetadata] = useState<Map<string, ITabMetadata>>(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string | undefined>(defaultTab);
  const [activeFormId, setActiveFormId] = useState<string | undefined>(undefined);
  const registerForm = useCallback((metadata: IFormMetadata<TFormSchema>) => {
    formsRef.current.set(metadata.id, metadata);
    setActiveFormId(metadata.id);
  }, []);

  const unregisterForm = useCallback((id: string) => {
    formsRef.current.delete(id);
    setActiveFormId(undefined);
  }, []);

  const registerTab = useCallback(
    (tabId: string, formMetadata?: IFormMetadata<TFormSchema>) => {
      if (!tabsMetadata.has(tabId)) {
        setActiveTab(tabId);
        tabsMetadata.set(tabId, {
          formIds: Array.from(formsRef.current.values()).map(form => form.id),
          id: tabId,
          order: tabsMetadata.size,
          status: (formMetadata?.dependencies?.length ?? 0) > 0 ? 'disabled' : 'incomplete',
          validationSummary: {
            isValid: false,
            errors: [],
            completedFields: 0,
            totalFields: formMetadata?.getFieldCount().total || 0,
          },
        });
        setTabsMetadata(new Map(tabsMetadata));
      }
    },
    [tabsMetadata]
  );

  const unregisterTab = useCallback(
    (tabId: string) => {
      const tabMetadata = tabsMetadata.get(tabId);
      if (tabMetadata) {
        if (tabMetadata.formIds.length === 0) {
          tabsMetadata.delete(tabId);
        }
      }
    },
    [tabsMetadata.delete, tabsMetadata.get]
  );

  const getForms = useCallback((specificFormIds?: string[]) => {
    const ids = specificFormIds ? specificFormIds : Array.from(formsRef.current.values()).map(form => form.id);
    return ids
      .map(id => formsRef.current.get(id))
      .filter((form): form is IFormMetadata<TFormSchema> => form !== undefined);
  }, []);

  const validateForm = useCallback(async () => {
    if (!activeFormId) {
      return false;
    }
    const form = formsRef.current.get(activeFormId);
    if (!form) {
      return false;
    }
    const submitButton = form.formRef.current?.querySelector('button[type="submit"]');
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.click();
    }
    const isValid = await form.validate();
    setTabsMetadata(prev => {
      const newTabsMetadata = new Map(prev);
      const tab = form.tabId ? newTabsMetadata.get(form.tabId) : undefined;
      if (tab) {
        tab.status = isValid ? 'valid' : 'invalid';
      }
      return newTabsMetadata;
    });
    if (!isValid) {
      const firstError = form.formRef.current?.querySelector('[aria-invalid="true"]');
      if (firstError) {
        scrollToError(firstError as HTMLElement, scrollOptions);
        // if (firstError instanceof HTMLElement) {
        //   firstError.focus();
        // }
      }
      return false;
    }
    return true;
  }, [scrollOptions, activeFormId]);

  const submitForm = useCallback(
    async (formIds?: string[]) => {
      if (isSubmitting || !activeFormId) {
        return;
      }
      setIsSubmitting(true);
      try {
        const currentForm = formsRef.current.get(activeFormId);
        if (!currentForm) {
          return;
        }
        const isValid = await validateForm();
        if (!isValid) {
          return;
        }
        const formsToSubmit = getForms(formIds);
        const values = formsToSubmit.reduce<Record<string, z.infer<TFormSchema>>>((acc, form) => {
          acc[form.id] = form.getValues();
          return acc;
        }, {});

        await onSubmit(values);
      } catch (error) {
        onError?.(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, onSubmit, getForms, onError, validateForm, activeFormId]
  );

  return (
    <FormContext.Provider
      value={{
        formsRef,
        isSubmitting,
        tabsMetadata,
        activeTab,
        setActiveTab,
        registerForm,
        unregisterForm,
        registerTab,
        unregisterTab,
        submitForm,
        validateForm,
      }}
    >
      <div className={className}>{children}</div>
    </FormContext.Provider>
  );
}
