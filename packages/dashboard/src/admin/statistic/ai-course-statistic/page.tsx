import { DashboardHeaderCard, cn } from '@oe/ui';
import { AICourseStatisticDashboard } from './_components/ai-course-statistic-dashboard';

export function AICouseStatistic() {
  return (
    <>
      <DashboardHeaderCard
        breadcrumbs={[
          { label: 'Thống kê', disabled: true },
          { label: 'Hiệu quả chương trình', disabled: true },
        ]}
        dashboard="admin"
      >
        <h1 className="mb-4 text-2xl">Hiệu quả chương trình</h1>
      </DashboardHeaderCard>
      <div className={cn('flex-1 overflow-hidden')}>
        <AICourseStatisticDashboard />
      </div>
    </>
  );
}
