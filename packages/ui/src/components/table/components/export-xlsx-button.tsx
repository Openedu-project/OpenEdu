import type { Column, Row, Table } from '@tanstack/react-table';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '#shadcn/button';

// Updated export config definition
export interface ColumnExportConfig {
  columnId: string; // ID cột trong bảng
  exportHeader?: string; // Tiêu đề khi xuất (nếu khác với tiêu đề gốc)
  include?: boolean; // Có xuất cột này không
  order?: number; // Thứ tự xuất
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  transform?: (value: any, row: any) => any; // Added row parameter
}

interface ExportXLSXButtonProps<TData> {
  table: Table<TData>;
  filename?: string;
  sheetName?: string;
  onlySelectedRows?: boolean;
  exportAll?: boolean;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  columnConfig?: ColumnExportConfig[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  transformData?: (data: any[]) => any[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  additionalData?: Record<string, any>[];
}

export function ExportXLSXButton<TData>({
  table,
  filename = 'table-data',
  sheetName = 'Sheet1',
  onlySelectedRows = false,
  exportAll = false,
  className,
  variant = 'outline',
  columnConfig,
  transformData,
  additionalData,
}: ExportXLSXButtonProps<TData>) {
  const t = useTranslations('table');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const { utils, writeFileXLSX } = await import('./sheet-write-wrapper');

      // Lấy dữ liệu từ bảng
      let rows: Row<TData>[] = [];

      if (onlySelectedRows) {
        rows = table.getFilteredSelectedRowModel().rows;
      } else if (exportAll) {
        rows = table.getPreFilteredRowModel().rows;
      } else {
        rows = table.getFilteredRowModel().rows;
      }

      if (rows.length === 0 && additionalData?.length === 0) {
        console.warn('Không có dữ liệu để xuất');
        return;
      }

      // Lấy tất cả các cột
      const allColumns = table.getAllLeafColumns();
      // Xác định cột nào sẽ được xuất và theo thứ tự nào
      let columnsToExport: (Column<TData, unknown> & {
        exportHeader?: string;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        transform?: (value: any, row: any) => any;
      })[] = [];

      if (columnConfig) {
        // Sử dụng cấu hình tùy chỉnh nếu có
        columnsToExport = columnConfig
          .filter(config => config.include !== false)
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map(config => {
            const column = allColumns.find(col => col.id === config.columnId);
            if (!column) {
              // Tạo cột ảo nếu không tìm thấy trong bảng
              return {
                id: config.columnId,
                exportHeader: config.exportHeader || config.columnId,
                transform: config.transform,
                getValue: () => '',
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              } as any;
            }
            return {
              ...column,
              exportHeader: config.exportHeader,
              transform: config.transform,
            };
          });
      } else {
        // Mặc định: xuất tất cả cột hiển thị (trừ cột đặc biệt)
        columnsToExport = allColumns
          .filter(column => column.getIsVisible() && !['expander', 'selection'].includes(column.id))
          .map(column => ({ ...column }));
      }

      // Tạo header row cho file Excel
      const headerRow = columnsToExport.reduce(
        (acc, column) => {
          const headerText =
            column.exportHeader || (typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id);
          acc[column.id] = headerText;
          return acc;
        },
        {} as Record<string, string>
      );

      // Chuyển dữ liệu thành mảng các object
      let dataToExport = [
        headerRow,
        ...rows.map(row => {
          return columnsToExport.reduce(
            (acc, column) => {
              // Get value using column ID
              let value = row.getValue(column.id);
              const rowData = row.original;

              // Áp dụng hàm transform nếu có - pass both value and row
              if (column.transform) {
                value = column.transform(value, rowData);
              }

              acc[column.id] = value;
              return acc;
            },
            {} as Record<string, unknown>
          );
        }),
      ];

      // Thêm dữ liệu bổ sung nếu có
      if (additionalData && additionalData.length > 0) {
        const additionalRows = additionalData.map(item => {
          return columnsToExport.reduce(
            (acc, column) => {
              acc[column.id] = item[column.id] ?? '';
              return acc;
            },
            {} as Record<string, unknown>
          );
        });
        dataToExport = [...dataToExport, ...additionalRows];
      }

      // Áp dụng biến đổi tùy chỉnh cho toàn bộ dữ liệu
      if (transformData) {
        dataToExport = transformData(dataToExport);
      }

      // Tạo workbook mới
      const wb = utils.book_new();
      const ws = utils.json_to_sheet(dataToExport, { skipHeader: true });

      // Thêm worksheet vào workbook
      utils.book_append_sheet(wb, ws, sheetName);

      // Xuất file
      writeFileXLSX(wb, `${filename}.xlsx`);
    } catch (error) {
      console.error('Lỗi khi xuất file Excel:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button variant={variant} className={className} onClick={handleExport} disabled={isExporting}>
      <Download className="mr-2 h-4 w-4" />
      {t('exportExcel', { defaultValue: 'Xuất Excel' })}
    </Button>
  );
}
