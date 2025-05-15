'use client';

import type { IAIEduStatisticPoint } from '@oe/api';
import { Card, CardContent, ChartContainer, ChartTooltip, ChartTooltipContent } from '@oe/ui';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, XAxis, YAxis } from 'recharts';

interface IAIEduCourseStatisticStudentGrowthChartProps {
  dataAIEduStatisticLearningGrowth: IAIEduStatisticPoint[];
}
export function AiCourseStatisticStudentGrowthChart({
  dataAIEduStatisticLearningGrowth,
}: IAIEduCourseStatisticStudentGrowthChartProps) {
  const chartConfig = {
    students: {
      label: 'Số lượng người học (người)',
      color: 'var(--primary)',
    },
    growthRate: {
      label: 'Tốc độ tăng trưởng (%)',
      color: 'var(--secondary)',
    },
  };

  return (
    <Card>
      <CardContent className="pb-10">
        <h2 className="mb-6 font-semibold text-xl">Số lượng và tốc độ tăng trưởng học viên theo thời gian</h2>
        <ChartContainer config={chartConfig} className="max-h-[600px] w-full">
          <ComposedChart data={dataAIEduStatisticLearningGrowth} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} height={90} />
            <XAxis dataKey="time_label" interval={0} angle={-45} height={70} textAnchor="end" />
            <YAxis yAxisId="left" orientation="left" tickMargin={10} tickCount={7} />
            <YAxis yAxisId="right" orientation="right" tickMargin={10} tickCount={5} />
            <Bar
              yAxisId="left"
              dataKey="value"
              fill="var(--color-students)"
              radius={[4, 4, 0, 0]}
              barSize={40}
              name="Số lượng người học (người)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="growth_rate"
              stroke="var(--color-growthRate)"
              strokeWidth={2}
              dot={{ r: 4, fill: 'var(--color-growthRate)' }}
              activeDot={{ r: 6 }}
              name="Tốc độ tăng trưởng (%)"
            />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Legend wrapperStyle={{ bottom: -20 }} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
