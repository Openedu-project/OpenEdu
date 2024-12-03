import type { IFileResponse } from '@oe/api/types/file';
import { ADMIN_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { type FileType, Uploader } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { Input } from '@oe/ui/shadcn/input';
import { Label } from '@oe/ui/shadcn/label';
import { Switch } from '@oe/ui/shadcn/switch';
import { Languages } from 'lucide-react';
// biome-ignore lint/style/useImportType: <explanation>
import React from 'react';
import type { ThemePageSettingFieldProps } from '../theme-section-setting-field';

export const ThemePageSettingField: React.FC<ThemePageSettingFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  path,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="capitalize">{label}</Label>
        {type === 'text' && (
          <Button variant="outline" size="xs">
            <Link
              href={`${ADMIN_ROUTES.languageSettings}/translations?filter=key&value=${path.join('.')}&modal=true`}
              className="text-foreground/50 hover:text-primary"
            >
              <Languages className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      {/* {type === 'text' && <Input type="text" value={value as string} onChange={e => onChange(e.target.value)} />} */}

      {type === 'number' && (
        <Input type="number" value={value as number} onChange={e => onChange(Number(e.target.value))} />
      )}

      {type === 'boolean' && <Switch checked={value as boolean} onCheckedChange={checked => onChange(checked)} />}

      {type === 'file' && (
        <Uploader
          accept="image/*"
          listType="picture"
          value={(value as FileType)?.url ? [value as IFileResponse] : []}
          onChange={file => {
            if (file?.[0]) {
              onChange(file?.[0] as FileType);
            } else {
              onChange({ mime: 'image/png' } as FileType); // set empty image
            }
          }}
          fileListVisible={false}
        />
      )}
    </div>
  );
};
