import type { FC } from 'react';
import GradientPicker, { useColorPicker } from 'react-best-gradient-color-picker';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';
import { cn } from '#utils/cn';

interface GradientColorPickerProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

export const GradientColorPicker: FC<GradientColorPickerProps> = ({ className, value, onChange }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className={cn('h-10 w-10 cursor-pointer rounded border', className)} style={{ background: value }} />
      </PopoverTrigger>
      <PopoverContent className="scrollbar h-[400px] w-[320px] overflow-y-auto overflow-x-hidden bg-foreground p-2">
        <GradientPicker value={value} onChange={onChange} width={294} />
      </PopoverContent>
    </Popover>
  );
};

export const useGradientColorPicker = (value: string, onChange: (value: string) => void) => {
  const { getGradientObject } = useColorPicker(value, newColor => {
    onChange(newColor);
  });

  return { getGradientObject };
};
