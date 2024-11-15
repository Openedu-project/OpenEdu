'use client';
import type { IZoneRoutes } from '@oe/core/utils/routes';
import type { LanguageCode } from '@oe/i18n/languages';
import type { VariantProps } from 'class-variance-authority';
// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import type { AnchorHTMLAttributes, ComponentProps, FC, ReactNode } from 'react';
import { buttonVariants } from '#shadcn/button';
import { cn } from '#utils/cn';
import { useHref } from './useHref';

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export interface LinkProps
  extends Omit<NextLinkProps, 'href'>,
    Omit<AnchorProps, 'href'>,
    VariantProps<typeof buttonVariants> {
  href: string;
  nextZone?: IZoneRoutes;
  children: ReactNode;
  ref?: ComponentProps<typeof NextLink>['ref'];
  activeClassName?: string;
  locale?: LanguageCode;
  exact?: boolean;
}

export const Link: FC<LinkProps> = ({
  href,
  children,
  nextZone,
  variant = 'link',
  size = 'default',
  className,
  ref,
  activeClassName = 'border border-primary text-primary',
  locale,
  exact,
  ...props
}) => {
  const { getFinalHref, isExternal, isActive } = useHref();

  const finalHref = getFinalHref(href, { locale, nextZone });
  const isExternalLink = isExternal(href, nextZone);
  const linkProps = {
    href: finalHref,
    ref,
    className: cn(buttonVariants({ variant, size, className }), isActive(href, nextZone, exact) && activeClassName),
    ...props,
  };

  if (isExternalLink) {
    return (
      <a {...linkProps} rel={isExternalLink ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    );
  }

  return <NextLink {...linkProps}>{children}</NextLink>;
};
