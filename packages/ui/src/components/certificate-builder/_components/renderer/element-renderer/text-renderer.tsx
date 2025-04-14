import type { ICertificateData, ICertificateTextElement } from '@oe/api';
import { useTranslations } from 'next-intl';
import { interpolateContent } from '../../../utils';

export const TextRenderer = ({
  element,
  data,
}: {
  element?: ICertificateTextElement;
  data?: ICertificateData;
}) => {
  const tCertificate = useTranslations('certificate');
  return (
    <div
      style={{
        fontSize: element?.styles?.fontSize,
        fontFamily: element?.styles?.fontFamily,
        color: element?.styles?.color,
        fontWeight: element?.styles?.bold ? 'bold' : 'normal',
        fontStyle: element?.styles?.italic ? 'italic' : 'normal',
        textDecoration: element?.styles?.underline ? 'underline' : 'none',
        textAlign: element?.styles?.align || 'left',
        width: '100%',
        height: '100%',
      }}
    >
      {interpolateContent(element?.content || tCertificate('builder.elements.text.title'), data)}
    </div>
  );
};
