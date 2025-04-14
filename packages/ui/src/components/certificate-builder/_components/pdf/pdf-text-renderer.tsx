import type { ICertificateData, ICertificateElement, ICertificateTextElement } from '@oe/api';
import { Text } from '@react-pdf/renderer';
import { getElementPosition, interpolateContent } from '../../utils';

export const PDFTextRenderer = ({
  element,
  data,
}: {
  element: ICertificateTextElement;
  data?: ICertificateData;
}) => {
  if (!element.content) {
    return null;
  }

  return (
    <Text
      style={{
        fontSize: element.styles?.fontSize,
        fontFamily: element.styles?.fontFamily,
        color: element.styles?.color,
        fontWeight: element.styles?.bold ? 'bold' : 'normal',
        fontStyle: element.styles?.italic ? 'italic' : 'normal',
        textDecoration: element.styles?.underline ? 'underline' : 'none',
        textAlign: element.styles?.align || 'left',
        position: 'absolute',
        ...getElementPosition(element as ICertificateElement),
      }}
      render={() => interpolateContent(element.content ?? '', data)}
    />
  );
};
