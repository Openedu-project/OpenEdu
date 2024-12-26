import { AlertCircle } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import { Circle } from 'lucide-react';
import type { FC } from 'react';
import { Progress } from '#shadcn/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#shadcn/tabs';
import { cn } from '#utils/cn';
import { useFormContext } from './form-nested-provider';
import type {
  IFormTabsContentProps,
  IFormTabsProps,
  IFormTabsTriggerProps,
  ITabProgressProps,
  ITabStatusIconProps,
} from './types';

export const FormTabs: FC<IFormTabsProps> = ({ defaultValue, children, className }) => {
  const { activeTab, setActiveTab } = useFormContext();

  return (
    <Tabs value={activeTab} defaultValue={defaultValue} onValueChange={setActiveTab} className={className}>
      {children}
    </Tabs>
  );
};

export const FormTabsList = TabsList;

export const FormTabsTrigger: FC<IFormTabsTriggerProps> = ({
  tabId,
  children,
  className,
  showIcon = true,
  disabledStatuses = ['disabled'],
  disabled,
  ...props
}) => {
  const { tabsMetadata } = useFormContext();
  const tabMetadata = tabsMetadata.get(tabId);
  const status = tabMetadata?.status;

  return (
    <TabsTrigger
      {...props}
      value={tabId}
      disabled={disabled || (status && disabledStatuses.includes(status))}
      className={cn('flex items-center gap-2', status === 'disabled' && 'cursor-not-allowed opacity-50', className)}
    >
      {showIcon && status && <TabStatusIcon status={status} className="h-4 w-4" />}
      {children}
    </TabsTrigger>
  );
};

export const FormTabsContent: FC<IFormTabsContentProps> = ({ value, children, className, showProgress = true }) => {
  return (
    <TabsContent value={value} className={cn('space-y-4 data-[state=inactive]:hidden', className)} forceMount>
      {showProgress && <TabProgress tabId={value} />}
      {children}
    </TabsContent>
  );
};

export const TabProgress: FC<ITabProgressProps> = ({ tabId, className }) => {
  const { tabsMetadata } = useFormContext();
  const tabMetadata = tabsMetadata.get(tabId);

  if (!tabMetadata) {
    return null;
  }

  const completedFields = tabMetadata.validationSummary.completedFields;
  const totalFields = tabMetadata.validationSummary.totalFields;
  const progress = completedFields > 0 ? (completedFields / totalFields) * 100 : 0;

  return (
    <div className={cn('space-y-2', className)}>
      <Progress value={progress} className="h-2" />
      <p className="text-muted-foreground text-sm">
        {completedFields} of {totalFields} fields completed
      </p>
    </div>
  );
};
export const TabStatusIcon: FC<ITabStatusIconProps> = ({ status, className }) => {
  switch (status) {
    case 'valid':
      return <CheckCircle2 className={cn('text-success', className)} />;
    case 'invalid':
      return <AlertCircle className={cn('text-destructive', className)} />;
    default:
      return <Circle className={cn('text-muted-foreground', className)} />;
  }
};
