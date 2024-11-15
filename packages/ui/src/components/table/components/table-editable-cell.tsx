import type { CellContext, Row } from '@tanstack/react-table';
import { type ChangeEvent, type InputHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { Input } from '#shadcn/input';
import { Textarea } from '#shadcn/textarea';

export function TableEditableCell<TData>({
  getValue,
  row,
  column,
  table,
  textarea,
  cell,
  renderValue,
  onUpdate,
  ...props
}: CellContext<TData, unknown> &
  Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'renderValue'> & {
    textarea?: boolean;
    onUpdate?: (row: Row<TData>, value: string) => void;
  }) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const Component = textarea ? Textarea : Input;

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = useCallback(() => {
    if (value !== initialValue) {
      const updatedValue = value as string;
      table.options.meta?.updateData(row.index, column.id, updatedValue as TData);
      onUpdate?.(row, updatedValue);
    }
  }, [value, initialValue, row, column.id, table.options.meta, onUpdate]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (row.original as any)[column.id] = e.target.value;
    },
    [column.id, row.original]
  );

  return <Component value={(value as string | number) ?? ''} onChange={handleChange} onBlur={onBlur} {...props} />;
}
