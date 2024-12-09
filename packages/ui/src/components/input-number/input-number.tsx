import { Input, type InputProps } from '#shadcn/input';

export function InputNumber({ value, ...props }: InputProps) {
  return <Input type="number" value={Number(value ?? 0).toString()} {...props} />;
}
