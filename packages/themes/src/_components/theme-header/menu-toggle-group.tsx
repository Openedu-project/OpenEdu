import type { ThemeConfigKey } from '@oe/themes/types/index';
import { Link } from '@oe/ui/common/navigation';
import { ToggleGroup, ToggleGroupItem } from '@oe/ui/shadcn/toggle-group';
import { PanelTop } from 'lucide-react';
import { ComponentIcon, PaletteIcon, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';

interface MenuToggleGroupProps {
  selectedThemeConfigKey?: ThemeConfigKey;
  onMenuChange: (value: ThemeConfigKey) => void;
}

interface ToggleOption {
  value: ThemeConfigKey;
  label: string;
  icon: LucideIcon;
  ariaLabel: string;
  href: string;
}
//TODO: optimize path
const createToggleOptions = (t: (key: string) => string): readonly ToggleOption[] =>
  [
    {
      value: 'pages',
      label: t('page'),
      icon: PanelTop,
      href: '/admin/themes/academia/pages',
      ariaLabel: t('selectPageSettings'),
    },
    {
      value: 'globals',
      label: t('theme'),
      icon: PaletteIcon,
      href: '/admin/themes/academia/globals/colors',
      ariaLabel: t('selectThemeSettings'),
    },
    {
      value: 'components',
      label: t('component'),
      icon: ComponentIcon,
      href: '/admin/themes/academia/components',
      ariaLabel: t('selectComponents'),
    },
    {
      value: 'metadata',
      label: t('metadata'),
      icon: Settings,
      href: '/admin/themes/academia/metadata/metadata',
      ariaLabel: t('selectSiteSettings'),
    },
  ] as const;

const MenuToggleGroup: React.FC<MenuToggleGroupProps> = ({ selectedThemeConfigKey, onMenuChange }) => {
  const t = useTranslations('themeHeader');
  const toggleOptions = createToggleOptions(t);

  return (
    <ToggleGroup
      type="single"
      value={selectedThemeConfigKey}
      className="flex-1 justify-start"
      onValueChange={onMenuChange}
    >
      {toggleOptions.map(({ value, label, icon: Icon, ariaLabel, href }) => (
        <Link href={href} className="flex gap-1 border-none p-0 text-accent-foreground hover:no-underline" key={value}>
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
