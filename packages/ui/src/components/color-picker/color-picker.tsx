import type { ChangeEvent, FC } from 'react';
import { Input } from '#shadcn/input';
import { cn } from '#utils/cn';

interface ColorPickerProps {
  className?: string;
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: FC<ColorPickerProps> = ({ color = '#000000', onChange, className }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn('relative h-10 w-10 overflow-hidden rounded border', className)}>
      <Input
        type="color"
        value={color}
        onChange={handleChange}
        className="absolute top-[-8px] right-[-8px] h-14 w-14 p-0"
      />
    </div>
  );
};
