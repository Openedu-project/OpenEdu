import { Link, type LinkProps } from '#common/navigation';

import type { ReactNode } from 'react';

type Action = {
  label: string;
  href: string;
  props?: Omit<LinkProps, 'href' | 'children'>;
};

type Props = {
  children?: ReactNode;
  status?: string | number | ReactNode;
  title?: string | ReactNode;
  description?: string | ReactNode;
  action?: Action | ReactNode;
};
export function ErrorException({ status, title, description, action, children }: Props) {
  return (
    <div className="flex min-h-[calc(100dvh-var(--header-height))] w-full flex-col gap-10 p-8 md:flex-row">
      <div className="order-2 flex-1 md:order-1 md:w-1/2">{children}</div>
      <div className="order-1 flex flex-1 items-center justify-center md:order-2 md:w-1/2">
        <div className="max-w-[380px] text-center">
          {status ? <h1 className="mb-6 font-bold font-primary text-2xl text-primary">{status}</h1> : <></>}
          {title ? <h2 className="mb-2 font-bold font-primary text-xl">{title}</h2> : <></>}
          {description ? <p className="mb-8">{description}</p> : <></>}
          {action ? (
            (action as Action).href ? (
              <Link href={(action as Action).href} variant="default" {...(action as Action)?.props}>
                {(action as Action).label}
              </Link>
            ) : (
              (action as ReactNode)
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
