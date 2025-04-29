'use client';
import { useCategories } from '@oe/api';
import type { ICategory } from '@oe/api';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '#shadcn/button';
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { PromptGrid } from './prompt-grid';
import { PromptPopup } from './prompt-popup';

export const PromptCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const { selectedAgent } = useConversationStore();

  const { categories, categoriesIsLoading } = useCategories({
    type: 'prompt',
    per_page: 99,
  });

  useEffect(() => {
    if (selectedCategory || !categories || categories?.results.length === 0) {
      return;
    }
    setSelectedCategory(categories.results[0]);
  }, [selectedCategory, categories]);

  const handleSelectCategory = (category: ICategory) => {
    setSelectedCategory(category);
  };
  if (categoriesIsLoading) {
    return (
      <div className="mx-auto w-fit">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {(categories?.results.length ?? 0) > 0 && selectedAgent === 'ai_search' && (
        <ScrollArea className="w-inherit rounded-full border bg-background p-1 md:p-2">
          <div className="flex justify-around gap-2">
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
      )}
      <div className="min-h-44">
        <PromptGrid
          categoryId={selectedCategory?.id}
          name={selectedCategory?.name}
          litmited={8}
          agent="ai_search"
          PromptPopup={PromptPopup}
        />
      </div>
    </div>
  );
};
