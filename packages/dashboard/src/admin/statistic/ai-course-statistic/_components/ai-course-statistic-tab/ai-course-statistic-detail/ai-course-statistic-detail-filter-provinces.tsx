'use client';

import type { IAIEduProvince } from '@oe/api';
import { Badge, Button, Card, CardContent } from '@oe/ui';
import { useCallback } from 'react';

interface IAICourseStatisticTabDetailCompareProvincesChartProps {
  dataAIEduProvinces: IAIEduProvince[];
  selectedRegions: string[];
  toggleRegion: (region: string) => void;
  setSelectedRegions: (region: string[]) => void;
}

export function AICourseStatisticTabDetailFilterProvinces({
  dataAIEduProvinces,
  selectedRegions,
  toggleRegion,
  setSelectedRegions,
}: IAICourseStatisticTabDetailCompareProvincesChartProps) {
  const handleAllClick = useCallback(() => {
    if (selectedRegions?.length === dataAIEduProvinces.length) {
      setSelectedRegions(['Thành phố Hà Nội', 'Thành phố Hồ Chí Minh', 'Tự do']);
    } else {
      const newRegions = dataAIEduProvinces
        .filter(region => !selectedRegions.includes(region.label))
        .map(region => region.label);
      setSelectedRegions([...selectedRegions, ...newRegions]);
    }
  }, [dataAIEduProvinces, selectedRegions, setSelectedRegions]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="mb-4 font-semibold text-xl">Phân tích số liệu giữa các tỉnh</h2>
          <Button onClick={handleAllClick}>
            {selectedRegions?.length === dataAIEduProvinces.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </Button>
        </div>
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
