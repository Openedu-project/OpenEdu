import type { PropsWithChildren } from 'react';

// Type cơ bản cho một step
export type Step = {
  id: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
};

// Helper types để làm việc với Steps
export type StepId<Steps extends Step[]> = Steps[number]['id'];

export type StepById<Steps extends Step[], Id extends StepId<Steps>> = Extract<Steps[number], { id: Id }>;

export type StepSansId<Steps extends Step[], Id extends StepId<Steps>> = Exclude<Steps[number], { id: Id }>;

export type StepSwitch<Steps extends Step[], R> = {
  [Id in StepId<Steps>]?: (step: StepById<Steps, Id>) => R;
};

// Type chính cho Stepper
export type Stepper<Steps extends Step[] = Step[]> = {
  // State hiện tại
  all: Steps;
  current: Steps[number] & { index: number };
  isLast: boolean;
  isFirst: boolean;

  // Navigation methods
  next: () => void;
  prev: () => void;
  reset: () => void;
  goTo: (id: StepId<Steps>) => void;

  // Utility methods
  get: <Id extends StepId<Steps>>(id: Id) => StepById<Steps, Id>;

  when: <Id extends StepId<Steps>, R1, R2>(
    id: Id,
    whenFn: (step: StepById<Steps, Id>) => R1,
    elseFn?: (step: StepSansId<Steps, Id>) => R2
  ) => R1 | R2;

  switch: <R>(when: StepSwitch<Steps, R>) => R;

  match: <State extends StepId<Steps>, R>(state: State, matches: StepSwitch<Steps, R>) => R | null;
};

// Props cho Scoped component
export type ScopedProps<Steps extends Step[]> = PropsWithChildren<{
  initialStep?: StepId<Steps>;
}>;
