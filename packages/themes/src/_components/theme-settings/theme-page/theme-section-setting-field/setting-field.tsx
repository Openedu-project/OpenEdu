import type { IFileResponse } from '@oe/api';
import { ADMIN_ROUTES } from '@oe/core';
import { type FileType, Uploader } from '@oe/ui';
import { Button } from '@oe/ui';
import { Link } from '@oe/ui';
import { Input } from '@oe/ui';
import { Label } from '@oe/ui';
import { Switch } from '@oe/ui';
import { cn } from '@oe/ui';
import { Languages } from 'lucide-react';
import type React from 'react';
// import { ADMIN_ROUTES } from '../../../../_utils/constants';
import { camelToNormal } from '../../../../_utils/function';
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
      <div className={cn('flex', type === 'text' ? 'flex-row items-center justify-between' : 'flex-col')}>
        <Label className="capitalize">{camelToNormal(label)}</Label>

        {/* TODO: add prefix "/" automatically */}
        {type === 'link' && (
          <Input
            type="text"
            value={value as string}
            onChange={e => onChange(e.target.value)}
            placeholder="/"
            className="block"
          />
        )}

        {type === 'id' && (
          <Input
            type="text"
            value={(value as string)?.replace('id-', '')}
            onChange={e => {
              const inputValue = e.target.value;
              const cleanValue = inputValue.replace('id-', '');
              onChange(`id-${cleanValue}`);
            }}
            placeholder="123"
            className="block"
          />
        )}

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
          value={(value as IFileResponse)?.url ? (value as IFileResponse) : undefined}
          onChange={file => {
            if (file) {
              onChange(file as FileType);
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
