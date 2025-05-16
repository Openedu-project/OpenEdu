'use client';

import {
  type IAIEduParamsPayload,
  type IAIEduStatisticLearners,
  type IAIEduStatisticLearnersCourse,
  useGetAIEduProvinces,
  useGetAIEduStatisticLearners,
} from '@oe/api';
import { formatDateSlash } from '@oe/core';
import { AutocompeteMultiple, Card, CardContent } from '@oe/ui';
import { Table, Tooltip } from '@oe/ui';
import type { ColumnDef, Row, TableRef } from '@oe/ui';
import { useCallback, useMemo, useRef, useState } from 'react';

interface IAICourseStatisticTabStudentsProps {
  params: IAIEduParamsPayload;
  campaignKey: string;
}

export function AICourseStatisticTabStudents({ params, campaignKey }: IAICourseStatisticTabStudentsProps) {
  const { fromDate, toDate, courseCuids } = params;
  const tableRef = useRef<TableRef<IAIEduStatisticLearners>>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { dataAIEduProvinces } = useGetAIEduProvinces(campaignKey);
  const [selectedRegions, setSelectedRegions] = useState<string | string[]>(['all']);

  const options = useMemo(() => {
    return [
      { label: 'Tất cả tỉnh/thành phố', value: 'all' },
      ...(dataAIEduProvinces?.map(province => ({
        label: province.label,
        value: province.label,
      })) ?? []),
    ];
  }, [dataAIEduProvinces]);

  const { dataAIEduStatisticLearners } = useGetAIEduStatisticLearners(campaignKey, {
    from_date: fromDate,
    to_date: toDate,
    course_cuids: courseCuids,
    page: currentPage,
    per_page: pageSize,
    provinces: selectedRegions === 'all' ? undefined : selectedRegions,
  });

  const uniqueCourseNames = useMemo(() => {
    if (!dataAIEduStatisticLearners?.results || dataAIEduStatisticLearners.results.length === 0) {
      return [];
    }

    const allCourses = dataAIEduStatisticLearners.results.flatMap(student => student.courses || []);

    const uniqueNames = Array.from(new Set(allCourses.map(course => course?.name).filter(Boolean)));

    return uniqueNames;
  }, [dataAIEduStatisticLearners]);

  const getCourseStatus = useCallback((course: IAIEduStatisticLearnersCourse | undefined): string => {
    if (course?.claim_cert_date) {
      return 'Đã nhận';
    }
    if (course?.can_claim_cert) {
      return 'Chưa nhận';
    }
    return 'Chưa đủ điều kiện';
  }, []);

  const getCourseProgress = useCallback((course: IAIEduStatisticLearnersCourse | undefined): string => {
    if (!course?.enroll_date) {
      return '-';
    }
    return `Module ${course.number_of_completed_section}/${course.active_section}`;
  }, []);

  const columns: ColumnDef<IAIEduStatisticLearners>[] = useMemo(() => {
    const baseColumns: ColumnDef<IAIEduStatisticLearners>[] = [
      {
        header: 'HỌ TÊN',
        accessorKey: 'full_name',
        size: 150,
        className: 'font-medium py-4',
        enableSorting: true,
        cell: ({ row }) => row.original.full_name || '-',
      },
      {
        header: 'USER ID',
        accessorKey: 'id',
        size: 150,
        className: 'font-medium py-4',
        enableSorting: true,
      },
      {
        header: 'EMAIL',
        accessorKey: 'email',
        size: 180,
        className: 'font-medium py-4',
        enableSorting: true,
        cell: ({ row }) => row.original.email || '-',
      },
      {
        header: 'CÔNG VIỆC',
        accessorKey: 'job',
        size: 150,
        className: 'font-medium py-4',
        enableSorting: true,
        cell: ({ row }) => row.original.job || '-',
      },
      {
        header: 'ĐỘ TUỔI',
        accessorKey: 'age_group',
        size: 150,
        className: 'font-medium py-4',
        enableSorting: true,
        cell: ({ row }) => row.original.age_group || '-',
      },
      {
        header: 'TRƯỜNG HỌC',
        accessorKey: 'school',
        size: 180,
        className: 'font-medium py-4',
        enableSorting: true,
        cell: ({ row }: { row: Row<IAIEduStatisticLearners> }) => {
          const school = row.original.school;
          if (!school) {
            return '-';
          }
          return (
            <Tooltip content={school} className="ml-1">
              <p className="line-clamp-1 cursor-pointer">{school}</p>
            </Tooltip>
          );
        },
      },
      {
        header: 'TỈNH/THÀNH PHỐ',
        accessorKey: 'province',
        size: 190,
        className: 'font-medium py-4',
        enableSorting: true,
        cell: ({ row }) => row.original.province || '-',
      },
    ];

    const courseColumns = uniqueCourseNames.map((courseName, index) => {
      return {
        header: courseName,
        align: 'center' as const,
        enableSorting: false,
        columns: [
          {
            header: 'NGÀY ĐĂNG KÝ',
            accessorKey: `course_${index}_registration_date`,
            enableSorting: false,
            cell: ({ row }: { row: Row<IAIEduStatisticLearners> }) => {
              const course = row.original.courses?.find(c => c.name === courseName);
              return (
                <div className="py-2 text-center">
                  {course?.enroll_date ? formatDateSlash(course.enroll_date) : '-'}
                </div>
              );
            },
          },
          {
            header: 'TIẾN ĐỘ',
            accessorKey: `course_${index}_progress`,
            enableSorting: false,
            cell: ({ row }: { row: Row<IAIEduStatisticLearners> }) => {
              const course = row.original.courses?.find(c => c.name === courseName);
              return <div className="w-full w-full py-2 text-center">{getCourseProgress(course)}</div>;
            },
          },
          {
            header: 'TRẠNG THÁI',
            accessorKey: `course_${index}_status`,
            enableSorting: false,
            cell: ({ row }: { row: Row<IAIEduStatisticLearners> }) => {
              const course = row.original.courses?.find(c => c.name === courseName);
              return <div className="w-full py-2 text-center">{getCourseStatus(course)}</div>;
            },
          },
        ],
      };
    });

    return [...baseColumns, ...courseColumns];
  }, [uniqueCourseNames, getCourseProgress, getCourseStatus]);

  return (
    <Card>
      <CardContent className="flex flex-col gap-6 p-6">
        <AutocompeteMultiple
          options={options}
          value={options.filter(option =>
            Array.isArray(selectedRegions) ? selectedRegions.includes(option.value) : option.value === selectedRegions
          )}
          minHeightItem={50}
          onChange={value => {
            const result: string[] = [];
            value.map(item => {
              if (item.value === 'all') {
                result.push('all');
              } else {
                result.push(item.value);
              }
            });
            if (result.includes('all')) {
              setSelectedRegions('all');
              return;
            }
            setSelectedRegions(result);
          }}
        />

        <Table
          data={dataAIEduStatisticLearners?.results ?? []}
          columns={columns}
          ref={tableRef}
          hasNoColumn
          height="550px"
          border="bordered-rows"
          tableOptions={{
            manualPagination: true,
            pageCount: dataAIEduStatisticLearners?.pagination?.total_pages || 0,
            onPaginationChange: updater => {
              let newPageIndex = 0;
              let newPageSize = pageSize;

              if (typeof updater === 'function') {
                const currentPagination = {
                  pageIndex: currentPage - 1,
                  pageSize,
                };
                const newPagination = updater(currentPagination);
                newPageIndex = newPagination.pageIndex;
                newPageSize = newPagination.pageSize;
              } else {
                newPageIndex = updater.pageIndex;
                newPageSize = updater.pageSize || pageSize;
              }

              if (newPageSize !== pageSize) {
                setPageSize(newPageSize);
              }

              const newPage = newPageIndex + 1;
              if (newPage !== currentPage) {
                setCurrentPage(newPage);
              }
            },
            state: {
              pagination: {
                pageIndex: currentPage - 1, // Convert 1-based to 0-based index
                pageSize: pageSize,
              },
            },
          }}
          filterSearchProps={{ useQueryParams: true }}
        />
      </CardContent>
    </Card>
  );
}
