import type { ChangeEvent } from 'react';
import { Input, type InputProps } from '#shadcn/input';

export interface InputNumberProps extends Omit<InputProps, 'onChange'> {
  value?: number;
  onChange?: (value: number) => void;
}

export function InputNumber({ value, onChange, ...props }: InputNumberProps) {
  return (
    <Input
      type="number"
      value={Number(value ?? 0)}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(Number(e.target.value))}
      {...props}
    />
  );
}
