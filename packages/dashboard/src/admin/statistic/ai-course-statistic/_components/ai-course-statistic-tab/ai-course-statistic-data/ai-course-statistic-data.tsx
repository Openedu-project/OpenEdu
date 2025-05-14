'use client';

import {
  type IAIEduParamsPayload,
  type IAIEduStatisticProvinceDetail,
  useGetAIEduStatisticProvincesDetail,
} from '@oe/api';
import type { ColumnDef } from '@oe/ui';
import type { TableRef } from '@oe/ui';
import { Button, Card, CardContent, Table } from '@oe/ui';
import type { Row } from '@tanstack/react-table';
import { useCallback, useMemo, useRef, useState } from 'react';
import { AICourseStatisticTabDataDetailModal } from './ai-course-statistic-data-detail-modal';
interface IAICourseStatisticTabDataProps {
  params: IAIEduParamsPayload;
  campaignKey: string;
}

export function AICourseStatisticTabData({ params, campaignKey }: IAICourseStatisticTabDataProps) {
  const { fromDate, toDate, courseCuids } = params;

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<IAIEduStatisticProvinceDetail | null>(null);

  const tableRef = useRef<TableRef<IAIEduStatisticProvinceDetail>>(null);

  const handleOpenModal = useCallback((course: IAIEduStatisticProvinceDetail) => {
    setSelectedCourse(course);
    setIsOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCourse(null);
    setIsOpenModal(false);
  }, []);

  const { dataAIEduStatisticProvincesDetail: responseData } = useGetAIEduStatisticProvincesDetail(campaignKey, {
    from_date: fromDate,
    to_date: toDate,
    course_cuids: courseCuids === 'all' ? undefined : courseCuids,
  });
  const courseColumns = useMemo(() => {
    if (!responseData || responseData.length === 0) {
      return [];
    }

    // Get all unique course names
    const courseSet = new Set<string>();
    for (const province of responseData) {
      if (province.courses) {
        for (const course of province.courses) {
          courseSet.add(course.name);
        }
      }
    }

    return Array.from(courseSet).map(courseName => ({
      accessorKey: courseName,
      size: 300,
      cell: ({ row }: { row: Row<IAIEduStatisticProvinceDetail> }) => {
        const province = row.original;
        const course = province.courses?.find(c => c.name === courseName);
        return course ? (
          <Button variant="link" onClick={() => handleOpenModal(province)}>
            Xem chi tiết ({course?.active_section} module)
          </Button>
        ) : (
          '-'
        );
      },
    }));
  }, [responseData, handleOpenModal]);

  const columns: ColumnDef<IAIEduStatisticProvinceDetail>[] = useMemo(
    () => [
      {
        accessorKey: 'province',
        header: 'Tên tỉnh',
        size: 200,
      },
      {
        accessorKey: 'register_count',
        header: 'Đăng ký',
        size: 250,
      },
      {
        accessorKey: 'enroll_count',
        header: 'Tham gia',
      },
      ...courseColumns,
      {
        accessorKey: 'complete_count',
        header: 'Hoàn thành',
      },
      {
        accessorKey: 'completion_rate',
        header: 'Tỷ lệ',
        cell: ({ row }) => {
          const province = row.original;
          return `${province.completion_rate.toFixed(3)}%`;
        },
      },
    ],
    [courseColumns]
  );

  return (
    <div className="block">
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-6 font-semibold text-xl">Số liệu theo tỉnh</h2>

          <Table
            columns={columns}
            data={responseData ?? []}
            hasNoColumn
            ref={tableRef}
            height="100%"
            filterSearchProps={{ useQueryParams: false }}
            hasPagination={false}
          />
        </CardContent>
      </Card>
      {isOpenModal && <AICourseStatisticTabDataDetailModal data={selectedCourse} onClose={handleCloseModal} />}
    </div>
  );
}
