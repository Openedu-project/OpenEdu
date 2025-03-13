// import * as XLSX from 'xlsx';
import type { Table } from '@tanstack/react-table';
import { FileDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '#shadcn/button';

interface TemplateXLSXButtonProps<TData> {
  table?: Table<TData>;
  filename?: string;
  columnIds?: string[];
  columnLabels?: Record<string, string>;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  className?: string;
  includeExampleRow?: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  exampleData?: Record<string, any>;
}

export function TemplateXLSXButton<TData>({
  table,
  filename = 'import-template',
  columnIds,
  columnLabels,
  variant = 'outline',
  className,
  includeExampleRow = false,
  exampleData,
}: TemplateXLSXButtonProps<TData>) {
  const t = useTranslations('table');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateTemplate = async () => {
    try {
      setIsGenerating(true);

      const { utils, writeFileXLSX } = await import('./sheet-write-wrapper');

      let headers: string[] = [];
      let headerLabels: Record<string, string> = {};

      // Lấy cột từ bảng nếu có
      if (table) {
        const visibleColumns = table
          .getAllLeafColumns()
          .filter(col => col.getIsVisible() && !['expander', 'selection'].includes(col.id));

        headers = visibleColumns.map(col => col.id);
        headerLabels = visibleColumns.reduce(
          (acc, col) => {
            acc[col.id] = typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id;
            return acc;
          },
          {} as Record<string, string>
        );
      }

      // Sử dụng columnIds được cung cấp nếu có
      if (columnIds && columnIds.length > 0) {
        headers = columnIds;
      }

      // Sử dụng columnLabels được cung cấp nếu có
      if (columnLabels) {
        headerLabels = { ...headerLabels, ...columnLabels };
      }

      // Tạo dữ liệu mẫu
      const data = [headers.map(id => headerLabels[id] || id)];

      // Thêm dòng dữ liệu mẫu nếu được yêu cầu
      if (includeExampleRow) {
        const exampleRow = headers.map(id => {
          if (exampleData && exampleData[id] !== undefined) {
            return exampleData[id];
          }
          return '';
        });
        data.push(exampleRow);
      }

      // Tạo workbook
      const wb = utils.book_new();
      const ws = utils.aoa_to_sheet(data);

      // Thêm worksheet vào workbook
      utils.book_append_sheet(wb, ws, 'Template');

      // Xuất file
      writeFileXLSX(wb, `${filename}.xlsx`);
    } catch (error) {
      console.error('Lỗi khi tạo template Excel:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button variant={variant} className={className} onClick={handleGenerateTemplate} disabled={isGenerating}>
      <FileDown className="mr-2 h-4 w-4" />
      {t('downloadTemplate', { defaultValue: 'Tải mẫu nhập liệu' })}
    </Button>
  );
}
