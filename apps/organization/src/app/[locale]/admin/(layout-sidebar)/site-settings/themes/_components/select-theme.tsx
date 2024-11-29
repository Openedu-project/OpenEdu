'use client';

import type { ThemeName } from '@oe/themes';
import { useThemeStore } from '@oe/themes/store/useThemeStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@oe/ui/shadcn/tabs';
import { memo, useMemo } from 'react';
import { THEME_CATEGORIES, ThemeCategory } from './theme-card';

// Define tab values as a constant to ensure type safety and reusability
const TAB_VALUES = {
  FEATURED: 'featured',
  MODERN: 'modern',
  SPECIALIZED: 'specialized',
  SEASONAL: 'seasonal',
  COLOR: 'color-based',
} as const;

type TabValue = (typeof TAB_VALUES)[keyof typeof TAB_VALUES];

// Separate the tab configuration for better maintainability
const TABS_CONFIG: Array<{ value: TabValue; label: string }> = [
  { value: TAB_VALUES.FEATURED, label: 'Featured' },
  { value: TAB_VALUES.MODERN, label: 'Modern' },
  { value: TAB_VALUES.SPECIALIZED, label: 'Specialized' },
  { value: TAB_VALUES.SEASONAL, label: 'Seasonal' },
  { value: TAB_VALUES.COLOR, label: 'Color-based' },
];

// Memoize the ThemeCategory component to prevent unnecessary re-renders
const MemoizedThemeCategory = memo(ThemeCategory);

export default function SelectTheme() {
  const { selectedTheme, setSelectedTheme } = useThemeStore();

  // Memoize the categories mapping to prevent unnecessary recalculations
  const categoryTabs = useMemo(() => {
    return Object.entries(THEME_CATEGORIES).map(([category, themes]) => ({
      category: category as keyof typeof THEME_CATEGORIES,
      themes: themes as ThemeName[],
    }));
  }, []);

  return (
    <Tabs defaultValue={TAB_VALUES.FEATURED} className="space-y-8">
      <TabsList>
        {TABS_CONFIG.map(({ value, label }) => (
          <TabsTrigger key={value} value={value} className="data-[state=active]:text-primary">
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {categoryTabs.map(({ category, themes }) => (
        <TabsContent key={category} value={category}>
          <MemoizedThemeCategory themes={themes} selectedTheme={selectedTheme} onThemeSelect={setSelectedTheme} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
