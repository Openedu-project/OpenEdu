import type { z } from '@oe/api/utils/zod';
import type { TabsTriggerProps } from '@radix-ui/react-tabs';
import type { HTMLAttributes, MouseEvent, ReactNode, RefObject } from 'react';
import type { SubmitHandler, UseFormProps, UseFormReturn, UseFormWatch } from 'react-hook-form';

export type FormErrorHandler = (error: unknown) => void | Promise<void>;

export interface IFormMetadata<TFormSchema extends z.ZodType> {
  id: string;
  tabId?: string;
  dependencies?: string[];
  formRef: RefObject<HTMLFormElement | null>;
  getValues: () => z.TypeOf<TFormSchema>;
  validate: () => Promise<boolean>;
  getFieldCount: () => {
    completed: number;
    total: number;
  };
  getValidationErrors: () => {
    field: string;
    message: string;
  }[];
  watch: UseFormWatch<z.TypeOf<TFormSchema>>;
  unsubscribe?: () => void;
}

export type TabStatus = 'incomplete' | 'valid' | 'invalid' | 'disabled';
export type ValidationSummary = {
  isValid: boolean;
  errors: { field: string; message: string }[];
  completedFields: number;
  totalFields: number;
};

export interface ITabMetadata {
  id: string;
  status: TabStatus;
  order: number;
  validationSummary: ValidationSummary;
  formIds: string[];
  dependencies?: string[];
}

export interface IFormWrapperProps<TFormSchema extends z.ZodType>
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children' | 'onChange'> {
  id: string;
  schema?: TFormSchema;
  tabId?: string;
  dependencies?: string[];
  useFormProps?: Omit<UseFormProps<z.infer<TFormSchema>>, 'resolver'>;
  children: ReactNode | ((props: { loading: boolean; form: UseFormReturn<z.infer<TFormSchema>> }) => ReactNode);
  resetOnSuccess?: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  context?: Record<string, any>;
  onSubmit?: SubmitHandler<z.infer<TFormSchema>>;
  onError?: FormErrorHandler;
}

export interface IFormContextValue<TFormSchema extends z.ZodType> {
  formsRef: RefObject<Map<string, IFormMetadata<TFormSchema>>>;
  isSubmitting: boolean;
  tabsMetadata: Map<string, ITabMetadata>;
  activeTab: string | undefined;
  activeFormId: string | undefined;
  setActiveTab: (tabId: string) => void;
  registerForm: (metadata: IFormMetadata<TFormSchema>) => void;
  unregisterForm: (formId: string) => void;
  registerTab: (tabId: string, metadata: IFormMetadata<TFormSchema>) => void;
  unregisterTab: (tabId: string) => void;
  submitForm: (formIds?: string[]) => Promise<void>;
  validateForm: () => Promise<boolean>;
  validateForms: (formIds?: string[]) => Promise<boolean>;
}

export interface INestedFormsValues {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
}

export interface IFormNestedProviderProps<TFormSchema extends z.ZodType> {
  children: ReactNode;
  defaultTab?: string;
  scrollOptions?: ScrollOptions;
  className?: string;
  onSubmit: (values: INestedFormsValues) => Promise<void>;
  onError?: FormErrorHandler;
  onChange?: (values: Record<string, z.infer<TFormSchema>>) => void;
}

export interface TabInfo {
  id: string;
  formIds: Set<string>;
}

export interface IFormTabsProps {
  defaultValue?: string;
  children: ReactNode;
  className?: string;
  showProgress?: boolean;
  showValidationSummary?: boolean;
  transitionDuration?: number;
}

export interface IFormTabsTriggerProps extends Omit<TabsTriggerProps, 'value'> {
  tabId: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
  disabledStatuses?: TabStatus[];
}

export interface IFormTabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
  showValidationSummary?: boolean;
  showProgress?: boolean;
}

export interface ITabProgressProps {
  tabId: string;
  className?: string;
}

export interface ITabStatusIconProps {
  status: TabStatus;
  className?: string;
}

export interface IFormSubmitButtonProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
