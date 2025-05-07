import type { IAIEduStatisticWidget } from '@oe/api';
import { useCountUp } from '@oe/core';

interface StatsCardProps {
  title: string;
  value: string;
  className?: string;
  valueClassName?: string;
}

function StatsCard({ title, value, valueClassName }: StatsCardProps) {
  return (
    <div className="flex flex-col items-center justify-between space-y-2 text-center">
      <p className="text-muted-foreground text-sm">{title}</p>
      <p className={`font-bold text-2xl ${valueClassName}`}>
        <AnimatedValue value={value} />
      </p>
    </div>
  );
}

function AnimatedValue({ value }: { value: string }) {
  const isPercentage = value.includes('%');
  const numericValue = Number.parseFloat(value.replace(/[^0-9.]/g, ''));

  const { count } = useCountUp({
    end: numericValue,
    duration: 2000,
    separator: '.',
    decimals: isPercentage ? 1 : 0,
  });

  let displayValue = count;

  if (value.includes('.000')) {
    displayValue = `${count}`;
  }

  return <>{isPercentage ? `${displayValue}%` : displayValue}</>;
}
interface IAICourseStatisticStatsProps {
  dataAIEduStatisticWidget: IAIEduStatisticWidget | null | undefined;
}
export function AiCourseStatisticStats({ dataAIEduStatisticWidget }: IAICourseStatisticStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 bg-white p-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Tổng số học viên đăng ký"
        value={dataAIEduStatisticWidget?.total_registered_users?.toString() ?? '0'}
        className="border-indigo-100"
        valueClassName="text-indigo-600"
      />
      <StatsCard
        title="Tổng số học viên tham gia"
        value={dataAIEduStatisticWidget?.total_enrolled_users?.toString() ?? '0'}
        className="border-indigo-100"
        valueClassName="text-indigo-600"
      />
      <StatsCard
        title="Học viên hoàn thành"
        value={dataAIEduStatisticWidget?.total_completed_users?.toString() ?? '0'}
        className="border-indigo-100"
        valueClassName="text-indigo-600"
      />
      <StatsCard
        title="Tỷ lệ hoàn thành"
        value={`${dataAIEduStatisticWidget?.completion_rate ?? 0}%`}
        className="border-indigo-100"
        valueClassName="text-indigo-600"
      />
    </div>
  );
}
