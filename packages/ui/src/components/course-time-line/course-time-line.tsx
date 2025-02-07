import { Check } from 'lucide-react';
import React from 'react';
import { cn } from '#utils/cn';

interface CourseTimelineItem {
  number: number;
  sections: number;
  description: string;
}

interface CourseTimelineItemProps extends CourseTimelineItem {
  isActive?: boolean;
  isCompleted?: boolean;
}

interface CourseTimelineProps {
  items: CourseTimelineItem[];
  currentStep?: number;
}

export function CourseTimelineItem({ number, sections, description, isActive, isCompleted }: CourseTimelineItemProps) {
  return (
    <div className="flex w-full flex-shrink-0 flex-col items-center sm:w-auto">
      <div className="relative h-8 w-8">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full border ${
            isActive
              ? 'border-primary bg-primary text-white'
              : isCompleted
                ? 'border-primary bg-primary text-white'
                : 'border-primary text-primary'
          }`}
        >
          {isCompleted ? (
            <Check className="h-5 w-5" />
          ) : (
            <span className={cn('mcaption-semibold14 text-primary', isActive && 'text-white')}>{number}</span>
          )}
        </div>
      </div>
      <div className="mx-auto mt-2 max-w-[150px] text-center">
        <p className="mcaption-regular16">
          {sections} {sections <= 1 ? 'section' : 'sections'}
        </p>
        <p className="giant-iheading-semibold20">{description}</p>
      </div>
    </div>
  );
}

export function CourseTimeline({ items, currentStep }: CourseTimelineProps) {
  return (
    <div className="mx-auto w-full rounded-lg border bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
        {items.map((item, index) => (
          <React.Fragment key={item.description}>
            <CourseTimelineItem
              {...item}
              isActive={currentStep === item.number}
              isCompleted={!!currentStep && item.number < currentStep}
            />
            {index < items.length - 1 && (
              <div className="flex h-8 w-[2px] flex-shrink bg-neutral-50 sm:mt-4 sm:h-[2px] sm:w-full" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default CourseTimeline;
