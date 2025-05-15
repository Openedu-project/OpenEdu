'use client';
import { type IAIEduParamsPayload, type IAIEduTimeFormat, useGetAIEduSystemConfig } from '@oe/api';
import { useEffect, useMemo, useState } from 'react';
import { AICourseStatisticFilter } from './ai-course-statistic-filter';
import { AICourseStatisticTabs } from './ai-course-statistic-tabs';

import { differenceInDays, differenceInHours, differenceInMonths } from 'date-fns';

const getTimeFormat = (startDate: number | Date, endDate: number | Date): IAIEduTimeFormat => {
  // Convert to Date objects if they're numbers
  const start = typeof startDate === 'number' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'number' ? new Date(endDate) : endDate;

  // Calculate differences using date-fns
  const hoursDiff = differenceInHours(end, start);
  const daysDiff = differenceInDays(end, start);
  const monthsDiff = differenceInMonths(end, start);

  // Apply the logic based on requirements
  if (hoursDiff < 24) {
    return 'hour';
  }

  if (daysDiff <= 31) {
    return 'day';
  }

  if (monthsDiff <= 12) {
    return 'month';
  }

  // Default case - more than 12 months
  return 'year';
};

export function AICourseStatisticDashboard() {
  const [startDate, setStartDate] = useState<number>(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [endDate, setEndDate] = useState<number>(Date.now());
  const [courseCuid, setCourseCuid] = useState<string | string[]>('all');
  const [params, setParams] = useState<IAIEduParamsPayload>({
    fromDate: Date.now() - 7 * 24 * 60 * 60 * 1000,
    toDate: Date.now(),
    groupBy: 'hour',
    courseCuids: courseCuid === 'all' ? undefined : courseCuid,
  });

  const { dataAIEduSystemConfig } = useGetAIEduSystemConfig();

  useEffect(() => {
    if (startDate || endDate) {
      const timeFormat = getTimeFormat(startDate, endDate);
      setParams({
        fromDate: startDate,
        toDate: endDate,
        courseCuids: courseCuid === 'all' ? undefined : courseCuid,
        groupBy: timeFormat,
      });
    }
  }, [startDate, endDate, courseCuid]);

  const campaignKey = useMemo(() => {
    if (!dataAIEduSystemConfig) {
      return null;
    }
    return dataAIEduSystemConfig?.[0]?.value.campaign_key;
  }, [dataAIEduSystemConfig]);

  const courseList = useMemo(() => {
    if (!dataAIEduSystemConfig) {
      return null;
    }
    return dataAIEduSystemConfig?.[0]?.value.courses;
  }, [dataAIEduSystemConfig]);

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <AICourseStatisticFilter
        courseList={courseList ?? []}
        courseCuid={courseCuid}
        setCourseCuid={setCourseCuid}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        params={params}
        campaignKey={campaignKey ?? ''}
      />
      <AICourseStatisticTabs params={params} campaignKey={campaignKey ?? ''} />
    </div>
  );
}
