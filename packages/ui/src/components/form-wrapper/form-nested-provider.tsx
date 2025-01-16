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
  onChange,
}: IFormNestedProviderProps<TFormSchema>) {
  const formsRef = useRef<Map<string, IFormMetadata<TFormSchema>>>(new Map());
  const [tabsMetadata, setTabsMetadata] = useState<Map<string, ITabMetadata>>(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string | undefined>(defaultTab);
  const [activeFormId, setActiveFormId] = useState<string | undefined>(undefined);

  const getForms = useCallback((specificFormIds?: string[]) => {
    const ids = specificFormIds ? specificFormIds : Array.from(formsRef.current.values()).map(form => form.id);
    return ids
      .map(id => formsRef.current.get(id))
      .filter((form): form is IFormMetadata<TFormSchema> => form !== undefined);
  }, []);

  const getAllFormValues = useCallback(() => {
    const forms = getForms();
    return forms.reduce<Record<string, z.infer<TFormSchema>>>((acc, form) => {
      acc[form.id] = form.getValues();
      return acc;
    }, {});
  }, [getForms]);

  const registerForm = useCallback(
    (metadata: IFormMetadata<TFormSchema>) => {
      formsRef.current.set(metadata.id, metadata);
      if (onChange) {
        const unsubscribe = metadata.watch((_, { type }) => {
          if (type === 'change') {
            const allValues = getAllFormValues();
            onChange(allValues);
          }
        });
        const currentForm = formsRef.current.get(metadata.id);
        if (currentForm) {
          currentForm.unsubscribe = unsubscribe as unknown as () => void;
        }
      }
    },
    [getAllFormValues, onChange]
  );

  const unregisterForm = useCallback((id: string) => {
    const form = formsRef.current.get(id);
    if (form?.unsubscribe) {
      form.unsubscribe();
    }
    formsRef.current.delete(id);
  }, []);

  const registerTab = useCallback(
    (tabId: string, formMetadata?: IFormMetadata<TFormSchema>) => {
      if (!tabsMetadata.has(tabId)) {
        setActiveTab(tabId);
        setActiveFormId(formMetadata?.id);
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
      setActiveFormId(undefined);
      setActiveTab(undefined);
    },
    [tabsMetadata.delete, tabsMetadata.get]
  );

  const validateSingleForm = useCallback(async (form: IFormMetadata<TFormSchema>, shouldTriggerSubmit = true) => {
    if (shouldTriggerSubmit) {
      const submitButton = form.formRef.current?.querySelector('button[type="submit"]');
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.click();
      }
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
      const formFields = Array.from(form.formRef.current?.querySelectorAll('[data-field]') || []);

      const errorFields = form.getValidationErrors();
      const firstErrorElement = formFields.find(field => {
        const fieldName = field.getAttribute('data-field');
        return errorFields.some(error => error.field === fieldName);
      });

      if (firstErrorElement) {
        return { isValid, errorElement: firstErrorElement as HTMLElement };
      }
    }

    return { isValid, errorElement: null };
  }, []);

  const validateForm = useCallback(async () => {
    if (!activeFormId) {
      return false;
    }
    const form = formsRef.current.get(activeFormId);
    if (!form) {
      return false;
    }

    const { isValid, errorElement } = await validateSingleForm(form);
    if (errorElement) {
      scrollToError(errorElement, scrollOptions);
    }
    return isValid;
  }, [scrollOptions, activeFormId, validateSingleForm]);

  const validateForms = useCallback(
    async (formIds?: string[]) => {
      const forms = getForms(formIds);
      let firstErrorElement: HTMLElement | null = null;

      const results = await Promise.all(
        forms.map(async form => {
          const { isValid, errorElement } = await validateSingleForm(form);
          if (!firstErrorElement && errorElement) {
            firstErrorElement = errorElement;
          }
          return isValid;
        })
      );

      if (firstErrorElement) {
        scrollToError(firstErrorElement, scrollOptions);
      }

      return results.every(Boolean);
    },
    [getForms, scrollOptions, validateSingleForm]
  );

  const submitForm = useCallback(
    async (formIds?: string[]) => {
      if (isSubmitting) {
        return;
      }
      setIsSubmitting(true);
      try {
        // const currentForm = formsRef.current.get(activeFormId);
        // if (!currentForm) {
        //   return;
        // }
        const isValid = await validateForms(formIds);
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
    [isSubmitting, onSubmit, getForms, onError, validateForms]
  );

  return (
    <FormContext.Provider
      value={{
        formsRef,
        isSubmitting,
        tabsMetadata,
        activeTab,
        activeFormId,
        setActiveTab,
        registerForm,
        unregisterForm,
        registerTab,
        unregisterTab,
        submitForm,
        validateForm,
        validateForms,
      }}
    >
      <div className={className}>{children}</div>
    </FormContext.Provider>
  );
}
