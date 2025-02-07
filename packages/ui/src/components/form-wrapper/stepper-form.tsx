import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { type Step, type Stepper, defineStepper } from '#components/stepper';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';
import { useStepper } from '../stepper';
import { FormNestedProvider, useFormContext } from './form-nested-provider';
import { SubmitFormsButton } from './submit-forms-button';
import type { INestedFormsValues } from './types';

interface StepperFormProps<Steps extends { id: string; title: string }[]> {
  steps: Steps;
  requireComplete?: boolean;
  initialStep?: Steps[number]['id'];
  onSubmit: (values: INestedFormsValues) => Promise<void>;
  className?: string;
  children?: ReactNode | ((stepper: Stepper<Step[]>) => ReactNode);
}

export function StepperForm<const Steps extends { id: string; title: string }[]>({
  steps,
  requireComplete = true,
  initialStep,
  onSubmit,
  className,
  children,
}: StepperFormProps<Steps>) {
  const { Scoped } = defineStepper(...steps);

  return (
    <FormNestedProvider onSubmit={onSubmit} defaultTab={initialStep ?? steps[0]?.id} className={className}>
      <Scoped initialStep={initialStep}>
        <StepperContent requireComplete={requireComplete}>{children}</StepperContent>
      </Scoped>
    </FormNestedProvider>
  );
}

function StepperContent({
  requireComplete,
  children,
}: { requireComplete: boolean; children: ReactNode | ((stepper: Stepper<Step[]>) => ReactNode) }) {
  const tGeneral = useTranslations('general');
  const stepper = useStepper();
  const { validateForm } = useFormContext();

  const handleNext = async () => {
    if (!requireComplete) {
      stepper.next();
      return;
    }

    const isValid = await validateForm();
    if (isValid) {
      stepper.next();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-2">
        {stepper.all.map((step, index) => (
          <div
            key={step.id}
            className={cn('flex items-center gap-2', index === stepper.current.index && 'text-primary')}
          >
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full',
                index === stepper.current.index ? 'bg-primary text-background' : 'bg-muted'
              )}
            >
              {index + 1}
            </div>
            <span>{step.title}</span>
            {index < stepper.all.length - 1 && <div className="h-px w-8 bg-muted" />}
          </div>
        ))}
      </div>

      {typeof children === 'function' ? children(stepper) : children}

      <div className="flex justify-between">
        <Button variant="outline" onClick={stepper.prev} disabled={stepper.isFirst}>
          {tGeneral('previous')}
        </Button>

        {stepper.isLast ? <SubmitFormsButton /> : <Button onClick={handleNext}>{tGeneral('next')}</Button>}
      </div>
    </div>
  );
}
