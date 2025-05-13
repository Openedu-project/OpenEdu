'use client';

import type { IAIStatisticSectionCompletion } from '@oe/api';
import { Card, CardContent, ChartContainer, ChartTooltip } from '@oe/ui';
import { type JSX, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';

interface ModuleData {
  module: string;
  [key: string]: string | number | SectionInfo;
}

interface SectionInfo {
  count: number;
  sectionName: string;
}

interface ChartConfig {
  moduleCompletion: { label: string };
  [key: string]: {
    label: string;
    color?: string;
  };
}

// Define proper types for tooltip props
interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

// Define the tooltip payload item type
interface TooltipPayloadItem {
  name: string;
  value: number;
  dataKey: string;
  color: string;
  payload: {
    module: string;
    [key: string]: string | number | SectionInfo;
  };
}

// Custom tooltip content component that shows section names
const CustomTooltipContent = ({ active, payload, label }: CustomTooltipProps): JSX.Element | null => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="rounded-md border border-gray-200 bg-white p-4 shadow-md">
        <p className="font-medium text-gray-900">{label}</p>
        <div className="mt-2 space-y-1.5">
          {payload.map((entry, index) => {
            // Only show entries with values > 0
            if (entry.value <= 0) {
              return null;
            }

            const sectionInfo = entry.payload[`${entry.dataKey}_info`] as SectionInfo | undefined;
            return (
              <div key={`${sectionInfo?.sectionName}${index}`} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: entry.color }} />
                <p className="flex w-full justify-between gap-4 text-gray-700 text-sm">
                  <span className="font-bold">{sectionInfo?.sectionName || 'N/A'}</span>
                  <span> {entry.value}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

interface AIEduCourseStatisticModuleCompletionChartProps {
  dataAIEduStatisticSectionCompletion: IAIStatisticSectionCompletion[];
}

export function AiCourseStatisticModuleCompletionChart({
  dataAIEduStatisticSectionCompletion,
}: AIEduCourseStatisticModuleCompletionChartProps) {
  const { chartData, chartConfig } = useMemo(() => {
    const moduleOrders = Array.from(
      new Set(dataAIEduStatisticSectionCompletion.flatMap(course => course.module_items.map(module => module.order)))
    ).sort((a, b) => a - b) as number[];

    const formattedData = moduleOrders.map(order => {
      const moduleData: ModuleData = { module: `Module ${order}` };

      for (const { module_items, course_cuid } of dataAIEduStatisticSectionCompletion) {
        const moduleItem = module_items.find(item => item.order === order);

        moduleData[course_cuid] = moduleItem?.completed_count ?? 0;

        if (moduleItem) {
          moduleData[`${course_cuid}_info`] = {
            count: moduleItem.completed_count,
            sectionName: moduleItem.section_name,
          };
        }
      }

      return moduleData;
    });

    // Create chart configuration
    const config: ChartConfig = {
      moduleCompletion: { label: 'Module Completion' },
    };

    dataAIEduStatisticSectionCompletion.forEach((course, index) => {
      config[course.course_cuid] = {
        label: course.course_name,
        color: `var(--chart-${index + 1})`,
      };
    });

    return { chartData: formattedData, chartConfig: config };
  }, [dataAIEduStatisticSectionCompletion]);

  // Chart constants
  const CHART_MARGIN = { top: 20, right: 30, left: 20, bottom: 20 };
  const BAR_SIZE = 30;

  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <BarChart data={chartData} margin={CHART_MARGIN}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="module" />
            <YAxis domain={[0, 'auto']} tickCount={5} />

            {/* Map courses to Bar components */}
            {dataAIEduStatisticSectionCompletion.map((course, index) => (
              <Bar
                key={course.course_cuid}
                dataKey={course.course_cuid}
                radius={[4, 4, 0, 0]}
                barSize={BAR_SIZE}
                name={course.course_name}
                fill={`var(--chart-${index + 1})`}
                activeBar={{
                  fill: `var(--chart-${index + 1})`,
                  fillOpacity: 0.6,
                }}
              />
            ))}

            <ChartTooltip content={<CustomTooltipContent />} cursor={{ fill: '#f8f9fa', opacity: 0.6 }} />
            <Legend
              verticalAlign="bottom"
              height={45}
              iconType="square"
              iconSize={10}
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
