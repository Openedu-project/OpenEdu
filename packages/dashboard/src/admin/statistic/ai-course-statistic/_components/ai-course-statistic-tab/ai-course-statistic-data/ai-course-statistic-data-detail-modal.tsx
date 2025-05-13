'use client';

import type { IAIEduStatisticProvinceDetail } from '@oe/api';
import { Modal, Table } from '@oe/ui';
import type { ColumnDef } from '@oe/ui';
import type { TableRef } from '@oe/ui';
import { useMemo, useRef } from 'react';

interface IAICourseStatisticTabDataDetailModal {
  onClose: () => void;
  data: IAIEduStatisticProvinceDetail | null;
}

interface ModuleData {
  moduleNumber: number;
  completedCount: number;
}

export function AICourseStatisticTabDataDetailModal({ onClose, data }: IAICourseStatisticTabDataDetailModal) {
  const tableRefs = useRef<Record<string, TableRef<ModuleData>>>({});

  const courses = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.courses || [];
  }, [data]);

  const getTableData = (course: IAIEduStatisticProvinceDetail['courses'][0]) => {
    if (!course) {
      return { columns: [], data: [] };
    }

    const moduleData: ModuleData[] = [
      {
        moduleNumber: 0,
        completedCount: 0,
      },
    ];

    const columns: ColumnDef<ModuleData>[] = course.sections
      .sort((a, b) => a.order - b.order)
      .map(section => ({
        accessorKey: `module_${section.order}`,
        header: () => (
          <div className="text-center">
            <div className="mt-1 max-w-[250px] truncate text-xs" title={section.section_name}>
              {section.section_name}
            </div>
          </div>
        ),
        cell: () => <div className="text-center font-bold text-lg">{section.completed_count.toLocaleString()}</div>,
        size: 250,
      }));

    return { columns, data: moduleData };
  };

  return (
    <Modal
      open={true}
      title={`Chi tiết module - ${data?.province}`}
      onClose={onClose}
      buttons={[
        {
          type: 'button',
          label: 'Đóng',
          variant: 'outline',
          onClick: () => onClose(),
        },
      ]}
      className="md:max-w-[70vw]"
    >
      <div className="block space-y-8 px-4 py-8">
        {courses.length > 0 ? (
          courses.map(course => {
            const tableData = getTableData(course);

            return (
              <div key={course.name} className="mb-8">
                <h3 className="mb-3 font-semibold text-lg">{course.name}</h3>
                <Table
                  columns={tableData.columns}
                  data={tableData.data}
                  ref={el => {
                    if (el) {
                      tableRefs.current[course.name] = el;
                    }
                  }}
                  height="auto"
                  hasPagination={false}
                />
              </div>
            );
          })
        ) : (
          <div className="py-4 text-center">Không có dữ liệu khóa học</div>
        )}
      </div>
    </Modal>
  );
}
