import type { ICertificateData, ICertificateElement, ICertificateOrganizationElement } from '@oe/api/types/certificate';
import { Image, Text, View } from '@react-pdf/renderer';
import { getElementPosition, getJustifyContent } from '../../utils';

export const PDFOrganizationRenderer = ({
  element,
  data,
}: {
  element?: ICertificateOrganizationElement;
  data?: ICertificateData;
}) => {
  const organizationContent = data?.organizations?.[element?.order ?? 0];

  if (!organizationContent) {
    return null;
  }

  return (
    <View
      style={{
        position: 'absolute',
        ...getElementPosition(element as ICertificateElement),
        width: element?.styles?.width || 'auto',
        height: element?.styles?.height || 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: getJustifyContent(element),
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: element?.orientation === 'vertical' ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {element?.styles?.align === 'right' && element?.showName && (
          <Text
            style={{
              fontSize: element?.nameStyles?.fontSize ?? 14,
              fontFamily: element?.nameStyles?.fontFamily,
              color: element?.nameStyles?.color ?? '#64748b',
              fontWeight: element?.nameStyles?.bold ? 'bold' : 'normal',
              fontStyle: element?.nameStyles?.italic ? 'italic' : 'normal',
              textDecoration: element?.nameStyles?.underline ? 'underline' : 'none',
              marginRight: element?.orientation === 'horizontal' ? 10 : 0,
              marginBottom: element?.orientation === 'vertical' ? 10 : 0,
            }}
          >
            {organizationContent?.name}
          </Text>
        )}

        <View>
          {organizationContent?.logo?.url ? (
            <Image
              // src={organizationContent.logo.url}
              src={{
                uri: `${organizationContent?.logo?.url}?cachebuster=${Date.now()}`,
                method: 'GET',
                headers: { 'Cache-Control': 'no-cache' },
              }}
              style={{
                objectFit: 'contain',
                width: element?.logoStyles?.width ?? 50,
                height: element?.logoStyles?.height ?? 50,
              }}
            />
          ) : null}
        </View>

        {element?.showName && element?.styles?.align !== 'right' && (
          <Text
            style={{
              fontSize: element?.nameStyles?.fontSize ?? 14,
              fontFamily: element?.nameStyles?.fontFamily,
              color: element?.nameStyles?.color ?? '#64748b',
              fontWeight: element?.nameStyles?.bold ? 'bold' : 'normal',
              fontStyle: element?.nameStyles?.italic ? 'italic' : 'normal',
              textDecoration: element?.nameStyles?.underline ? 'underline' : 'none',
              marginLeft: element?.orientation === 'horizontal' ? 10 : 0,
              marginTop: element?.orientation === 'vertical' ? 10 : 0,
            }}
          >
            {organizationContent?.name}
          </Text>
        )}
      </View>
    </View>
  );
};
