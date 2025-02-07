'use client';

import type { ICourse } from '@oe/api/types/course/course';
import SendSquare from '@oe/assets/icons/send-square';
import { RatingStars } from '@oe/ui/components/rating-stars';
import { Separator } from '@oe/ui/shadcn/separator';
import { Layers, UsersRound } from 'lucide-react';
import type { ReactNode } from 'react';

interface CourseDetailsProps {
  courseData: ICourse;
}

export function CourseDetails({ courseData }: CourseDetailsProps) {
  return (
    <>
      <CourseName name={courseData?.name} />
      <CourseOrganization orgName={courseData?.org?.name} isCompleted={courseData?.mark_as_completed} />
      <CourseStats courseData={courseData} />
    </>
  );
}

function CourseName({ name }: { name: string }) {
  return (
    <p className="giant-iheading-bold18 line-clamp-2 flex h-fit max-h-[45px] whitespace-break-spaces text-foreground">
      {name}
    </p>
  );
}

function CourseOrganization({
  orgName,
  isCompleted,
}: {
  orgName?: string;
  isCompleted?: boolean;
}) {
  return (
    <div className="mcaption-regular14 flex items-center gap-4 text-primary">
      {orgName && <p>{orgName}</p>}
      {isCompleted && (
        <div className="-mr-spacing-sm ml-auto w-12 rounded-l-full bg-[#2BA830]">
          <div className="grid h-6 w-6 items-center justify-center">
            <SendSquare />
          </div>
        </div>
      )}
    </div>
  );
}

function CourseStats({ courseData }: { courseData: ICourse }) {
  return (
    <div className="mcaption-regular14 flex justify-between gap-4 text-foreground">
      <div className="flex flex-wrap gap-2">
        <StatItem icon={<UsersRound className="h-4 w-4" />} value={courseData?.learner_count ?? 0} />
        <Separator orientation="vertical" />
        <RatingStars
          variant="number-shorten"
          className="px-0"
          rating={(courseData?.rating ?? 0) === 0 ? 5 : (courseData?.rating ?? 0)}
        />
        <Separator orientation="vertical" />
        {courseData?.levels?.[0] && (
          <StatItem icon={<Layers className="h-4 w-4" />} value={courseData.levels[0].name} />
        )}
      </div>
    </div>
  );
}

function StatItem({
  icon,
  value,
}: {
  icon: ReactNode;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="mcaption-regular14">{value}</span>
    </div>
  );
}
