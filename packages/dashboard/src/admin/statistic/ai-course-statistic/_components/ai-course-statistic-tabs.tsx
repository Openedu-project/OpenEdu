'use client';

import type { IAIEduParamsPayload } from '@oe/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@oe/ui';
import { AICourseStatisticTabData } from './ai-course-statistic-tab/ai-course-statistic-data/ai-course-statistic-data';
import { AICourseStatisticTabDetail } from './ai-course-statistic-tab/ai-course-statistic-detail/ai-course-statistic-detail';
import { AICourseStatisticTabOverview } from './ai-course-statistic-tab/ai-course-statistic-overview/ai-course-statistic-overview';
import { AICourseStatisticTabStudents } from './ai-course-statistic-tab/ai-course-statistic-students/ai-course-statistic-students';
interface IAICourseStatisticTabsrProps {
  campaignKey: string;
  params: IAIEduParamsPayload;
}
export function AICourseStatisticTabs({ campaignKey, params }: IAICourseStatisticTabsrProps) {
  return (
    <div className="w-full ">
      <Tabs defaultValue="overview">
        <TabsList className="bg-white">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="detailed" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Phân tích chi tiết
          </TabsTrigger>

          <TabsTrigger value="data" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Số liệu theo tỉnh
          </TabsTrigger>
          {/* TODO */}
          <TabsTrigger value="students" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            Danh sách học viên
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <AICourseStatisticTabOverview params={params} campaignKey={campaignKey} />
        </TabsContent>
        <TabsContent value="detailed">
          <AICourseStatisticTabDetail params={params} campaignKey={campaignKey} />
        </TabsContent>
        <TabsContent value="data">
          <AICourseStatisticTabData params={params} campaignKey={campaignKey} />
        </TabsContent>
        <TabsContent value="students">
          <AICourseStatisticTabStudents params={params} campaignKey={campaignKey} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
