import type React from 'react';
import { fileResponseScheme } from '../../api/src/types/file';
import { z } from '../../api/src/utils/zod';

export type Theme = {
  // description: string;
  [page: string]: React.ComponentType;
};

export const themeTypeConfigSchema = z.enum(['page', 'components', 'theme-setting', 'site-setting']);

export const themeSiteSettingSchema = z.object({
  title: z.string().min(1, 'Title is required').max(60, 'Title should be at most 60 characters'),
  description: z.string().min(1, 'Description is required').max(160, 'Description should be at most 160 characters'),
  logo: fileResponseScheme,
  authBanner: fileResponseScheme.optional(),
  favicon: fileResponseScheme.optional(),
  ogTitle: z.string().max(95, 'Open Graph title should be at most 95 characters').optional(),
  ogDescription: z.string().max(200, 'Open Graph description should be at most 200 characters').optional(),
  ogImage: fileResponseScheme.optional(),
  twitterCard: z.enum(['summary', 'summary_large_image', 'app', 'player']).optional(),
  twitterSite: z.string().startsWith('@', 'Twitter username must start with @').optional(),
  canonicalUrl: z.string().optional(),
  robots: z
    .object({
      index: z.boolean(),
      follow: z.boolean(),
    })
    .optional(),
  keywords: z.string().optional(),
  author: z.string().optional(),
  viewport: z.string().optional(),
});

export const themeCssSchema = z.object({});

export type IThemeSiteSetting = z.infer<typeof themeSiteSettingSchema>;
export type TThemeTypeConfig = z.infer<typeof themeTypeConfigSchema>;

export interface MenuItem {
  key: string;
  label: string;
  href: string;
  items: MenuItem[];
}

export interface MenuGroup {
  key: string;
  label: string;
  items: MenuItem[];
}

export interface SimpleMenuItem extends MenuItem {
  type: 'item';
}

export interface GroupMenuItem extends MenuGroup {
  type: 'group';
}

export type TThemeMenuDefinition = Array<SimpleMenuItem | GroupMenuItem>;
