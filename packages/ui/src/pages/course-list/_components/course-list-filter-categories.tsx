'use client';

import type { ICategoryTree } from '@oe/api/types/categories';
import { ChevronDown } from 'lucide-react';
import { TreeCheckbox } from '#components/tree-checkbox';
import { Button } from '#shadcn/button';

export interface CategoriesSectionProps {
  title: string;
  isOpen: boolean;
  toggleSection: () => void;
  resetSection: () => void;
  resetLabel: string;
  categories: ICategoryTree[];
  checkedCategoryIds?: string[];
  onCategoryChange: (checkedIds: string[]) => void;
}

const CourseListFilterCategories = ({
  title,
  isOpen,
  toggleSection,
  resetSection,
  resetLabel,
  categories,
  checkedCategoryIds = [],
  onCategoryChange,
}: CategoriesSectionProps) => {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="giant-iheading-semibold16 md:giant-iheading-semibold20 mb-0">{title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="link" className="mbutton-semibold16 h-auto p-0 text-primary" onClick={resetSection}>
            {resetLabel}
          </Button>
          <Button variant="ghost" size="sm" className="p-1" onClick={toggleSection}>
            <ChevronDown
              className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`}
            />
          </Button>
        </div>
      </div>
      {isOpen && (
        <TreeCheckbox data={categories} checkedIds={checkedCategoryIds} onChange={onCategoryChange} idPrefix="cat" />
      )}
    </div>
  );
};

export default CourseListFilterCategories;
