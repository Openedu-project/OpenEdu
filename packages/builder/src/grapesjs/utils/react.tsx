import { type FC, type ReactNode, type ReactPortal, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { isString } from './dom';

function WrapElement({ el }: { el: HTMLElement | string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = ref;

    if (current) {
      if (isString(el)) {
        current.innerHTML = el;
      } else {
        current.appendChild(el);
      }
    }
  }, [el]);

  return <div ref={ref} />;
}

export const WrapDom = (el: HTMLElement | string) => {
  return <WrapElement el={el as HTMLElement} />;
};

export interface PortalContainerProps {
  children: ReactNode;
}

export type PortalContainerResult = FC<PortalContainerProps>;

const elContainerMap = new WeakMap<HTMLElement, PortalContainerResult>();

export function portalContainer(el?: HTMLElement) {
  if (!el) {
    return () => null;
  }

  const prevResult = elContainerMap.get(el);

  if (prevResult) {
    return prevResult;
  }

  const result = function Container({ children }: PortalContainerProps): ReactPortal {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return createPortal(children as any, el) as ReactPortal;
  };

  elContainerMap.set(el, result);

  return result;
}
