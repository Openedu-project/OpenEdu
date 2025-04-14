'use client';

import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '#shadcn/button';
import { Checkbox } from '#shadcn/checkbox';

export interface OrganizationsSectionProps {
  title: string;
  isOpen: boolean;
  toggleSection: () => void;
  resetSection: () => void;
  resetLabel: string;
  checkboxes: Record<string, boolean>;
  handleCheckboxChange: (id: string) => void;
}

const CourseListFilterCompletedCourses = ({
  title,
  isOpen,
  toggleSection,
  resetSection,
  resetLabel,
  checkboxes,
  handleCheckboxChange,
}: OrganizationsSectionProps) => {
  const t = useTranslations('courseList');

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
          <div className="flex items-center">
            <Checkbox
              id="status-completed"
              className="mr-2 rounded"
              checked={checkboxes?.['status-completed']}
              onCheckedChange={() => handleCheckboxChange('status-completed')}
            />
            <label htmlFor="status-completed" className="mcaption-regular16">
              {t('completedCourses')}
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="status-in-progress"
              className="mr-2 rounded"
              checked={checkboxes?.['status-in-progress']}
              onCheckedChange={() => handleCheckboxChange('status-in-progress')}
            />
            <label htmlFor="status-in-progress" className="mcaption-regular16">
              {t('inCompletedCourses')}
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export { CourseListFilterCompletedCourses };
