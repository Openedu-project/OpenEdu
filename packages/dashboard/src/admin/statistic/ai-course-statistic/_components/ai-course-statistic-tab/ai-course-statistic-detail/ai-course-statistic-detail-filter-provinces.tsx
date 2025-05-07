'use client';

import type { IAIEduProvince } from '@oe/api';
import { Badge, Card, CardContent } from '@oe/ui';

interface IAICourseStatisticTabDetailCompareProvincesChartProps {
  dataAIEduProvinces: IAIEduProvince[];
  selectedRegions: string[];
  toggleRegion: (region: string) => void;
}

export function AICourseStatisticTabDetailFilterProvinces({
  dataAIEduProvinces,
  selectedRegions,
  toggleRegion,
}: IAICourseStatisticTabDetailCompareProvincesChartProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-4 font-semibold text-xl">Phân tích số liệu giữa các tỉnh</h2>
        <p className="mb-4 text-gray-500 text-sm">Chọn nhiều tỉnh để so sánh dữ liệu trên các biểu đồ</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {dataAIEduProvinces.map(region => (
            <Badge
              key={region.id}
              variant={selectedRegions.includes(region.label) ? 'default' : 'outline'}
              className={`cursor-pointer hover:border-primary ${
                selectedRegions.includes(region.label) ? 'bg-primary text-primary-foreground hover:bg-primary-300' : ''
              }`}
              onClick={() => toggleRegion(region.label)}
            >
              {region.label}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
