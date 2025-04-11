import type { ICertificateElement, ICertificateOrganizationElement } from '@oe/api';
import { useTranslations } from 'next-intl';
import { Selectbox } from '#components/selectbox';
import { Input } from '#shadcn/input';
import { Switch } from '#shadcn/switch';
import {
  AlignmentSetting,
  ColorPickerSetting,
  ElementAlignmentSetting,
  FontSetting,
  FontStyleSetting,
  SettingField,
  SettingSection,
} from '../common';

export const OrganizationSetting = ({
  selectedElement,
  updateElement,
}: {
  selectedElement?: ICertificateElement;
  updateElement: (id: string, updates: Partial<ICertificateElement>) => void;
}) => {
  const element = selectedElement as ICertificateOrganizationElement;
  const tCertificate = useTranslations('certificate');

  return (
    <>
      <SettingSection translationKey="builder.elements.organization.title">
        <SettingField translationKey="builder.settings.display">
          <Selectbox
            options={[
              {
                id: 'horizontal',
                value: 'horizontal',
                label: tCertificate('builder.settings.horizontal'),
              },
              {
                id: 'vertical',
                value: 'vertical',
                label: tCertificate('builder.settings.vertical'),
              },
            ]}
            value={element?.orientation}
            onChange={value =>
              updateElement(selectedElement?.id ?? '', {
                ...element,
                orientation: value as 'horizontal' | 'vertical',
              })
            }
          />
        </SettingField>

        <ElementAlignmentSetting selectedElement={selectedElement} updateElement={updateElement} />

        <div className="mt-2 flex items-center gap-2">
          <Switch
            checked={element?.showName}
            onCheckedChange={checked =>
              updateElement(selectedElement?.id ?? '', {
                ...element,
                showName: checked,
              })
            }
          />
          <p className="mb-1 block text-sm">{tCertificate('builder.settings.showName')}</p>
        </div>
      </SettingSection>

      <SettingSection translationKey="builder.settings.logoDimensions">
        <div className="flex gap-2">
          <SettingField translationKey="builder.settings.width">
            <Input
              id="width"
              type="number"
              value={element?.logoStyles?.width ?? 100}
              onChange={e =>
                updateElement(selectedElement?.id ?? '', {
                  ...element,
                  logoStyles: {
                    ...element.logoStyles,
                    width: Number(e.target.value),
                  },
                })
              }
            />
          </SettingField>

          <SettingField translationKey="builder.settings.height">
            <Input
              id="height"
              type="number"
              value={element?.logoStyles?.height ?? 100}
              onChange={e =>
                updateElement(selectedElement?.id ?? '', {
                  ...element,
                  logoStyles: {
                    ...element.logoStyles,
                    height: Number(e.target.value),
                  },
                })
              }
            />
          </SettingField>
        </div>
      </SettingSection>

      <SettingSection translationKey="builder.settings.nameStyles">
        <SettingField translationKey="builder.settings.fontSize">
          <Input
            type="number"
            value={element?.nameStyles?.fontSize}
            onChange={e =>
              updateElement(selectedElement?.id ?? '', {
                ...element,
                nameStyles: {
                  ...element.nameStyles,
                  fontSize: Number(e.target.value),
                },
              })
            }
          />
        </SettingField>

        <FontSetting
          value={element?.nameStyles?.fontFamily ?? ''}
          onChange={value =>
            updateElement(selectedElement?.id ?? '', {
              ...element,
              nameStyles: {
                ...element.nameStyles,
                fontFamily: value,
              },
            })
          }
        />

        <ColorPickerSetting
          value={element?.nameStyles?.color ?? '#000000'}
          onChange={value =>
            updateElement(selectedElement?.id ?? '', {
              ...element,
              nameStyles: {
                ...element.nameStyles,
                color: value,
              },
            })
          }
        />

        <FontStyleSetting
          bold={element?.nameStyles?.bold}
          italic={element?.nameStyles?.italic}
          underline={element?.nameStyles?.underline}
          onChange={styles =>
            updateElement(selectedElement?.id ?? '', {
              ...element,
              nameStyles: {
                ...element.nameStyles,
                ...styles,
              },
            })
          }
        />

        <AlignmentSetting
          value={element?.nameStyles?.align}
          onChange={value =>
            updateElement(selectedElement?.id ?? '', {
              ...element,
              nameStyles: {
                ...element.nameStyles,
                align: value as 'left' | 'center' | 'right',
              },
            })
          }
        />
      </SettingSection>
    </>
  );
};
