import type { ICertificateData, ICertificateElement, ICertificateRichTextElement } from '@oe/api/types/certificate';
import { View } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { getElementPosition, interpolateContent } from '../../utils';

export const PDFRichTextRenderer = ({
  element,
  data,
}: {
  element: ICertificateRichTextElement;
  data?: ICertificateData;
}) => {
  if (!element.content) {
    return null;
  }

  let html = element.content?.replace(/<p><\/p>/g, '<br>');
  html = interpolateContent(html ?? '', data);

  const styles = {
    container: {
      position: 'absolute' as const,
      ...getElementPosition(element as ICertificateElement),
      width: element.styles?.width || 'auto',
      height: element.styles?.height || 'auto',
      fontSize: 14,
      fontFamily: 'Inter',
    },
    p: {
      margin: 0,
      lineHeight: 1.625,
    },
    strong: {
      fontWeight: '700',
    },
    em: {
      fontStyle: 'italic',
    },
  };

  return (
    <View key={element.id} style={styles.container}>
      <Html stylesheet={styles}>{html}</Html>
    </View>
  );
};
