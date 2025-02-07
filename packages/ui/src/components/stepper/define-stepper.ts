'use client';
import { createContext, createElement, useContext, useMemo, useState } from 'react';
import type { ScopedProps, Step, StepById, StepId, Stepper } from './types';

const StepperContext = createContext<Stepper | null>(null);

export const useStepperState = <Steps extends Step[]>(steps: Steps, initialStep?: StepId<Steps>) => {
  const initialCounter = useMemo(
    () =>
      Math.max(
        steps.findIndex(step => step.id === initialStep),
        0
      ),
    [steps, initialStep]
  );

  const [counter, setCounter] = useState(initialCounter);

  return useMemo(() => {
    const current = steps[counter];
    if (!current) {
      throw new Error('Current step not found');
    }

    const isLast = counter === steps.length - 1;
    const isFirst = counter === 0;

    const typedCurrent = current as StepById<Steps, (typeof current)['id']>;

    return {
      all: steps,
      current: { ...typedCurrent, index: counter },
      isLast,
      isFirst,
      get: <Id extends StepId<Steps>>(id: Id) => steps.find(step => step.id === id) as StepById<Steps, Id> | undefined,
      goTo: (id: StepId<Steps>) => {
        const nextIndex = steps.findIndex(step => step.id === id);
        if (nextIndex === -1) {
          throw new Error(`Step with id "${id}" not found`);
        }
        setCounter(nextIndex);
      },
      next: () => !isLast && setCounter(c => c + 1),
      prev: () => !isFirst && setCounter(c => c - 1),
      reset: () => setCounter(initialCounter),
      switch: when => {
        const whenFn = when[typedCurrent.id as keyof typeof when];
        return whenFn?.(typedCurrent as Extract<Steps[number], { id: typeof typedCurrent.id }>);
      },
      when: <Id extends StepId<Steps>, R1, R2>(
        id: Id,
        whenFn: (step: Extract<Steps[number], { id: Id }>) => R1,
        elseFn?: (step: Exclude<Steps[number], { id: Id }>) => R2
      ) => {
        if (current.id === id) {
          return whenFn(current as Extract<Steps[number], { id: Id }>);
        }
        return elseFn?.(current as Exclude<Steps[number], { id: Id }>);
      },
      match: <State extends StepId<Steps>, R>(
        state: State,
        matches: Record<State, (step: Extract<Steps[number], { id: State }>) => R>
      ) => {
        const matchFn = matches[state];
        return matchFn?.(current as Extract<Steps[number], { id: State }>);
      },
    } as Stepper<Steps>;
  }, [counter, initialCounter, steps]);
};

// Cập nhật kiểu cho useStepper
export const useStepper = <Steps extends Step[]>() => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within a StepperProvider');
  }
  return context as unknown as Stepper<Steps>;
};

export const defineStepper = <const Steps extends Step[]>(...steps: Steps) => {
  return {
    steps,
    Scoped: ({ initialStep, children }: ScopedProps<Steps>) => {
      const value = useStepperState(steps, initialStep);
      return createElement(StepperContext.Provider, { value: value as unknown as Stepper }, children);
    },
    useStepper: () => useStepper<Steps>(),
  };
};
