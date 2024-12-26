import { useTranslations } from 'next-intl';
import { type FC, useMemo } from 'react';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';
import { useFormContext } from './form-nested-provider';

export interface IFormNavigationProps {
  className?: string;
  onPrevClick?: () => void;
  onNextClick?: () => void;
}

export const FormNavigation: FC<IFormNavigationProps> = ({ className, onPrevClick, onNextClick }) => {
  const tGeneral = useTranslations('general');
  const { formIds, tabsMetadata, activeTab, setActiveTab, validateForms } = useFormContext();

  const { prevTab, nextTab } = useMemo(() => {
    const tabs = Array.from(tabsMetadata.keys());
    const currentIndex = activeTab ? tabs.indexOf(activeTab) : -1;
    return {
      prevTab: currentIndex > 0 ? tabs[currentIndex - 1] : null,
      nextTab: currentIndex < tabs.length - 1 ? tabs[currentIndex + 1] : null,
    };
  }, [tabsMetadata, activeTab]);

  const handleNext = async () => {
    if (!activeTab) {
      return;
    }
    const isValid = await validateForms(formIds);

    if (isValid && nextTab) {
      setActiveTab(nextTab);
      onNextClick?.();
    }
  };

  const handlePrev = () => {
    if (prevTab) {
      setActiveTab(prevTab);
      onPrevClick?.();
    }
  };

  return (
    <div className={cn('mt-4 flex justify-between', className)}>
      <Button type="button" variant="outline" onClick={handlePrev} disabled={!prevTab}>
        {tGeneral('previous')}
      </Button>
      <Button type="button" onClick={handleNext} disabled={!nextTab}>
        {tGeneral('next')}
      </Button>
    </div>
  );
};
