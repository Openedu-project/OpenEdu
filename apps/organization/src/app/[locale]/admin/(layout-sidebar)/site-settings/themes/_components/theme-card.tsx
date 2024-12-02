'use client';

import { createAPIUrl } from '@oe/api/utils/fetch';
import { ADMIN_ROUTES } from '@oe/core/utils/routes';
import { THEMES, type ThemeName } from '@oe/themes';
import { Link } from '@oe/ui/common/navigation';
import { Image } from '@oe/ui/components/image';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { Card, CardContent } from '@oe/ui/shadcn/card';
import { ScrollArea, ScrollBar } from '@oe/ui/shadcn/scroll-area';
import { cn } from '@oe/ui/utils/cn';

export const THEME_CATEGORIES = {
  featured: ['academia', 'scholar', 'professional', 'wisdom'] as ThemeName[],
  modern: ['nova', 'spark', 'dynamix', 'quantum'] as ThemeName[],
  specialized: ['techHub', 'creative', 'business', 'scienceLab'] as ThemeName[],
  seasonal: ['spring', 'summer', 'autumn', 'winter'] as ThemeName[],
  color: ['azure', 'forest', 'sunset', 'midnight'] as ThemeName[],
} as const;

interface ThemeCardProps {
  name: ThemeName;
  isSelected: boolean;
  onSelect: (theme: ThemeName) => void;
}

export const ThemeCard = ({ name, isSelected, onSelect }: ThemeCardProps) => {
  const theme = THEMES[name];
  const displayName = name.replace(/([A-Z])/g, ' $1').trim(); // Add spaces before capital letters

  return (
    <Card
      className={cn(
        'group relative cursor-pointer overflow-hidden transition-all',
        'hover:ring-2 hover:ring-primary',
        isSelected && 'ring-2 ring-primary',
        'h-[400px] w-[300px]'
      )}
      onClick={() => onSelect(name)}
    >
      <CardContent className="p-0">
        {/* Preview Image */}
        <div className="relative h-[250px] w-full bg-muted">
          {theme?.homePage ? (
            <Image src={theme?.homePage} alt={`${displayName} theme preview`} fill className="object-cover" />
          ) : (
            <></>
          )}
        </div>

        {/* Theme Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg">{displayName}</h3>
          <p className="mt-2 text-muted-foreground text-sm">{theme?.description}</p>
        </div>

        {/* Overlay for selected state */}
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center hover:bg-primary/10">
            <Badge className="absolute top-4 right-4">Selected</Badge>
            <Button variant="outlinePrimary" className="hover:bg-primary">
              <Link
                href={createAPIUrl({ endpoint: ADMIN_ROUTES.themeDetail, params: { themeName: name } })}
                className="hover:text-white hover:no-underline"
              >
                Edit Theme
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const ThemeCategory = ({
  themes,
  selectedTheme,
  onThemeSelect,
}: {
  themes: ThemeName[];
  selectedTheme: ThemeName | null;
  onThemeSelect: (theme: ThemeName) => void;
}) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {themes.map(themeName => (
          <ThemeCard
            key={themeName}
            name={themeName}
            isSelected={selectedTheme === themeName}
            onSelect={onThemeSelect}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
