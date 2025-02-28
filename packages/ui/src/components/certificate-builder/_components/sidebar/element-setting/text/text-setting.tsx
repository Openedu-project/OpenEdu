import type { ICertificateElement, ICertificateTextElement } from '@oe/api/types/certificate';
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

export const TextSetting = ({
  selectedElement,
  updateElement,
}: {
  selectedElement?: ICertificateElement;
  updateElement: (id: string, updates: Partial<ICertificateElement>) => void;
}) => {
  const tCertificate = useTranslations('certificate');
  const element = selectedElement as ICertificateTextElement;

  const handleUpdateStyles = (updates: Record<string, unknown>) => {
    updateElement(selectedElement?.id ?? '', {
      ...element,
      styles: {
        ...element.styles,
        ...updates,
      },
    });
  };

  return (
    <>
      <SettingSection
        translationKey="builder.settings.content"
        infoText={tCertificate('builder.settings.contentInfo', {
          learner_name: '{{learner_name}}',
          course_name: '{{course_name}}',
          issue_date: '{{issue_date}}',
        })}
      >
        <Input
          value={element.content}
          onChange={e =>
            updateElement(selectedElement?.id ?? '', {
              ...element,
              content: e.target.value,
            })
          }
          placeholder={tCertificate('builder.settings.text')}
        />
      </SettingSection>

      <SettingSection translationKey="builder.elements.text.elementTitle">
        <ElementAlignmentSetting selectedElement={selectedElement} updateElement={updateElement} />

        {/* <SettingSection translationKey="builder.settings.font"> */}
        <FontSetting
          value={element.styles?.fontFamily ?? ''}
          onChange={value => handleUpdateStyles({ fontFamily: value })}
        />

        <SettingField translationKey="builder.settings.fontSize">
          <Input
            type="number"
            value={element.styles?.fontSize}
            onChange={e => handleUpdateStyles({ fontSize: Number(e.target.value) })}
          />
        </SettingField>
        {/* </SettingSection> */}

        {/* <SettingSection translationKey="builder.settings.appearance"> */}
        <ColorPickerSetting
          value={element.styles?.color ?? '#000000'}
          onChange={value => handleUpdateStyles({ color: value })}
        />

        <FontStyleSetting
          bold={element.styles?.bold}
          italic={element.styles?.italic}
          underline={element.styles?.underline}
          onChange={styles => handleUpdateStyles(styles)}
        />

        <AlignmentSetting value={element.styles?.align} onChange={value => handleUpdateStyles({ align: value })} />
        {/* </SettingSection> */}
      </SettingSection>
    </>
  );
};
