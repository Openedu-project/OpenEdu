'use client';

import type { ICourse } from '@oe/api/types/course/course';
import { useState } from 'react';
import { useRouter } from '#common/navigation';
import { Button } from '#shadcn/button';
import { DialogContent, DialogTitle } from '#shadcn/dialog';
import { ScrollArea } from '#shadcn/scroll-area';
import { cn } from '#utils/cn';
import CourseCardCompact from '../../components/course-card/course-card-compact';

const SelectCreateCourse = ({
  dataCouses,
}: {
  dataCouses: ICourse[] | null;
}) => {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

  const handleSelectCourse = (course: ICourse) => {
    setSelectedCourse(course);
  };

  const handleMakeLaunchpad = () => {
    router.push(`/creator/launchpad/${selectedCourse?.id}/edit`);
  };

  return (
    <DialogContent className={cn('!max-w-5xl !rounded-3xl max-h-[90vh]')}>
      <DialogTitle>Select From Course List</DialogTitle>
      <ScrollArea className="h-[60vh]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dataCouses?.map(course => (
            <CourseCardCompact
              key={course.id}
              course={course}
              isSelected={selectedCourse?.id === course.id}
              onClick={() => handleSelectCourse(course)}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="flex flex-col items-center justify-between gap-2 border-t pt-4 md:flex-row">
        <p>Notice: All course include 4 sections at least.</p>
        <Button className="rounded-xl font-semibold" onClick={handleMakeLaunchpad}>
          Make Launchpad
        </Button>
      </div>
    </DialogContent>
  );
};

export default SelectCreateCourse;
