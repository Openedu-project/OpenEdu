'use client';
import type { ThemeConfigKey, ThemeName } from '@oe/themes/types/index';
import { Link, usePathname } from '@oe/ui/common/navigation';
import { ToggleGroup, ToggleGroupItem } from '@oe/ui/shadcn/toggle-group';
import { PanelTop } from 'lucide-react';
import { ComponentIcon, PaletteIcon, Settings, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import type React from 'react';
import { parseThemePath } from '../../_utils/function';

interface MenuToggleGroupProps {
  selectedThemeConfigKey?: ThemeConfigKey;
}

interface ToggleOption {
  value: ThemeConfigKey;
  label: string;
  icon: LucideIcon;
  ariaLabel: string;
  href: string;
}
//TODO: optimize path
const createToggleOptions = (t: (key: string) => string, themeName?: ThemeName): readonly ToggleOption[] =>
  [
    {
      value: 'pages',
      label: t('page'),
      icon: PanelTop,
      href: `/admin/themes/${themeName}/pages`,
      ariaLabel: t('selectPageSettings'),
    },
    {
      value: 'globals',
      label: t('theme'),
      icon: PaletteIcon,
      href: `/admin/themes/${themeName}/globals/colors`,
      ariaLabel: t('selectThemeSettings'),
    },
    {
      value: 'components',
      label: t('component'),
      icon: ComponentIcon,
      href: `/admin/themes/${themeName}/components`,
      ariaLabel: t('selectComponents'),
    },
    {
      value: 'metadata',
      label: t('metadata'),
      icon: Settings,
      href: `/admin/themes/${themeName}/metadata/metadata`,
      ariaLabel: t('selectSiteSettings'),
    },
    {
      value: 'features',
      label: t('features'),
      icon: Sparkles,
      href: `/admin/themes/${themeName}/features/popular`,
      ariaLabel: t('selectFeatures'),
    },
  ] as const;

const MenuToggleGroup: React.FC<MenuToggleGroupProps> = ({ selectedThemeConfigKey }) => {
  const t = useTranslations('themeHeader');
  const pathName = usePathname();
  const currentParams = parseThemePath(pathName || '');
  const { themeName } = useParams();
  const toggleOptions = createToggleOptions(t, themeName as ThemeName);

  if (!pathName) {
    return;
  }

  return (
    <ToggleGroup
      type="single"
      value={selectedThemeConfigKey || currentParams?.themeConfig}
      className="flex-1 justify-start"
      // onValueChange={onMenuChange}
    >
      {toggleOptions.map(({ value, label, icon: Icon, ariaLabel, href }) => (
        <Link href={href} className="flex gap-1 border-none p-0 text-accent hover:no-underline" key={value}>
          <ToggleGroupItem
            key={value}
            value={value}
            aria-label={ariaLabel}
            className="flex h-[32px] gap-1 data-[state=on]:text-primary"
          >
            <Icon size={16} />
            <span className="hidden md:inline ">{label}</span>
          </ToggleGroupItem>
        </Link>
      ))}
    </ToggleGroup>
  );
};

MenuToggleGroup.displayName = 'MenuToggleGroup';
export { MenuToggleGroup, type MenuToggleGroupProps };
