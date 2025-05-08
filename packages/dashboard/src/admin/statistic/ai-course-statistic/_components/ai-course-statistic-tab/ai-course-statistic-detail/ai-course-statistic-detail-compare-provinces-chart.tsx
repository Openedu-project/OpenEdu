// "use client";

// import type { IAIEduStatisticProvince } from "@oe/api";
// import { Card, CardContent, ChartContainer, ChartTooltipContent } from "@oe/ui";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// interface IAICourseStatisticTabDetailCompareProvincesChartProps {
//   selectedRegions: string[];
//   dataAIEduStatisticProvinces: IAIEduStatisticProvince[];
// }
// export function AICourseStatisticTabDetailCompareProvincesChart({
//   selectedRegions,
//   dataAIEduStatisticProvinces,
// }: IAICourseStatisticTabDetailCompareProvincesChartProps) {
//   const allData = [
//     {
//       name: "Hà Nội",
//       totalStudents: 950,
//       completedCourses: 520,
//       completionRate: 54.7,
//     },
//     {
//       name: "TP Hồ Chí Minh",
//       totalStudents: 1200,
//       completedCourses: 680,
//       completionRate: 56.7,
//     },
//     {
//       name: "Đà Nẵng",
//       totalStudents: 520,
//       completedCourses: 340,
//       completionRate: 65.4,
//     },
//     {
//       name: "Hải Phòng",
//       totalStudents: 320,
//       completedCourses: 180,
//       completionRate: 56.3,
//     },
//     {
//       name: "Cần Thơ",
//       totalStudents: 280,
//       completedCourses: 150,
//       completionRate: 53.6,
//     },
//     {
//       name: "Huế",
//       totalStudents: 250,
//       completedCourses: 130,
//       completionRate: 52.0,
//     },
//     {
//       name: "Nha Trang",
//       totalStudents: 200,
//       completedCourses: 110,
//       completionRate: 55.0,
//     },
//     {
//       name: "Bình Dương",
//       totalStudents: 320,
//       completedCourses: 170,
//       completionRate: 53.1,
//     },
//     {
//       name: "Đồng Nai",
//       totalStudents: 270,
//       completedCourses: 140,
//       completionRate: 51.9,
//     },
//     {
//       name: "Quảng Ninh",
//       totalStudents: 190,
//       completedCourses: 100,
//       completionRate: 52.6,
//     },
//     {
//       name: "Các tỉnh khác",
//       totalStudents: 1100,
//       completedCourses: 580,
//       completionRate: 52.7,
//     },
//   ];

//   // Filter data based on selected regions
//   const data = allData.filter(
//     (item) =>
//       selectedRegions.includes(item.name) || item.name === "Các tỉnh khác"
//   );

//   // Create a config object for the chart
//   const chartConfig = {
//     totalStudents: {
//       label: "Tổng số học viên",
//       color: "var(--chart-1)",
//     },
//     completedCourses: {
//       label: "Tổng số chứng chỉ đã xuất bản",
//       color: "var(--chart-2)",
//     },
//     completionRate: {
//       label: "Tỷ lệ hoàn thành và xuất bản (%)",
//       color: "var(--chart-3)",
//     },
//   };

//   return (
//     <Card>
//       <CardContent className="p-6">
//         <h2 className="text-xl font-semibold mb-6">
//           So sánh số lượng học viên giữa các tỉnh
//         </h2>
//         <ChartContainer config={chartConfig} className="max-h-[600px] w-full">
//           <BarChart
//             data={data}
//             margin={{
//               top: 20,
//               right: 30,
//               left: 20,
//               bottom: 60,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis
//               dataKey="name"
//               angle={-45}
//               textAnchor="end"
//               height={60}
//               tickMargin={20}
//             />
//             <YAxis yAxisId="left" orientation="left" />
//             <YAxis yAxisId="right" orientation="right" />
//             <Tooltip content={<ChartTooltipContent />} />
//             <Legend wrapperStyle={{ bottom: 0 }} />
//             <Bar
//               yAxisId="left"
//               dataKey="totalStudents"
//               fill="var(--color-totalStudents)"
//               name="Tổng số học viên"
//               radius={[4, 4, 0, 0]}
//             />
//             <Bar
//               yAxisId="left"
//               dataKey="completedCourses"
//               fill="var(--color-completedCourses)"
//               name="Tổng số chứng chỉ đã xuất bản"
//               radius={[4, 4, 0, 0]}
//             />
//             <Bar
//               yAxisId="right"
//               dataKey="completionRate"
//               fill="var(--color-completionRate)"
//               name="Tỷ lệ hoàn thành và xuất bản (%)"
//               radius={[4, 4, 0, 0]}
//             />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }
'use client';

import type { IAIEduStatisticProvince } from '@oe/api';
import { Card, CardContent, ChartContainer } from '@oe/ui';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

interface IAICourseStatisticTabDetailCompareProvincesChartProps {
  selectedRegions: string[];
  dataAIEduStatisticProvinces: IAIEduStatisticProvince[];
}

// Define the type for our formatted chart data
interface ChartDataItem {
  name: string;
  totalStudents: number;
  completedCourses: number;
  completionRate: number;
}

export function AICourseStatisticTabDetailCompareProvincesChart({
  selectedRegions,
  dataAIEduStatisticProvinces,
}: IAICourseStatisticTabDetailCompareProvincesChartProps) {
  // Transform the original data to match the chart format
  const chartData = useMemo<ChartDataItem[]>(() => {
    // Filter provinces with learner_count > 0 and exclude "Tự do" (which is not a real province)
    return (
      dataAIEduStatisticProvinces
        .filter(province => province.learner_count > 0 && province.province !== 'Tự do')
        .map(province => ({
          name: province.province,
          totalStudents: province.learner_count,
          completedCourses: province.certificate_count,
          // Calculate completion rate with proper handling for zero values
          completionRate: province.enroll_count > 0 ? Math.round(province.cert_on_enroll_percent * 100) / 100 : 0,
        }))
        // Sort by totalStudents in descending order
        .sort((a, b) => b.totalStudents - a.totalStudents)
    );
  }, [dataAIEduStatisticProvinces]);

  // Filter data based on selected regions
  const filteredData = useMemo<ChartDataItem[]>(() => {
    return selectedRegions.length > 0
      ? chartData.filter(item => selectedRegions.includes(item.name))
      : chartData.slice(0, 10); // Show top 10 provinces by default if no selection
  }, [chartData, selectedRegions]);

  // Create a config object for the chart
  const chartConfig = {
    totalStudents: {
      label: 'Tổng số học viên',
      color: 'var(--chart-1)',
    },
    completedCourses: {
      label: 'Tổng số chứng chỉ đã xuất bản',
      color: 'var(--chart-2)',
    },
    completionRate: {
      label: 'Tỷ lệ hoàn thành và xuất bản (%)',
      color: 'var(--chart-3)',
    },
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-6 font-semibold text-xl">So sánh số lượng học viên giữa các tỉnh</h2>
        <div className="h-[600px] w-full">
          {filteredData.length > 0 ? (
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                data={filteredData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tickMargin={20} />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  content={props => {
                    const { active, payload } = props;
                    if (active && payload && payload.length > 0 && payload[0]) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-md border bg-white p-3 shadow-md">
                          <p className="font-semibold">{data.name}</p>
                          <p>Tổng số học viên: {data.totalStudents}</p>
                          <p>Số chứng chỉ đã xuất bản: {data.completedCourses}</p>
                          <p>Tỷ lệ hoàn thành: {data.completionRate.toFixed(2)}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ bottom: 0 }} />
                <Bar
                  yAxisId="left"
                  dataKey="totalStudents"
                  fill="var(--chart-1)"
                  name="Tổng số học viên"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="left"
                  dataKey="completedCourses"
                  fill="var(--chart-2)"
                  name="Tổng số chứng chỉ đã xuất bản"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="completionRate"
                  fill="var(--chart-3)"
                  name="Tỷ lệ hoàn thành và xuất bản (%)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
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
