import { type IZoneRoutes, type IZoneRoutesValues, ZONE_ROUTES } from '@oe/core';
import type { LanguageCode } from '@oe/i18n';
import { useLocale } from 'next-intl';
import { useCallback } from 'react';
import { usePathname } from './usePathname';

export function useHref() {
  const currentLocale = useLocale();
  const pathname = usePathname();

  const getFinalLocale = useCallback((locale?: LanguageCode) => locale ?? currentLocale, [currentLocale]);

  const getCurrentZone = useCallback(() => {
    return Object.values(ZONE_ROUTES).find(zone => {
      return zone === '/' ? pathname === '/' : pathname.startsWith(zone);
    }) as IZoneRoutesValues;
  }, [pathname]);

  const getHrefInternal = useCallback(
    (href: string, options?: { nextZone?: IZoneRoutes; locale?: LanguageCode }) => {
      if (href.startsWith('/')) {
        const currentZone = getCurrentZone();
        const finalLocale = getFinalLocale(options?.locale);
        const zone = ZONE_ROUTES[options?.nextZone as IZoneRoutes] ?? currentZone ?? '';

        if (href.startsWith(zone)) {
          return `/${finalLocale}${href === '/' ? '' : href}`;
        }

        return `/${finalLocale}${zone}${href === '/' ? '' : href}`;
      }
      return href;
    },
    [getCurrentZone, getFinalLocale]
  );

  const isActive = useCallback(
    (href: string, nextZone?: IZoneRoutes, exact?: boolean) => {
      const currentZone = getCurrentZone();
      const zone = ZONE_ROUTES[nextZone as IZoneRoutes] ?? currentZone ?? '';

      if (href === '/' || href === zone) {
        return pathname === zone;
      }
      return exact ? pathname === href : pathname.startsWith(href);
    },
    [getCurrentZone, pathname]
  );

  const isExternalLink = useCallback((href: string) => href.startsWith('http') || href.startsWith('//'), []);
  const getFinalHref = useCallback(
    (href: string, options?: { nextZone?: IZoneRoutes; locale?: LanguageCode }) => {
      return isExternalLink(href) ? href : getHrefInternal(href, options);
    },
    [getHrefInternal, isExternalLink]
  );

  const isExternal = useCallback(
    (href: string, nextZone?: IZoneRoutes) =>
      isExternalLink(href) || (nextZone && ZONE_ROUTES[nextZone as IZoneRoutes] !== getCurrentZone()),
    [getCurrentZone, isExternalLink]
  );

  return { getFinalHref, isActive, isExternal };
}
