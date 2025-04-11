# Example how to use import export xlsx

```tsx
import { 
  Table, 
  TableProvider, 
  ExportXLSXButton, 
  ImportXLSXButton,
  TemplateXLSXButton,
  type ColumnExportConfig,
  type ColumnImportConfig
} from '#src/components/table';
import { useRef } from 'react';

function MyTablePage() {
  const tableRef = useRef(null);
  
  // Cấu hình xuất Excel
  const exportConfig: ColumnExportConfig[] = [
    { columnId: 'id', include: false },  // Bỏ qua cột id
    { columnId: 'name', exportHeader: 'Tên người dùng', order: 1 },
    { columnId: 'email', exportHeader: 'Email', order: 2 },
    { columnId: 'date', exportHeader: 'Ngày tạo', order: 3, transform: (value) => {
      // Định dạng ngày tháng
      return new Date(value).toLocaleDateString('vi-VN');
    }},
    // Thêm cột mới không có trong bảng
    { columnId: 'notes', exportHeader: 'Ghi chú', order: 4 }
  ];
  
  // Cấu hình nhập Excel
  const importConfig: ColumnImportConfig[] = [
    { columnId: 'name', excelHeader: 'Tên người dùng', required: true },
    { columnId: 'email', excelHeader: 'Email', required: true, validate: (value) => {
      // Kiểm tra định dạng email
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Email không hợp lệ';
    }},
    { columnId: 'date', excelHeader: 'Ngày tạo', transform: (value) => {
      // Chuyển đổi chuỗi ngày thành đối tượng Date
      return new Date(value);
    }}
  ];
  
  // Định nghĩa cột trong bảng
  const tableColumns = [
    { id: 'name', header: 'Tên người dùng' },
    { id: 'email', header: 'Email' },
    { id: 'date', header: 'Ngày tạo' }
  ];
  
  const handleImportData = (data) => {
    console.log('Dữ liệu đã nhập:', data);
    // Xử lý dữ liệu đã nhập tại đây
  };
  
  return (
    <TableProvider>
      <div className="mb-4 flex gap-2">
        <ImportXLSXButton 
          onDataImported={handleImportData} 
          onError={(error) => console.error(error)}
          columnConfig={importConfig}
          tableColumns={tableColumns}
          showMappingDialog={true}
          validateData={(data) => {
            // Kiểm tra tổng thể dữ liệu
            const errors = [];
            if (data.length > 100) {
              errors.push('Số lượng bản ghi vượt quá giới hạn (100)');
            }
            return { valid: errors.length === 0, errors };
          }}
        />
        
        <ExportXLSXButton
          table={tableRef.current?.table}
          filename="du-lieu-nguoi-dung"
          sheetName="Người dùng"
          columnConfig={exportConfig}
        />
        
        <TemplateXLSXButton
          table={tableRef.current?.table}
          filename="mau-nhap-nguoi-dung"
          columnIds={['name', 'email', 'date']}
          columnLabels={{
            name: 'Tên người dùng',
            email: 'Email',
            date: 'Ngày tạo (YYYY-MM-DD)'
          }}
          includeExampleRow={true}
          exampleData={{
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@example.com',
            date: '2023-01-01'
          }}
        />
      </div>
      
      <Table
        ref={tableRef}
        columns={columns}
        data={data}
        // Các props khác...
      />
    </TableProvider>
  );
}
```
