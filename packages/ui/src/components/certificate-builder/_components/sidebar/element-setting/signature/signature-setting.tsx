import type { ICertificateElement, ICertificateSignatureElement } from '@oe/api/types/certificate';
import { useTranslations } from 'next-intl';
import { Input } from '#shadcn/input';
import {
  AlignmentSetting,
  ColorPickerSetting,
  ElementAlignmentSetting,
  FontSetting,
  FontStyleSetting,
  SettingField,
  SettingSection,
} from '../common';

// Component cho phần cài đặt font
const FontStyleSettings = ({
  title,
  styleKey,
  selectedElement,
  updateElement,
  translationKey,
}: {
  title: string;
  styleKey: 'signatureStyles' | 'positionStyles';
  selectedElement?: ICertificateElement;
  updateElement: (id: string, updates: Partial<ICertificateElement>) => void;
  translationKey?: string;
}) => {
  const element = selectedElement as ICertificateSignatureElement;
  const styles = element?.[styleKey];

  return (
    <SettingSection title={title} translationKey={translationKey}>
      <SettingField translationKey="builder.settings.fontSize">
        <Input
          type="number"
          value={styles?.fontSize}
          onChange={e =>
            updateElement(selectedElement?.id ?? '', {
              ...element,
              [styleKey]: {
                ...element[styleKey],
                fontSize: Number(e.target.value),
              },
            })
          }
        />
      </SettingField>

      <FontSetting
        value={styles?.fontFamily ?? ''}
        onChange={value =>
          updateElement(selectedElement?.id ?? '', {
            ...element,
            [styleKey]: {
              ...element[styleKey],
              fontFamily: value,
            },
          })
        }
      />

      <ColorPickerSetting
        value={styles?.color ?? '#000000'}
        onChange={value =>
          updateElement(selectedElement?.id ?? '', {
            ...element,
            [styleKey]: {
              ...element[styleKey],
              color: value,
            },
          })
        }
      />

      <FontStyleSetting
        bold={styles?.bold}
        italic={styles?.italic}
        underline={styles?.underline}
        onChange={fontStyles =>
          updateElement(selectedElement?.id ?? '', {
            ...element,
            [styleKey]: {
              ...element[styleKey],
              ...fontStyles,
            },
          })
        }
      />

      {styleKey === 'positionStyles' && (
        <AlignmentSetting
          value={styles?.align}
          onChange={value =>
            updateElement(selectedElement?.id ?? '', {
              ...element,
              [styleKey]: {
                ...element[styleKey],
                align: value as 'left' | 'center' | 'right',
              },
            })
          }
        />
      )}
    </SettingSection>
  );
};

export const SignatureSetting = ({
  selectedElement,
  updateElement,
}: {
  selectedElement?: ICertificateElement;
  updateElement: (id: string, updates: Partial<ICertificateElement>) => void;
}) => {
  const element = selectedElement as ICertificateSignatureElement;
  const tCertificate = useTranslations('certificate');

  return (
    <>
      <SettingSection translationKey="builder.elements.signature.elementTitle">
        <ElementAlignmentSetting selectedElement={selectedElement} updateElement={updateElement} />
      </SettingSection>

      <FontStyleSettings
        title={tCertificate('builder.settings.signatureStyles')}
        styleKey="signatureStyles"
        selectedElement={selectedElement}
        updateElement={updateElement}
        translationKey="builder.settings.signatureStyles"
      />

      <FontStyleSettings
        title={tCertificate('builder.settings.positionTextStyles')}
        styleKey="positionStyles"
        selectedElement={selectedElement}
        updateElement={updateElement}
        translationKey="builder.settings.positionTextStyles"
      />

      <SettingSection translationKey="builder.settings.lineStyles">
        <SettingField translationKey="builder.settings.lineHeight">
          <Input
            type="number"
            value={element?.lineStyles?.height}
            onChange={e =>
              updateElement(selectedElement?.id ?? '', {
                ...element,
                lineStyles: {
                  ...element.lineStyles,
                  height: Number(e.target.value),
                },
              })
            }
          />
        </SettingField>

        <ColorPickerSetting
          translationKey="builder.settings.lineColor"
          value={element?.lineStyles?.backgroundColor ?? '#000000'}
          onChange={value =>
            updateElement(selectedElement?.id ?? '', {
              ...element,
              lineStyles: {
                ...element.lineStyles,
                backgroundColor: value,
              },
            })
          }
        />
      </SettingSection>
    </>
  );
};
