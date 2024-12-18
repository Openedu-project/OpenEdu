import type { ICategoryTree } from '@oe/api/types/categories';
import { Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Modal } from '#components/modal';
import { Button } from '#shadcn/button';
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area';
import { cn } from '#utils/cn';
import type { ITreeCheckedItem } from '../checkbox-tree/checkbox-tree';
import { CategorySelection } from './category-selection';

interface ICategorySelectionModal {
  className?: string;
  categories: ICategoryTree[];
  initialCategories: ITreeCheckedItem[];
  onSave: (value: ITreeCheckedItem[]) => void;
  title?: string;
}
export default function CategorySelectionModal({
  className,
  categories,
  initialCategories,
  title,
  onSave,
}: ICategorySelectionModal) {
  const t = useTranslations('categorySelectionModal');
  const tGeneral = useTranslations('general');
  const [values, setValues] = useState<ITreeCheckedItem[]>([]);

  return (
    <Modal
      title={title ?? t('title')}
      trigger={
        <Button variant="ghost" className={cn('flex w-full justify-between', className)} rightSection={<Settings />}>
          {t('category')}
        </Button>
      }
      buttons={[
        {
          label: tGeneral('cancel'),
          variant: 'outline',
          onClick: onClose => {
            onClose?.();
          },
        },
        {
          label: tGeneral('save'),
          onClick: onClose => {
            onSave(values);
            onClose?.();
          },
        },
      ]}
    >
      <ScrollArea className="h-[55dvh]">
        <CategorySelection
          initialCategories={initialCategories}
          className={className}
          categories={categories}
          onCategoriesChange={setValues}
        />
        <ScrollBar />
      </ScrollArea>
    </Modal>
  );
}
