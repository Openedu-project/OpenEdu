import { Checkbox } from '#shadcn/checkbox';
import { cn } from '#utils/cn';

export interface CheckboxGridOption {
  id: string;
  label: string;
}

export interface CheckboxGridProps {
  rows?: CheckboxGridOption[];
  columns?: CheckboxGridOption[];
  value: Record<string, string[]>; // Map of rowId -> array of columnIds (multiple selections per row)
  onChange: (rowId: string, columnId: string, checked: boolean) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string>; // Map of rowId -> error message
}

export const CheckboxGrid = ({
  rows,
  columns,
  value,
  onChange,
  className,
  required = false,
  disabled = false,
  errors,
}: CheckboxGridProps) => {
  const handleCheckboxChange = (rowId: string, columnId: string, checked: boolean) => {
    onChange(rowId, columnId, checked);
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full min-w-max">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="w-[200px] p-3 text-left font-medium" />
              {columns?.map(column => (
                <th key={column.id} className="p-3 text-center font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows?.map(row => (
              <tr key={row.id} className="border-b last:border-b-0 hover:bg-gray-50">
                <td className="p-3 font-medium">
                  {row.label}
                  {required && <span className="text-red-500">*</span>}
                </td>
                {columns?.map(column => (
                  <td key={column.id} className="p-3 text-center">
                    <Checkbox
                      id={`${row.id}-${column.id}`}
                      checked={(value?.[row.id] || []).includes(column.id)}
                      onCheckedChange={checked => handleCheckboxChange(row.id, column.id, checked as boolean)}
                      disabled={disabled}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Error messages below the table */}
      {errors && Object.keys(errors).length > 0 && (
        <div className="space-y-1">
          {Object.entries(errors).map(([rowId, errorMessage]) => (
            <p key={rowId} className="font-medium text-red-500 text-sm">
              {rows?.find(r => r.id === rowId)?.label}: {errorMessage}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
