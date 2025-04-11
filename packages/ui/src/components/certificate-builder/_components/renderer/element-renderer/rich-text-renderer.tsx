import type { ICertificateData } from '@oe/api';

import type { ICertificateRichTextElement } from '@oe/api';
import { RichTextRenderer } from '#components/rich-text';
import { interpolateContent } from '../../../utils';

export const RichTextCertificateRenderer = ({
  element,
  data,
}: {
  element?: ICertificateRichTextElement;
  data?: ICertificateData;
}) => {
  return (
    <RichTextRenderer
      style={{
        width: element?.styles?.width ?? 200,
        height: element?.styles?.height ?? 100,
        fontSize: 14,
      }}
      content={interpolateContent(element?.content ?? '', data)}
    />
  );
};
