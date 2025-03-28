'use client';

import { Modal } from '@oe/ui/components/modal';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@oe/ui/shadcn/carousel';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { themeInfo } from '../../_config/theme-info';
import type { ThemeName } from '../../_types';
import { ThemeCard } from './theme-card';

interface ThemeTemplatesModalProps {
  alreadyClonedThemes?: ThemeName[];
  countSystemTemplates: number;
  countAlreadyClonedThemes: number;
  onClose: () => void;
  onSubmit: (selected: ThemeName[]) => void;
}

const ThemeTemplatesModal = ({
  alreadyClonedThemes,
  countSystemTemplates,
  countAlreadyClonedThemes,
  onClose,
  onSubmit,
}: ThemeTemplatesModalProps) => {
  const tThemeInfo = useTranslations('themePage');
  const t = useTranslations('themeList');

  const [selectedNames, setSelectedNames] = useState<ThemeName[]>([]);

  const handleSubmit = () => {
    if (selectedNames.length === 0) {
      toast.warning(t('cloneFail'));
      return;
    }
    // Remove the duplicate item
    const filteredSeletedNames = selectedNames.filter((item, i) => selectedNames?.indexOf(item) === i);
    onSubmit(filteredSeletedNames);
  };

  const handleCheckboxToggle = (themeName: ThemeName, isChecked: boolean) => {
    if (isChecked) {
      setSelectedNames(prev => [...prev, themeName]);
    } else {
      setSelectedNames(prev => prev.filter(t => t !== themeName));
    }
  };
  return (
    <Modal
      open={true}
      title={t('cloneTitle', {
        countAlreadyClonedThemes,
        countSystemTemplates,
      })}
      onClose={onClose}
      onSubmit={handleSubmit}
      showSubmit={selectedNames.length > 0}
      className="w-full md:min-w-[80vw] md:overflow-x-scroll"
    >
      <Carousel
        opts={{
          align: 'start',
        }}
        className="mx-auto w-[90%]"
      >
        <CarouselContent>
          {Object.entries(themeInfo(tThemeInfo)).map(
            ([key, theme]) =>
              (alreadyClonedThemes?.find(t => t === key)?.length ?? 0) <= 0 && (
                <CarouselItem key={key} className="md:basis-1/2 lg:basis-1/3">
                  <ThemeCard
                    key={key}
                    theme={theme}
                    name={key as ThemeName}
                    isCloned={false}
                    onCloneToggle={handleCheckboxToggle}
                    isActived={false}
                    variant="template"
                  />
                </CarouselItem>
              )
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Modal>
  );
};

ThemeTemplatesModal.displayName = 'ThemeTemplatesModal';
export { ThemeTemplatesModal };
