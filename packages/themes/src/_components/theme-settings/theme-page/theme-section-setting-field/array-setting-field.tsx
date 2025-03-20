import { CRUDTranslationByKey } from '@oe/api/services/i18n';
import type { ThemeFieldConfig, ThemeFieldValue } from '@oe/themes/types';
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
  onAdd,
  onRemove,
}) => {
  const handleAdd = async () => {
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

      Object.entries(newObject).map(async ([key, val]) => {
        const valType = getFieldType(val);

        // Create the new translate key
        if (valType === 'text') {
          const res = await CRUDTranslationByKey([...path, `${label}-${value.length}`, key], '');
          console.log(res);
        }
      });

      //TODO: fetch data instead of adding the value directly
      onChange([...value, newObject]);

      //TODO: add empty item
      onAdd([...value, newObject]);
    } else {
      //TODO: fetch data instead of adding the value directly
      onChange([...value, getInitialValue(fieldType) as ThemeFieldValue | ThemeFieldConfig]);
      onAdd([...value, getInitialValue(fieldType) as ThemeFieldValue | ThemeFieldConfig]);

      if (getFieldType(value) === 'text') {
        const res = await CRUDTranslationByKey([...path, `${label}-${value.length}`], '');
        console.log(res);
      }
    }
  };

  const handleRemove = (index: number) => {
    //TODO
    onChange(value.filter((_, i) => i !== index));
    onRemove(value.filter((_, i) => i !== index));
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
                  renderItem(item, index, newValue => handleItemChange(index, newValue), [...path, `${label}-${index}`])
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
                    // type={
                    //   itemType === 'text' || itemType === 'number' || itemType === 'boolean' || itemType === 'file'
                    //     ? itemType
                    //     : 'text'
                    // }
                    type={itemType}
                    path={[...path, `${label}-${index.toString()}`]}
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
