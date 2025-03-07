import type { ICertificateData, ICertificateElement, ICertificateSignatureElement } from '@oe/api/types/certificate';
import { Image, Text, View } from '@react-pdf/renderer';
import { getElementPosition } from '../../utils';

export const PDFSignatureRenderer = ({
  element,
  data,
  showPlaceholder = false,
}: {
  element?: ICertificateSignatureElement;
  data?: ICertificateData;
  showPlaceholder?: boolean;
}) => {
  const signatureContent = data?.signatures?.[element?.order ?? 0];
  const signatureImage = signatureContent?.signature?.url;
  if (!signatureContent) {
    return null;
  }
  return (
    <View
      style={{
        position: 'absolute',
        ...getElementPosition(element as ICertificateElement),
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: getJustifyContent(element),
        alignItems: 'center',
        justifyContent: 'flex-end',
        textAlign: 'center',
      }}
    >
      {/* <View> */}
      {signatureImage ? (
        <Image
          src={signatureImage}
          style={{
            objectFit: 'contain',
            width: 200,
            height: 50,
          }}
        />
      ) : (
        <Text
          style={{
            fontWeight: element?.signatureStyles?.bold ? 'bold' : 'normal',
            fontStyle: element?.signatureStyles?.italic ? 'italic' : 'normal',
            textDecoration: element?.signatureStyles?.underline ? 'underline' : 'none',
            fontSize: element?.signatureStyles?.fontSize,
            color: element?.signatureStyles?.color,
            fontFamily: element?.signatureStyles?.fontFamily,
            // width: '100%',
          }}
        >
          {signatureContent?.creator_name ?? (showPlaceholder && 'Educator Name')}
        </Text>
      )}
      {/* </View> */}
      {((signatureImage || signatureContent?.creator_name) && signatureContent?.position) || showPlaceholder ? (
        <View
          style={{
            height: element?.lineStyles?.height ?? 1,
            width: '100%',
            backgroundColor: '#e2e8f0',
            marginTop: 4,
            marginBottom: 4,
          }}
        />
      ) : null}

      <Text
        style={{
          fontSize: element?.positionStyles?.fontSize ?? 12,
          fontFamily: element?.positionStyles?.fontFamily,
          color: element?.positionStyles?.color ?? '#64748b',
          fontWeight: element?.positionStyles?.bold ? 'bold' : 'normal',
          fontStyle: element?.positionStyles?.italic ? 'italic' : 'normal',
          textDecoration: element?.positionStyles?.underline ? 'underline' : 'none',
          // width: '100%',
        }}
      >
        {signatureContent?.position ?? (showPlaceholder && 'Position')}
      </Text>
    </View>
  );
};
