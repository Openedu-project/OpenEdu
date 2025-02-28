import type { ICertificateData, ICertificateElement, ICertificateTextElement } from '@oe/api/types/certificate';
import { Text, View } from '@react-pdf/renderer';
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
    <View
      key={element.id}
      style={{
        position: 'absolute',
        ...getElementPosition(element as ICertificateElement),
        width: '100%',
        height: '100%',
      }}
    >
      <Text
        style={{
          fontSize: element.styles?.fontSize,
          fontFamily: element.styles?.fontFamily,
          color: element.styles?.color,
          fontWeight: element.styles?.bold ? 'bold' : 'normal',
          fontStyle: element.styles?.italic ? 'italic' : 'normal',
          textDecoration: element.styles?.underline ? 'underline' : 'none',
          textAlign: element.styles?.align || 'left',
        }}
        render={() => interpolateContent(element.content ?? '', data)}
      />
    </View>
  );
};
