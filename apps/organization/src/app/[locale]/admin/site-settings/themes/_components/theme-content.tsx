'use client';

import { getContentConfig } from '@oe/themes/config/theme-content-config';
import type { Field } from '@oe/themes/config/theme-content-config';
import { useThemeStore } from '@oe/themes/store/useThemeStore';
import { Button } from '@oe/ui/shadcn/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@oe/ui/shadcn/card';
import { Input } from '@oe/ui/shadcn/input';
import { Label } from '@oe/ui/shadcn/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { Switch } from '@oe/ui/shadcn/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@oe/ui/shadcn/tabs';
import { Textarea } from '@oe/ui/shadcn/textarea';
import { useState } from 'react';

type FieldValue = string | number | boolean;

interface FieldComponentProps {
  field: Field;
  value: FieldValue | undefined;
  onChange: (value: FieldValue) => void;
}

const FieldComponent = ({ field, value, onChange }: FieldComponentProps) => {
  switch (field.type) {
    case 'text':
      return (
        <Input
          value={String(value ?? field.defaultValue ?? '')}
          onChange={e => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      );
    case 'textarea':
      return (
        <Textarea
          value={String(value ?? field.defaultValue ?? '')}
          onChange={e => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      );
    case 'number':
      return (
        <Input
          type="number"
          value={String(value ?? field.defaultValue ?? '')}
          onChange={e => onChange(Number(e.target.value))}
          min={field.min}
          max={field.max}
        />
      );
    case 'select':
      return (
        <Select value={String(value ?? field.defaultValue ?? '')} onValueChange={val => onChange(val)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case 'switch':
      return (
        <Switch
          checked={Boolean(value ?? field.defaultValue ?? false)}
          onCheckedChange={checked => onChange(checked)}
        />
      );
    case 'color':
      return (
        <Input
          type="color"
          value={String(value ?? field.defaultValue ?? '#000000')}
          onChange={e => onChange(e.target.value)}
          className="h-10 w-20"
        />
      );
    default:
      return null;
  }
};

export default function ThemeContent() {
  const { selectedMenu, selectedPage, selectedSettingKey } = useThemeStore();
  const [values, setValues] = useState<Record<string, FieldValue>>({});

  const config = getContentConfig(selectedMenu, selectedSettingKey || '', selectedPage);

  if (!config) {
    return (
      <div className="flex h-full items-start justify-center text-muted-foreground">
        Select a section to start customizing
      </div>
    );
  }

  const handleFieldChange = (fieldId: string, value: FieldValue) => {
    setValues(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSave = () => {
    console.log('Saving values:', values);
    // Implement save logic here
  };

  const handleReset = () => {
    setValues({});
  };

  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle>{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={config.tabs[0]?.id}>
          <TabsList>
            {config.tabs.map(tab => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {config.tabs.map(tab => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-6">
              {tab.fields.map(field => (
                <div key={field.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>{field.label}</Label>
                    <FieldComponent
                      field={field}
                      value={values[field.id]}
                      onChange={value => handleFieldChange(field.id, value)}
                    />
                  </div>
                  {field.helperText && <p className="text-muted-foreground text-sm">{field.helperText}</p>}
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
