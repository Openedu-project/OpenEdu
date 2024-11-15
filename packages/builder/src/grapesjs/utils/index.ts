import { useEffect, useRef } from 'react';

type ClassNameInput = string | number | boolean | null | undefined;
type ClassNameInputs = ClassNameInput | ClassNameInput[];

export function cx(...inputs: ClassNameInputs[]): string {
  const inp = Array.isArray(inputs[0]) ? inputs[0] : [...inputs];

  return inp.filter(Boolean).join(' ');
}

export function isFunction(value: unknown) {
  return typeof value === 'function';
}

export function noop() {
  // No operation performed.
}

export function useTraceUpdate(props: Record<string, unknown>) {
  const prev = useRef(props);

  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        (ps as Record<string, unknown>)[k] = [prev.current[k], v];
      }
      return ps;
    }, {});

    if (Object.keys(changedProps).length > 0) {
      console.info('Changed props:', changedProps);
    }
    prev.current = props;
  });
}
