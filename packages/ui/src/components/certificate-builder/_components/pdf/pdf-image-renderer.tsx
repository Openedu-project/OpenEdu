import type { ICertificateElement, ICertificateImageElement } from '@oe/api';
import { Image, View } from '@react-pdf/renderer';
import { getElementPosition } from '../../utils';

export const PDFImageRenderer = ({
  element,
}: {
  element: ICertificateImageElement;
}) => {
  return (
    <>
      {element.file?.url ? (
        <View
          style={{
            position: 'absolute',
            ...getElementPosition(element as ICertificateElement),
            width: element.styles?.width || '100%',
            height: element.styles?.height || '100%',
          }}
        >
          <Image
            src={element.file.url}
            style={{
              objectFit: 'contain',
              // position: "absolute",
              // left: element.styles?.x,
              // top: element.styles?.y,
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      ) : null}
    </>
  );
};
