import type { ThemeFieldConfig, ThemeFieldValue } from '@oe/themes/types/theme-page';

import { Card } from '@oe/ui/shadcn/card';
import { Label } from '@oe/ui/shadcn/label';

import { ChevronDown, ChevronRight } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import {
  ThemePageSettingArrayField,
  ThemePageSettingField,
  type ThemePageSettingObjectFieldProps,
  getFieldType,
} from './index';

export const ThemePageSettingObjectField: React.FC<ThemePageSettingObjectFieldProps> = ({
  label,
  value,
  onChange,
  path,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFieldChange = (key: string, newValue: ThemeFieldValue | ThemeFieldConfig | ThemeFieldConfig[]) => {
    onChange({
      ...value,
      [key]: newValue,
    });
  };

  return (
    <div className="space-y-2">
      <Card
        className="flex cursor-pointer items-center gap-2 rounded-none border-0 shadow-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        <Label className="font-medium capitalize">{label}</Label>
      </Card>

      {isExpanded && (
        <div className="ml-4 space-y-4 border-border border-l-2 pl-4">
          {Object.entries(value).map(([key, fieldValue]) => {
            const fieldType = getFieldType(fieldValue);

            if (fieldType === 'object') {
              return (
                <ThemePageSettingObjectField
                  key={key}
                  label={key}
                  value={fieldValue as ThemeFieldConfig}
                  onChange={newValue => handleFieldChange(key, newValue)}
                  path={[...path, key]}
                />
              );
            }

            if (fieldType === 'array') {
              return (
                <ThemePageSettingArrayField
                  key={key}
                  label={key}
                  path={[...path, key]}
                  value={fieldValue as Array<ThemeFieldValue | ThemeFieldConfig>}
                  onChange={newValue => handleFieldChange(key, newValue as ThemeFieldConfig | ThemeFieldConfig[])}
                  onAdd={newValue => handleFieldChange(key, newValue as ThemeFieldConfig | ThemeFieldConfig[])}
                  onRemove={newValue => handleFieldChange(key, newValue as ThemeFieldConfig | ThemeFieldConfig[])}
                />
              );
            }

            return (
              <ThemePageSettingField
                key={key}
                label={key}
                value={fieldValue as ThemeFieldValue}
                onChange={newValue => handleFieldChange(key, newValue)}
                type={
                  fieldType === 'text' ||
                  fieldType === 'number' ||
                  fieldType === 'boolean' ||
                  fieldType === 'file' ||
                  fieldType === 'link'
                    ? fieldType
                    : 'text'
                }
                path={[...path, key]}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
