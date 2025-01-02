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
  const [formIds, setFormIds] = useState<string[]>([]);
  const [tabsMetadata, setTabsMetadata] = useState<Map<string, ITabMetadata>>(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string | undefined>(defaultTab);
  const registerForm = useCallback((metadata: IFormMetadata<TFormSchema>) => {
    formsRef.current.set(metadata.id, metadata);
    setFormIds(prev => [...prev, metadata.id]);
  }, []);

  const unregisterForm = useCallback((id: string) => {
    formsRef.current.delete(id);
    setFormIds(prev => prev.filter(formId => formId !== id));
  }, []);

  const registerTab = useCallback(
    (tabId: string, formId: string, formMetadata?: IFormMetadata<TFormSchema>) => {
      if (!tabsMetadata.has(tabId)) {
        setFormIds(prev => [...prev, formId]);

        if (!defaultTab && tabsMetadata.size === 0) {
          setActiveTab(tabId);
        }

        tabsMetadata.set(tabId, {
          formIds,
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
    [tabsMetadata, defaultTab, formIds]
  );

  const unregisterTab = useCallback(
    (tabId: string, formId: string) => {
      const tabMetadata = tabsMetadata.get(tabId);
      if (tabMetadata) {
        setFormIds(prev => prev.filter(id => id !== formId));
        if (tabMetadata.formIds.length === 0) {
          tabsMetadata.delete(tabId);
        }
      }
    },
    [tabsMetadata.delete, tabsMetadata.get]
  );

  const getForms = useCallback(
    (specificFormIds?: string[]) => {
      const ids = specificFormIds ? specificFormIds : formIds;
      return ids
        .map(id => formsRef.current.get(id))
        .filter((form): form is IFormMetadata<TFormSchema> => form !== undefined);
    },
    [formIds]
  );

  const validateForm = useCallback(
    async (form: IFormMetadata<TFormSchema>) => {
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
        }
        return false;
      }
      return true;
    },
    [scrollOptions]
  );

  const validateForms = useCallback(
    async (formIds?: string[], validateAll?: boolean) => {
      const formsToCheck = getForms(formIds);
      const validatedFormIds = new Set<string>();
      const errors = new Map<string, boolean>();

      if (validateAll) {
        const validationPromises = formsToCheck.map(async form => {
          const isValid = await validateForm(form);
          errors.set(form.id, isValid);
          validatedFormIds.add(form.id);
        });

        await Promise.all(validationPromises);
        const isAllValid = Array.from(errors.values()).every(Boolean);

        if (isAllValid) {
          return isAllValid;
        }

        if (activeTab) {
          const sortedTabs = Array.from(tabsMetadata.values())
            .sort((a, b) => a.order - b.order)
            .map(tab => tab.id);

          if (isAllValid) {
            setActiveTab(sortedTabs[sortedTabs.length - 1]);
            return isAllValid;
          }

          const currentIndex = sortedTabs.indexOf(activeTab);
          const currentTabStatus = tabsMetadata.get(activeTab)?.status;

          if (currentTabStatus === 'invalid') {
            return isAllValid;
          }

          if (currentTabStatus === 'valid') {
            const previousTabs = sortedTabs.slice(0, currentIndex);
            const hasInvalidPreviousTab = previousTabs.some(tabId => {
              const tab = tabsMetadata.get(tabId);
              return tab?.status === 'invalid';
            });

            if (hasInvalidPreviousTab) {
              const firstInvalidTab = previousTabs.find(tabId => {
                const tab = tabsMetadata.get(tabId);
                return tab?.status === 'invalid';
              });
              if (firstInvalidTab) {
                setActiveTab(firstInvalidTab);
              }
            } else if (currentIndex < sortedTabs.length - 1) {
              setActiveTab(sortedTabs[currentIndex + 1]);
            }
          }
        }

        return isAllValid;
      }
      for (const form of formsToCheck) {
        if (validatedFormIds.has(form.id)) {
          continue;
        }

        if (form.dependencies) {
          for (const depId of form.dependencies) {
            if (validatedFormIds.has(depId)) {
              continue;
            }

            const depForm = formsRef.current.get(depId);
            if (!depForm) {
              continue;
            }

            const isValid = await validateForm(depForm);
            validatedFormIds.add(depId);

            if (!isValid) {
              setActiveTab(depForm.tabId);
              return false;
            }
          }
        }

        const isValid = await validateForm(form);
        validatedFormIds.add(form.id);

        if (!isValid) {
          if (form.tabId) {
            setActiveTab(form.tabId);
          }
          return false;
        }
      }

      return true;
    },
    [validateForm, getForms, activeTab, tabsMetadata]
  );

  const submitForm = useCallback(
    async (formIds?: string[]) => {
      if (isSubmitting) {
        return;
      }
      setIsSubmitting(true);
      try {
        const isValid = await validateForms(formIds, true);
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
    [isSubmitting, onSubmit, validateForms, getForms, onError]
  );

  return (
    <FormContext.Provider
      value={{
        formIds,
        isSubmitting,
        tabsMetadata,
        activeTab,
        setActiveTab,
        registerForm,
        unregisterForm,
        registerTab,
        unregisterTab,
        submitForm,
        validateForms,
      }}
    >
      <div className={className}>{children}</div>
    </FormContext.Provider>
  );
}
