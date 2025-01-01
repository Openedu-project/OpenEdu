import type { ICategoryTree } from '@oe/api/types/categories';
import { Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Modal } from '#components/modal';
import { Badge } from '#shadcn/badge';
import { Button } from '#shadcn/button';
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area';
import { cn } from '#utils/cn';
import type { ITreeCheckedItem } from '../checkbox-tree/checkbox-tree';
import { CategorySelection } from './category-selection';

interface ICategorySelectionModal {
  className?: string;
  categories: ICategoryTree[];
  value?: ITreeCheckedItem[];
  onChange?: (value: ITreeCheckedItem[]) => void;
  title?: string;
  showValue?: boolean;
}
export default function CategorySelectionModal({
  className,
  categories,
  value,
  title,
  onChange,
  showValue = false,
}: ICategorySelectionModal) {
  const t = useTranslations('categorySelectionModal');
  const tGeneral = useTranslations('general');
  const [values, setValues] = useState<ITreeCheckedItem[]>([]);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="giant-iheading-semibold16 flex-1 text-foreground">{t('category')}</p>
        <Modal
          title={title ?? t('title')}
          trigger={
            <Button variant="ghost" className={cn('h-8 w-8 p-0', className)}>
              <Settings className="h-4 w-4" />
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
                onChange?.(values);
                onClose?.();
              },
            },
          ]}
        >
          <ScrollArea className="h-[55dvh]">
            <CategorySelection
              initialCategories={value}
              className={className}
              categories={categories}
              onCategoriesChange={setValues}
            />
            <ScrollBar />
          </ScrollArea>
        </Modal>
      </div>
      {showValue && value && value?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {value?.map(value => (
            <Badge key={value.id} variant="default">
              {value.name}
            </Badge>
          ))}
        </div>
      )}
    </>
  );
}
