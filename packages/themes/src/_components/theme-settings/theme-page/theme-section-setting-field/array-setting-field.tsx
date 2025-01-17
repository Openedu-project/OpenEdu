import type { ThemeFieldConfig, ThemeFieldValue } from '@oe/themes/types/theme-page';
import { Button } from '@oe/ui/shadcn/button';
import { Label } from '@oe/ui/shadcn/label';
import { cn } from '@oe/ui/utils/cn';
import { Plus, Trash2 } from 'lucide-react';
import type React from 'react';
import {
  type ThemePageSettingArrayFieldProps,
  ThemePageSettingField,
  ThemePageSettingObjectField,
  getFieldType,
  getInitialValue,
} from './index';

export const ThemePageSettingArrayField: React.FC<ThemePageSettingArrayFieldProps> = ({
  label,
  value,
  onChange,
  path,
  renderItem,
}) => {
  const handleAdd = () => {
    const templateValue = value[0];
    const fieldType = getFieldType(templateValue);

    if (fieldType === 'object') {
      // Clone the first object's structure with initial values
      const template = templateValue as ThemeFieldConfig;
      const newObject = Object.fromEntries(
        Object.entries(template).map(([key, val]) => {
          const valType = getFieldType(val);
          return [key, getInitialValue(valType)];
        })
      );
      onChange([...value, newObject]);
    } else {
      onChange([...value, getInitialValue(fieldType) as ThemeFieldValue | ThemeFieldConfig]);
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, newValue: ThemeFieldValue | ThemeFieldConfig) => {
    const newArray = [...value];
    newArray[index] = newValue;
    onChange(newArray);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="font-medium text-sm capitalize">{label}</Label>
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={handleAdd}
          className="h-8 px-2"
          disabled={value.length === 0} // Disable if no template item exists
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {value.map((item, index) => {
          const itemType = getFieldType(item);

          return (
            <div key={`${label}-${index.toString()}`} className={cn('ml-1 flex items-center gap-1')}>
              <div className="flex-1">
                {renderItem ? (
                  renderItem(item, index, newValue => handleItemChange(index, newValue), [...path, index.toString()])
                ) : itemType === 'object' ? (
                  <ThemePageSettingObjectField
                    label={`${label}-${index}`}
                    value={item as ThemeFieldConfig}
                    onChange={newValue => handleItemChange(index, newValue)}
                    path={[...path, `${label}-${index}`]}
                  />
                ) : (
                  <ThemePageSettingField
                    label={`${label}-${index}`}
                    value={item as ThemeFieldValue}
                    onChange={newValue => handleItemChange(index, newValue)}
                    type={
                      itemType === 'text' || itemType === 'number' || itemType === 'boolean' || itemType === 'file'
                        ? itemType
                        : 'text'
                    }
                    path={[...path, `${label}-${index}`]}
                  />
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(index)}
                className="h-8 px-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
