import { createAPIUrl } from '@oe/api/utils/fetch';
import { ADMIN_ROUTES } from '@oe/core/utils/routes';
import type { ThemeName } from '@oe/themes/types/theme-page/index';
import { Link } from '@oe/ui/common/navigation';
import { Image } from '@oe/ui/components/image';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@oe/ui/shadcn/card';
import { Checkbox } from '@oe/ui/shadcn/checkbox';
import { cn } from '@oe/ui/utils/cn';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { themeInfoThumbnail } from '../../_config/theme-info';
import type { ThemeInfo } from '../../_types/theme-info';
import DeleteThemeModal from './delete-theme-modal';

interface ThemeCardProps {
  name: ThemeName;
  theme: ThemeInfo;
  // Whether this theme is currently active
  isActived?: boolean;
  // For template cards: whether this theme has already been cloned
  isCloned?: boolean;
  // Callback when theme select the checkbox
  onCloneToggle?: (theme: ThemeName, isChecked: boolean) => void;
  // Whether this card is for a template or user's theme
  variant: 'template' | 'my-theme';
  onRemove?: (theme: ThemeName) => void;
}

export const ThemeCard = ({
  theme,
  name,
  isCloned,
  isActived = false,
  onCloneToggle,
  variant = 'my-theme',
  onRemove,
}: ThemeCardProps) => {
  const t = useTranslations('themeList');
  const [currentCloned, setCurrentCloned] = useState(isCloned ?? false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const displayName = (theme?.name || name).replace(/([A-Z])/g, ' $1').trim(); // Add spaces before capital letters
  const thumbnailSrc = themeInfoThumbnail?.[name]?.src;

  return (
    <>
      <Card
        className={cn(
          'group relative space-y-4 overflow-hidden transition-all hover:shadow-lg',
          isActived && 'ring-2 ring-primary',
          isCloned && 'cursor-not-allowed bg-muted'
        )}
      >
        {/* Preview Image */}
        <Image src={thumbnailSrc} alt={name} height={200} width={400} className="h-[200px] w-full object-contain" />
        <CardContent>
          {/* Theme Info */}
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl">{displayName}</CardTitle>
            {theme?.creator && (
              <Badge variant="outline" className="mr-1 text-xs">
                {t('creator', { creator: theme.creator })}
              </Badge>
            )}
          </div>
          {theme?.description && (
            <CardDescription className="line-clamp-2 flex h-[44px] whitespace-break-spaces text-foreground">
              {theme.description}
            </CardDescription>
          )}

          {/* Overlay for selected state */}
          {variant === 'my-theme' && isActived && <Badge className="absolute top-4 right-4">{t('actived')}</Badge>}
          {variant === 'template' && isCloned && <Badge className="absolute top-4 right-4">{t('cloned')}</Badge>}

          {variant === 'template' && !isCloned && (
            <div className="absolute top-2 left-2 z-10">
              <Checkbox
                checked={currentCloned}
                onCheckedChange={() => {
                  setCurrentCloned(!currentCloned);
                  onCloneToggle?.(name, !currentCloned);
                }}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="w-full">
          {variant === 'my-theme' && (
            <div className="flex w-full justify-between gap-2">
              <Button className="w-full">
                <Link
                  href={createAPIUrl({
                    endpoint: ADMIN_ROUTES.themeConfig,
                    params: {
                      themeName: name,
                      themeConfig: 'pages',
                      groupSettingKey: undefined,
                      itemSettingKey: undefined,
                    },
                    checkEmptyParams: true,
                  })}
                  className="text-accent hover:no-underline"
                >
                  {t('edit')}
                </Link>
              </Button>
              {!isActived && (
                <Button variant="destructive" onClick={() => setOpenRemoveModal(true)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
      {openRemoveModal && <DeleteThemeModal setOpen={setOpenRemoveModal} onRemove={() => onRemove?.(name)} />}
    </>
  );
};
