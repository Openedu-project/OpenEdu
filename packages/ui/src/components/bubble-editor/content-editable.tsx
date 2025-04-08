import { createElement, memo, useEffect, useMemo, useRef } from 'react';

import type { FocusEvent, HTMLAttributes, KeyboardEvent, SyntheticEvent } from 'react';

import { autoconfigureTextDirection, normalizeHtml, replaceCaret } from './utils';

/**
 * Based on https://github.com/lovasoa/react-contenteditable
 * A simple component for a html element with editable contents.
 */
export const ContentEditable = memo(function ContentEditable({
  className,
  disabled,
  tagName,
  value = '',
  ...rest
}: ContentEditableProps) {
  const elRef = useRef<HTMLElement>(null);
  const htmlRef = useRef(value);
  const restRef = useRef(rest);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    restRef.current = rest;
    const el = elRef.current;

    if (el && normalizeHtml(htmlRef.current) !== normalizeHtml(value)) {
      htmlRef.current = value;
      el.innerHTML = value;
      replaceCaret(el);
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  return useMemo(() => {
    function onSetRef($el: HTMLElement) {
      elRef.current = $el;
      autoconfigureTextDirection($el);
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    function onChange(event: SyntheticEvent<any>) {
      const el = elRef.current;

      if (!el) {
        return;
      }

      const elementHtml = el.innerHTML;

      if (elementHtml !== htmlRef.current) {
        restRef.current.onChange?.({
          ...event,
          target: {
            value: elementHtml,
            name: rest.name,
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          } as any,
        });
      }

      autoconfigureTextDirection(el);
      htmlRef.current = elementHtml;
    }

    return createElement(tagName || 'div', {
      ...rest,
      className,
      contentEditable: !disabled,
      dangerouslySetInnerHTML: { __html: value },
      onBlur: (e: FocusEvent<HTMLElement>) => (restRef.current.onBlur || onChange)(e),
      onInput: onChange,
      onKeyDown: (e: KeyboardEvent<HTMLElement>) => (restRef.current.onKeyDown || onChange)(e),
      onKeyUp: (e: KeyboardEvent<HTMLElement>) => (restRef.current.onKeyUp || onChange)(e),
      ref: onSetRef,
      'data-slot': 'content-editable',
    });
  }, [className, disabled, tagName, rest.name]);
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ContentEditableEvent = SyntheticEvent<any, Event> & {
  target: { name?: string; value: string };
};

export interface ContentEditableProps extends HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  contentEditableRef?: (el: HTMLElement) => void;
  name?: string;
  onChange?: (event: ContentEditableEvent) => void;
  tagName?: string;
  value?: string;
}
