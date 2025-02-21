'use client';

import type { ILesson, ISection } from '@oe/api/types/course/segment';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useState } from 'react';

const CollapsibleCourseContent = ({ outline }: { outline: ISection[] }) => {
  return (
    <div className="space-y-3">
      {outline.map(section => (
        <CollapsibleCourseSection key={section.order} outline={section} />
      ))}
    </div>
  );
};

const CollapsibleCourseSection = ({ outline }: { outline: ISection }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border-[0.4px] border-primary-20 bg-neutral-20 p-3">
        <div className="flex items-center justify-between gap-2">
          <h4 className="m-0 font-semibold text-base">
            Section {outline.order + 1}: {outline.title}
          </h4>
          <button type="button" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUpIcon className="h-6 w-6" /> : <ChevronDownIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isExpanded && outline.lessons?.map((lession, index) => (
          <CollapsibleCourseLession key={lession.lesson_count} lession={lession} index={index + 1} />
        ))}
    </div>
  );
};

const CollapsibleCourseLession = ({
  lession,
  index,
}: {
  lession: ILesson;
  index: number;
}) => {
  return (
    <div className="space-y-1 rounded-2xl border-[1px] border-neutral-100 bg-neutral-20 p-3">
      <p className="font-semibold text-xs">Lesson {index}</p>
      <h5 className="font-semibold text-base">{lession.title}</h5>
    </div>
  );
};

export default CollapsibleCourseContent;
