import type { ICertificateElement, ICertificateRichTextElement } from '@oe/api/types/certificate';
import { useTranslations } from 'next-intl';
import { RichTextEditor } from '#components/rich-text';
import { fonts } from '../../../../utils';
import { ElementAlignmentSetting, SettingSection } from '../common';

export const RichTextSetting = ({
  selectedElement,
  updateElement,
}: {
  selectedElement?: ICertificateElement;
  updateElement: (id: string, updates: Partial<ICertificateElement>) => void;
}) => {
  const element = selectedElement as ICertificateRichTextElement;
  const tCertificate = useTranslations('certificate');

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
        <RichTextEditor
          value={element.content}
          menuBarItems={[
            '-strikethrough',
            '-codeBlock',
            '-quote',
            '-list',
            '-listOrdered',
            '-taskList',
            '-imagePopover',
            '-videoPopover',
            '-linkPopover',
            '-aiGenerate',
            '-heading',
            '-table',
          ]}
          floatingMenuItems={[
            '-list',
            '-listOrdered',
            '-quote',
            '-codeBlock',
            '-taskList',
            '-imagePopover',
            '-videoPopover',
            '-horizontalRule',
            '-hardBreak',
            '-table',
            'bold',
            'italic',
            'underline',
            'alignLeft',
            'alignCenter',
            'alignRight',
            'alignJustify',
          ]}
          bubbleMenuItems={[
            'bold',
            'italic',
            'underline',
            'alignLeft',
            'alignCenter',
            'alignRight',
            'alignJustify',
            'textColor',
            'highlight',
            '-strikethrough',
            '-linkPopover',
          ]}
          fonts={fonts.map(font => ({
            name: font.name,
            family: font.family,
            weights: font.weights,
            value: font.family,
          }))}
          onChange={value => {
            updateElement(selectedElement?.id ?? '', {
              ...element,
              content: value,
            });
          }}
          className="min-h-[100px]"
          placeholder={tCertificate('builder.settings.enterContent')}
        />
      </SettingSection>
      <SettingSection translationKey="builder.elements.richText.elementTitle">
        <ElementAlignmentSetting selectedElement={selectedElement} updateElement={updateElement} />
      </SettingSection>
    </>
  );
};
