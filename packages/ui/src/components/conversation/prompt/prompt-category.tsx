'use client';
import { useCategories } from '@oe/api/hooks/useCategories';
import type { ICategory } from '@oe/api/types/categories';
import { useEffect, useState } from 'react';
import { Button } from '#shadcn/button';
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area';
import { cn } from '#utils/cn';
import { PromptGrid } from './prompt-grid';

export const PromptCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();

  const { categories } = useCategories({ type: 'prompt', per_page: 99 });

  useEffect(() => {
    if (selectedCategory || !categories || categories?.results.length === 0) {
      return;
    }
    setSelectedCategory(categories.results[0]);
  }, [selectedCategory, categories]);

  const handleSelectCategory = (category: ICategory) => {
    setSelectedCategory(category);
  };
  return (
    <div className="flex flex-col gap-4">
      {(categories?.results.length ?? 0) > 0 && (
        <div className="-top-4 md:-top-8 sticky z-10 bg-background">
          <ScrollArea className="rounded-full border bg-background p-1 md:p-2">
            <div className="flex gap-3">
              {categories?.results.map(cate => (
                <Button
                  key={cate.id}
                  variant="ghost"
                  onClick={() => handleSelectCategory(cate)}
                  className={cn(
                    'mcaption-semibold14 md:mcaption-semibold16 rounded-full py-0',
                    selectedCategory?.id === cate.id && 'bg-primary/10 text-primary'
                  )}
                >
                  {cate.name}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
      <PromptGrid categoryId={selectedCategory?.id} name={selectedCategory?.name} litmited={8} />
    </div>
  );
};
