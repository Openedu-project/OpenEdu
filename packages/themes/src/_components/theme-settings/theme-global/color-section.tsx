import { Button } from '@oe/ui/shadcn/button';
import { Label } from '@oe/ui/shadcn/label';
import { memo } from 'react';

interface ColorSectionProps {
  title: string;
  colors: string[];
  columns?: number;
  onColorSelect: (color: string) => void;
}

const ColorSection = memo(({ title, colors, columns, onColorSelect }: ColorSectionProps) => (
  <div>
    <Label className="mb-2 block font-medium text-sm">{title}</Label>
    <div className={`grid grid-cols-6 grid-cols-${columns} gap-2`}>
      {colors.map(color => (
        <Button
          key={color}
          className="h-8 w-fit rounded border transition-transform hover:scale-110"
          style={{ backgroundColor: `hsl(${color})` }}
          onClick={() => onColorSelect(color)}
        />
      ))}
    </div>
  </div>
));

ColorSection.displayName = 'ColorSection';
export { ColorSection };
