import type { ICertificateElement } from '@oe/api';
import { useTranslations } from 'next-intl';
import { Input } from '#shadcn/input';
import { Label } from '#shadcn/label';
import { RadioGroup, RadioGroupItem } from '#shadcn/radio-group';
import { SettingField } from './setting-field';

export const ElementAlignmentSetting = ({
  selectedElement,
  updateElement,
}: {
  selectedElement?: ICertificateElement;
  updateElement: (id: string, updates: Partial<ICertificateElement>) => void;
}) => {
  const element = selectedElement as ICertificateElement;
  const tCertificate = useTranslations('certificate');

  return (
    <>
      <SettingField translationKey="builder.settings.position">
        <RadioGroup
          value={element?.styles?.position || 'top-left'}
          onValueChange={value => {
            updateElement(selectedElement?.id ?? '', {
              ...element,
              styles: {
                ...element.styles,
                position: value as 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
                x: ['top-left', 'bottom-left'].includes(value) ? element.styles?.x || 50 : undefined,
                y: ['top-left', 'top-right'].includes(value) ? element.styles?.y || 50 : undefined,
                right: ['top-right', 'bottom-right'].includes(value) ? element.styles?.right || 50 : undefined,
                bottom: ['bottom-left', 'bottom-right'].includes(value) ? element.styles?.bottom || 50 : undefined,
              },
            });
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="top-left" id="position-top-left" />
              <Label htmlFor="position-top-left">{tCertificate('builder.settings.topLeft')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="top-right" id="position-top-right" />
              <Label htmlFor="position-top-right">{tCertificate('builder.settings.topRight')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bottom-left" id="position-bottom-left" />
              <Label htmlFor="position-bottom-left">{tCertificate('builder.settings.bottomLeft')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bottom-right" id="position-bottom-right" />
              <Label htmlFor="position-bottom-right">{tCertificate('builder.settings.bottomRight')}</Label>
            </div>
          </div>
        </RadioGroup>
      </SettingField>

      <div className="flex gap-2">
        {['top-left', 'bottom-left'].includes(element?.styles?.position || 'top-left') ? (
          <SettingField translationKey="builder.settings.left">
            <Input
              type="number"
              value={element.styles?.x || 0}
              onChange={e => {
                updateElement(selectedElement?.id ?? '', {
                  ...element,
                  styles: {
                    ...element.styles,
                    x: Number(e.target.value),
                  },
                });
              }}
            />
          </SettingField>
        ) : (
          <SettingField translationKey="builder.settings.right">
            <Input
              type="number"
              value={element.styles?.right || 0}
              onChange={e => {
                updateElement(selectedElement?.id ?? '', {
                  ...element,
                  styles: {
                    ...element.styles,
                    right: Number(e.target.value),
                  },
                });
              }}
            />
          </SettingField>
        )}

        {['top-left', 'top-right'].includes(element?.styles?.position || 'top-left') ? (
          <SettingField translationKey="builder.settings.top">
            <Input
              type="number"
              value={element.styles?.y || 0}
              onChange={e => {
                updateElement(selectedElement?.id ?? '', {
                  ...element,
                  styles: {
                    ...element.styles,
                    y: Number(e.target.value),
                  },
                });
              }}
            />
          </SettingField>
        ) : (
          <SettingField translationKey="builder.settings.bottom">
            <Input
              type="number"
              value={element.styles?.bottom || 0}
              onChange={e => {
                updateElement(selectedElement?.id ?? '', {
                  ...element,
                  styles: {
                    ...element.styles,
                    width: Number(e.target.value),
                  },
                });
              }}
            />
          </SettingField>
        )}
      </div>
    </>
  );
};
