import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, useRef, useState } from 'react';
import { Button } from '#shadcn/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '#shadcn/dialog';
import { Label } from '#shadcn/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';
// import * as XLSX from 'xlsx';
import { useTable } from './table-provider';

// Cấu hình ánh xạ cột
export interface ColumnImportConfig {
  columnId: string; // ID cột trong bảng
  excelHeader?: string; // Tiêu đề tương ứng trong file Excel
  required?: boolean; // Cột bắt buộc
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  transform?: (value: any) => any; // Biến đổi giá trị
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  validate?: (value: any) => boolean | string; // Kiểm tra hợp lệ (true hoặc thông báo lỗi)
}

interface MappingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  excelHeaders: string[];
  tableColumns: { id: string; header: string }[];
  defaultMapping: Record<string, string>;
  onConfirm: (mapping: Record<string, string>) => void;
}

// Component để người dùng map cột excel với cột table
function ColumnMappingDialog({
  isOpen,
  onClose,
  excelHeaders,
  tableColumns,
  defaultMapping,
  onConfirm,
}: MappingDialogProps) {
  const t = useTranslations('table');
  const [mapping, setMapping] = useState<Record<string, string>>(defaultMapping);

  const handleChange = (tableColumnId: string, excelHeader: string) => {
    setMapping(prev => ({
      ...prev,
      [tableColumnId]: excelHeader,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('columnMapping', { defaultValue: 'Ánh xạ cột' })}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-muted-foreground text-sm">
            {t('selectColumnMapping', {
              defaultValue: 'Chọn cột Excel tương ứng cho mỗi cột dữ liệu',
            })}
          </p>

          {tableColumns.map(column => (
            <div key={column.id} className="flex flex-col gap-2">
              <Label htmlFor={`map-${column.id}`}>{column.header}</Label>
              <Select value={mapping[column.id] || ''} onValueChange={value => handleChange(column.id, value)}>
                <SelectTrigger id={`map-${column.id}`}>
                  <SelectValue
                    placeholder={t('selectColumn', {
                      defaultValue: 'Chọn cột',
                    })}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{t('ignoreColumn', { defaultValue: 'Bỏ qua' })}</SelectItem>
                  {excelHeaders.map(header => (
                    <SelectItem key={header} value={header}>
                      {header}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('cancel', { defaultValue: 'Hủy' })}
          </Button>
          <Button onClick={() => onConfirm(mapping)}>{t('confirm', { defaultValue: 'Xác nhận' })}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface ImportXLSXButtonProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onDataImported?: (data: any[]) => void;
  onError?: (error: Error) => void;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  acceptedFormats?: string;
  columnConfig?: ColumnImportConfig[];
  tableColumns?: { id: string; header: string }[];
  showMappingDialog?: boolean;
  // Biến đổi dữ liệu sau khi import
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  transformData?: (data: any[]) => any[];
  // Kiểm tra hợp lệ toàn bộ dữ liệu
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  validateData?: (data: any[]) => { valid: boolean; errors?: string[] };
}

export function ImportXLSXButton({
  onDataImported,
  onError,
  className,
  variant = 'outline',
  acceptedFormats = '.xlsx,.xls,.csv',
  columnConfig,
  tableColumns = [],
  showMappingDialog = false,
  transformData,
  validateData,
}: ImportXLSXButtonProps) {
  const t = useTranslations('table');
  const [isImporting, setIsImporting] = useState(false);
  const [showMapping, setShowMapping] = useState(false);
  const [excelHeaders, setExcelHeaders] = useState<string[]>([]);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [excelData, setExcelData] = useState<any[]>([]);
  const [defaultMapping, setDefaultMapping] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useTable();

  // Tự động đề xuất mapping ban đầu
  const suggestMapping = (headers: string[], columns: { id: string; header: string }[]): Record<string, string> => {
    const mapping: Record<string, string> = {};

    // Đầu tiên thử map theo tên cột chính xác
    for (const column of columns) {
      const exactMatch = headers.find(h => h.toLowerCase() === column.header.toLowerCase());
      if (exactMatch) {
        mapping[column.id] = exactMatch;
      }
    }

    // Sau đó thử map theo id cột
    for (const column of columns) {
      if (!mapping[column.id]) {
        const idMatch = headers.find(h => h.toLowerCase() === column.id.toLowerCase());
        if (idMatch) {
          mapping[column.id] = idMatch;
        }
      }
    }

    // Map theo columnConfig nếu có
    if (columnConfig) {
      for (const config of columnConfig) {
        if (config.excelHeader) {
          const configMatch = headers.find(h => h.toLowerCase() === config.excelHeader?.toLowerCase());
          if (configMatch) {
            mapping[config.columnId] = configMatch;
          }
        }
      }
    }

    return mapping;
  };

  const processFile = async (file: File) => {
    try {
      setIsImporting(true);

      // Đọc file
      const { headers, data } = await readExcelFile(file);

      if (showMappingDialog && headers.length > 0) {
        // Hiện dialog cho người dùng map cột
        setExcelHeaders(headers);
        setExcelData(data);
        const suggestedMapping = suggestMapping(headers, tableColumns);
        setDefaultMapping(suggestedMapping);
        setShowMapping(true);
      } else {
        // Xử lý dữ liệu trực tiếp
        processImportedData(data);
      }
    } catch (error) {
      console.error('Lỗi khi nhập file Excel:', error);
      onError?.(error as Error);
    } finally {
      if (!showMappingDialog) {
        setIsImporting(false);
        // Reset input để có thể chọn lại cùng một file
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const processImportedData = async (
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    data: any[],
    columnMapping?: Record<string, string>
  ) => {
    try {
      let processedData = data;

      // Áp dụng mapping nếu có
      if (columnMapping && Object.keys(columnMapping).length > 0) {
        processedData = data.map(row => {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          const mappedRow: Record<string, any> = {};

          for (const [tableCol, excelHeader] of Object.entries(columnMapping)) {
            if (excelHeader) {
              mappedRow[tableCol] = row[excelHeader];
            }
          }

          return mappedRow;
        });
      }

      // Áp dụng các chuyển đổi và validate từ columnConfig
      if (columnConfig) {
        processedData = processedData.map(row => {
          const newRow = { ...row };

          for (const config of columnConfig) {
            // Kiểm tra cột bắt buộc
            if (config.required && (newRow[config.columnId] === undefined || newRow[config.columnId] === null)) {
              throw new Error(
                t('requiredColumnMissing', {
                  column: config.excelHeader || config.columnId,
                  defaultValue: `Cột bắt buộc "${config.excelHeader || config.columnId}" bị thiếu giá trị`,
                })
              );
            }

            // Áp dụng transform
            if (config.transform && newRow[config.columnId] !== undefined) {
              newRow[config.columnId] = config.transform(newRow[config.columnId]);
            }

            // Kiểm tra hợp lệ
            if (config.validate && newRow[config.columnId] !== undefined) {
              const validationResult = config.validate(newRow[config.columnId]);
              if (validationResult !== true && typeof validationResult === 'string') {
                throw new Error(validationResult);
              }
            }
          }

          return newRow;
        });
      }

      // Áp dụng transform tổng thể
      if (transformData) {
        processedData = transformData(processedData);
      }

      // Kiểm tra hợp lệ toàn bộ dữ liệu
      if (validateData) {
        const validation = validateData(processedData);
        if (!validation.valid) {
          throw new Error(validation.errors?.join('\n') || 'Dữ liệu không hợp lệ');
        }
      }

      // Gọi callback với dữ liệu đã xử lý
      if (processedData && processedData.length > 0) {
        onDataImported?.(processedData);

        // Tải lại dữ liệu bảng nếu cần
        if (mutate) {
          await mutate();
        }
      }
    } catch (error) {
      console.error('Lỗi khi xử lý dữ liệu nhập:', error);
      onError?.(error as Error);
    } finally {
      setIsImporting(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const readExcelFile = async (
    file: File
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ): Promise<{ headers: string[]; data: any[] }> => {
    const { read, utils } = await import('./sheet-write-wrapper');
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        try {
          const data = e.target?.result;
          const workbook = read(data, { type: 'binary' });

          // Lấy sheet đầu tiên
          const firstSheetName = workbook.SheetNames[0];
          if (!firstSheetName) {
            resolve({ headers: [], data: [] });
            return;
          }
          const worksheet = workbook.Sheets[firstSheetName];
          if (!worksheet) {
            resolve({ headers: [], data: [] });
            return;
          }
          // Chuyển đổi thành JSON
          const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

          // Xử lý dữ liệu: từ mảng bình thường sang mảng object với key là header
          if (jsonData.length >= 2) {
            // Ít nhất có header và 1 dòng dữ liệu
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            const headers = (jsonData[0] as any[]).map(h => String(h));
            const rows = jsonData.slice(1);

            const formattedData = rows.map(row => {
              return headers.reduce(
                (obj, header, index) => {
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  obj[header] = (row as any[])[index];
                  return obj;
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                },
                {} as Record<string, any>
              );
            });

            resolve({ headers, data: formattedData });
          } else if (jsonData.length === 1) {
            // Chỉ có header, không có dữ liệu
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            const headers = (jsonData[0] as any[]).map(h => String(h));
            resolve({ headers, data: [] });
          } else {
            resolve({ headers: [], data: [] });
          }
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = error => {
        reject(error);
      };

      reader.readAsBinaryString(file);
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleConfirmMapping = (mapping: Record<string, string>) => {
    setShowMapping(false);
    processImportedData(excelData, mapping);
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFormats}
        style={{ display: 'none' }}
      />
      <Button variant={variant} className={className} onClick={handleClick} disabled={isImporting}>
        <Upload className="mr-2 h-4 w-4" />
        {t('importExcel', { defaultValue: 'Nhập Excel' })}
      </Button>

      {showMapping && (
        <ColumnMappingDialog
          isOpen={showMapping}
          onClose={() => {
            setShowMapping(false);
            setIsImporting(false);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
          excelHeaders={excelHeaders}
          tableColumns={tableColumns}
          defaultMapping={defaultMapping}
          onConfirm={handleConfirmMapping}
        />
      )}
    </>
  );
}
