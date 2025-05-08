'use client';
import { type IAIEduParamsPayload, useGetAIEduProvinces, useGetAIEduStatisticProvinces } from '@oe/api';
import { useCallback, useState } from 'react';
import { AICourseStatisticTabDetailCompareProvincesChart } from './ai-course-statistic-detail-compare-provinces-chart';
import { AICourseStatisticTabDetailFilterProvinces } from './ai-course-statistic-detail-filter-provinces';
import { AICourseStatisticTabDetailJoinByProvincesChart } from './ai-course-statistic-detail-join-by-provinces-chart';

interface IAICourseStatisticTabDetailProps {
  params: IAIEduParamsPayload;
  campaignKey: string;
}
export function AICourseStatisticTabDetail({ params, campaignKey }: IAICourseStatisticTabDetailProps) {
  const { fromDate, toDate, courseCuids } = params;
  const [selectedRegions, setSelectedRegions] = useState<string[]>([
    'Thành phố Hà Nội',
    'Thành phố Hồ Chí Minh',
    'Tự do',
  ]);

  const { dataAIEduProvinces } = useGetAIEduProvinces(campaignKey);

  const { dataAIEduStatisticProvinces } = useGetAIEduStatisticProvinces(campaignKey, {
    from_date: fromDate,
    to_date: toDate,
    course_cuids: courseCuids === 'all' ? undefined : courseCuids,
    provinces: [...selectedRegions]?.length === 0 ? undefined : [...selectedRegions],
  });

  const toggleRegion = useCallback(
    (region: string) => {
      if (selectedRegions.includes(region)) {
        setSelectedRegions(selectedRegions.filter(r => r !== region));
      } else {
        setSelectedRegions([...selectedRegions, region]);
      }
    },
    [selectedRegions]
  );

  return (
    <div className="flex flex-col gap-4">
      <AICourseStatisticTabDetailFilterProvinces
        selectedRegions={selectedRegions}
        dataAIEduProvinces={dataAIEduProvinces ?? []}
        toggleRegion={toggleRegion}
      />
      <AICourseStatisticTabDetailJoinByProvincesChart
        selectedRegions={selectedRegions}
        dataAIEduStatisticProvinces={dataAIEduStatisticProvinces ?? []}
      />
      <AICourseStatisticTabDetailCompareProvincesChart
        selectedRegions={selectedRegions}
        dataAIEduStatisticProvinces={dataAIEduStatisticProvinces ?? []}
      />
    </div>
  );
}
