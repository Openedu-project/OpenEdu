'use client';

import type { ICategoryTree } from '@oe/api/types/categories';
import { ChevronDown } from 'lucide-react';
import { Button } from '#shadcn/button';
import { Checkbox } from '#shadcn/checkbox';

export interface LevelSectionProps {
  title: string;
  isOpen: boolean;
  toggleSection: () => void;
  resetSection: () => void;
  resetLabel: string;
  checkboxes: Record<string, boolean>;
  handleCheckboxChange: (id: string) => void;
  levels: ICategoryTree[];
}

const CourseListFilterLevel = ({
  title,
  isOpen,
  toggleSection,
  resetSection,
  resetLabel,
  checkboxes,
  handleCheckboxChange,
  levels, // Using the levels prop
}: LevelSectionProps) => {
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
        <div className="mt-3 space-y-2">
          {levels.map(level => (
            <div key={level.id} className="flex items-center">
              <Checkbox
                id={`level-${level.id}`}
                className="mr-2 rounded"
                checked={checkboxes?.[`level-${level.id}`]}
                onCheckedChange={() => handleCheckboxChange(`level-${level.id}`)}
              />
              <label htmlFor={`level-${level.id}`} className="mcaption-regular16">
                {level.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseListFilterLevel;
