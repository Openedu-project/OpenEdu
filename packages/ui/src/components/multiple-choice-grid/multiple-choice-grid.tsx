import { RadioGroup, RadioGroupItem } from '#shadcn/radio-group';
import { cn } from '#utils/cn';

export interface MultipleChoiceGridOption {
  id: string;
  text: string;
}

export interface MultipleChoiceGridProps {
  rows: MultipleChoiceGridOption[];
  columns: MultipleChoiceGridOption[];
  value?: Record<string, string>; // Map of rowId -> columnId (one selection per row)
  onChange: (rowId: string, columnId: string) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string>; // Map of rowId -> error message
}

export const MultipleChoiceGrid = ({
  rows,
  columns,
  value = {},
  onChange,
  className,
  required = false,
  disabled = false,
  errors,
}: MultipleChoiceGridProps) => {
  // console.log(rows);
  // console.log(columns);
  // console.log(value);
  return (
    <div className={cn('space-y-4', className)}>
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full min-w-max">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="w-[200px] p-3 text-left font-medium" />
              {columns?.map(column => (
                <th key={column.id} className="p-3 text-center font-medium">
                  {column.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows?.map(row => (
              <tr key={row.id} className="border-b last:border-b-0 hover:bg-gray-50">
                <td className="p-3 font-medium">
                  {row.text}
                  {required && <span className="text-red-500">*</span>}
                </td>
                {columns.map(column => (
                  <td key={column.id} className="p-3 text-center">
                    <RadioGroup
                      value={value?.[row?.id] || ''}
                      onValueChange={value => {
                        onChange(row.id, value);
                      }}
                      disabled={disabled}
                      className="flex justify-center"
                    >
                      <RadioGroupItem value={column.id} id={`${row.id}-${column.id}`} />
                    </RadioGroup>
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
              {rows.find(r => r.id === rowId)?.text}: {errorMessage}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

MultipleChoiceGrid.displayName = 'MultipleChoiceGrid';
