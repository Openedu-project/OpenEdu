import { Input } from '@oe/ui/shadcn/input';
import { Label } from '@oe/ui/shadcn/label';
import { ScrollArea } from '@oe/ui/shadcn/scroll-area';
// biome-ignore lint/style/useImportType: <explanation>
import React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { colorPalette } from './_constants';
import { hexToHsl } from './_utils';
import { ColorSection } from './color-section';
interface ColorPickerProps {
  onColorSelect: (color: string) => void;
  defaultColor?: string;
}

const SECTION_CONFIGS = {
  primary: { columns: 6 },
  secondary: { columns: 6 },
  grays: { columns: 6 },
  blues: { columns: 5 },
  warnings: { columns: 5 },
  success: { columns: 5 },
  info: { columns: 5 },
  reds: { columns: 5 },
  greens: { columns: 5 },
} as const;

export const ColorPicker = ({ onColorSelect, defaultColor = '#ffffff' }: ColorPickerProps) => {
  const [hexColor, setHexColor] = useState(defaultColor);

  const handleHexColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const hex = e.target.value;
      setHexColor(hex);
      // convert hex to HSL
      const hsl = hexToHsl(hex);
      if (hsl) {
        onColorSelect(hsl);
      }
    },
    [onColorSelect]
  );

  const colorSections = useMemo(() => {
    return Object.entries(colorPalette).map(([category, colors]) => ({
      title: category,
      colors,
      columns: SECTION_CONFIGS[category as keyof typeof SECTION_CONFIGS].columns,
    }));
  }, []);

  return (
    <div className="w-full p-2">
      <ScrollArea>
        <div className="h-[500px] space-y-4">
          <div>
            <Label className="col-span-2 mb-2 block font-medium text-sm">Select</Label>
            <div className="flex gap-4">
              <Input
                type="color"
                value={hexColor}
                onChange={handleHexColorChange}
                className="h-12 w-full cursor-pointer p-1 focus:border-1"
              />
              <Input
                type="text"
                value={hexColor}
                onChange={handleHexColorChange}
                className="h-12 p-1"
                placeholder="#000000"
              />
            </div>
          </div>

          {colorSections.map(({ title, colors, columns }) => (
            <ColorSection key={title} title={title} colors={colors} columns={columns} onColorSelect={onColorSelect} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ColorPicker;
