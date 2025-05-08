'use client';

import type { IAIEduStatisticProvince } from '@oe/api';
import { Card, CardContent, ChartContainer } from '@oe/ui';
import { memo, useCallback, useMemo } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

interface IAICourseStatisticTabDetailJoinByProvincesChart {
  selectedRegions: string[];
  dataAIEduStatisticProvinces: IAIEduStatisticProvince[];
}

const CHART_COLORS = Array.from({ length: 70 }, (_, i) => `var(--chart-${i + 1})`);

interface ChartDataItem {
  name: string;
  value: number;
  percentage: string;
  color: string;
}

interface CustomTooltipPayload {
  name: string;
  value: number;
  percentage: string;
  color: string;
  payload: ChartDataItem;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: CustomTooltipPayload[];
}

const CustomTooltip = memo(({ active, payload }: CustomTooltipProps) => {
  if (active && payload?.[0]?.payload) {
    const data = payload[0].payload;
    return (
      <div className="rounded-md border bg-white p-3 shadow-md">
        <p className="font-semibold">{data.name}</p>
        <p>Số người học: {data.value}</p>
        <p>Tỷ lệ: {data.percentage}</p>
      </div>
    );
  }
  return null;
});
CustomTooltip.displayName = 'CustomTooltip';

interface MemoizedCellProps {
  key: string;
  fill: string;
}

const MemoizedCell = memo(({ key, fill }: MemoizedCellProps) => <Cell key={key} fill={fill} />);
MemoizedCell.displayName = 'MemoizedCell';

interface LabelProps {
  name: string;
  percentage: string;
}

export function AICourseStatisticTabDetailJoinByProvincesChart({
  selectedRegions,
  dataAIEduStatisticProvinces,
}: IAICourseStatisticTabDetailJoinByProvincesChart) {
  const chartData = useMemo<ChartDataItem[]>(() => {
    return dataAIEduStatisticProvinces.map((province, index) => {
      const formattedPercent = `${province.learner_percent.toFixed(2)}%`;

      const defaultColor = '#000000'; // Fallback color
      return {
        name: province.province,
        value: province.learner_count,
        percentage: formattedPercent,
        color: CHART_COLORS[index % CHART_COLORS.length] || defaultColor,
      };
    });
  }, [dataAIEduStatisticProvinces]);

  const filteredData = useMemo<ChartDataItem[]>(() => {
    return selectedRegions.length > 0 ? chartData.filter(item => selectedRegions.includes(item.name)) : chartData;
  }, [chartData, selectedRegions]);

  const chartConfig = useMemo(() => {
    return filteredData.reduce<Record<string, { label: string; color: string }>>((config, item) => {
      config[item.name.toLowerCase().replace(/\s+/g, '_')] = {
        label: item.name,
        color: item.color,
      };
      return config;
    }, {});
  }, [filteredData]);

  const renderCustomizedLabel = useCallback(({ name, percentage }: LabelProps): string => {
    return `${name} ${percentage}`;
  }, []);

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-6 font-semibold text-xl">Tỷ lệ người tham gia theo tỉnh</h2>
        <div className="flex h-[400px] items-center justify-center">
          {filteredData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-full">
              <PieChart>
                <Pie
                  data={filteredData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label={renderCustomizedLabel}
                  labelLine={true}
                  minAngle={0.5}
                  isAnimationActive={false} // Disable animations for better performance
                >
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-${entry.value}${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">Không có dữ liệu để hiển thị</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
