'use client';
import {
  type IAIEduParamsPayload,
  useGetAIEduStatisticLearningGrowth,
  useGetAIEduStatisticSectionCompletion,
  useGetAIEduStatisticWidget,
} from '@oe/api';
import { AiCourseStatisticModuleCompletionChart } from './ai-course-statistic-overview-module-completion';
import { AiCourseStatisticStats } from './ai-course-statistic-overview-stats';
import { AiCourseStatisticStudentGrowthChart } from './ai-course-statistic-overview-student-chart';
interface IAICourseStatisticTabOverviewProps {
  params: IAIEduParamsPayload;
  campaignKey: string;
}
export function AICourseStatisticTabOverview({ params, campaignKey }: IAICourseStatisticTabOverviewProps) {
  const { fromDate, toDate, groupBy, courseCuids } = params;
  const { dataAIEduStatisticWidget } = useGetAIEduStatisticWidget(campaignKey, {
    from_date: fromDate,
    to_date: toDate,
    course_cuids: courseCuids === 'all' ? undefined : courseCuids,
  });
  const { dataAIEduStatisticLearningGrowth } = useGetAIEduStatisticLearningGrowth(campaignKey, {
    from_date: fromDate,
    to_date: toDate,
    course_cuids: courseCuids === 'all' ? undefined : courseCuids,
    group_by: groupBy,
  });

  const { dataAIEduStatisticSectionCompletion } = useGetAIEduStatisticSectionCompletion(campaignKey, {
    from_date: fromDate,
    to_date: toDate,
    course_cuids: courseCuids === 'all' ? undefined : courseCuids,
  });

  return (
    <div className="flex flex-col gap-4">
      <AiCourseStatisticStats dataAIEduStatisticWidget={dataAIEduStatisticWidget} />
      <AiCourseStatisticStudentGrowthChart
        dataAIEduStatisticLearningGrowth={dataAIEduStatisticLearningGrowth?.points ?? []}
      />
      <AiCourseStatisticModuleCompletionChart
        dataAIEduStatisticSectionCompletion={dataAIEduStatisticSectionCompletion ?? []}
      />
    </div>
  );
}
