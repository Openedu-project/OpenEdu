import type { ICertificateData } from '@oe/api/types/certificate';
import { cn } from '#utils/cn';

import type { ICertificateSignatureElement } from '@oe/api/types/certificate';
import { useTranslations } from 'next-intl';
import { getItemsClass } from '../../../utils';

export const SignatureRenderer = ({
  element,
  data,
  showPlaceholder = false,
}: {
  element?: ICertificateSignatureElement;
  data?: ICertificateData;
  showPlaceholder?: boolean;
}) => {
  const tCertificate = useTranslations('certificate');
  const signatureContent = data?.signatures?.[element?.order ?? 0];
  const signatureImage = signatureContent?.signature?.url;
  const itemsClass = getItemsClass(element);

  return (
    <div className={cn('flex h-full w-full flex-col justify-end text-center', itemsClass)}>
      {signatureImage ? (
        <img
          src={signatureImage}
          alt=""
          className="object-contain"
          style={{
            width: '100%',
            height: 50,
          }}
        />
      ) : (
        <p
          className={cn(
            'w-full font-medium'
            // itemsClass === "items-start" ? "text-left" : "text-right"
          )}
          style={{
            fontSize: element?.signatureStyles?.fontSize,
            color: element?.signatureStyles?.color,
            fontFamily: element?.signatureStyles?.fontFamily,
            fontWeight: element?.signatureStyles?.bold ? 'bold' : 'normal',
            fontStyle: element?.signatureStyles?.italic ? 'italic' : 'normal',
            textDecoration: element?.signatureStyles?.underline ? 'underline' : 'none',
          }}
        >
          {signatureContent?.educator_name ??
            (showPlaceholder && tCertificate('builder.elements.signature.educatorName'))}
        </p>
      )}
      {((signatureImage || signatureContent?.educator_name) && signatureContent?.position) || showPlaceholder ? (
        <div
          className="my-1 h-[2px] w-full shrink-0 bg-border"
          style={{
            height: element?.lineStyles?.height,
          }}
        />
      ) : null}
      <p
        className={cn(
          'w-full text-muted-foreground text-sm'
          // itemsClass === "items-start" ? "text-left" : "text-right"
        )}
        style={{
          fontSize: element?.positionStyles?.fontSize,
          color: element?.positionStyles?.color,
          fontFamily: element?.positionStyles?.fontFamily,
          fontWeight: element?.positionStyles?.bold ? 'bold' : 'normal',
          fontStyle: element?.positionStyles?.italic ? 'italic' : 'normal',
          textDecoration: element?.positionStyles?.underline ? 'underline' : 'none',
        }}
      >
        {signatureContent?.position ??
          (showPlaceholder &&
            tCertificate('builder.elements.signature.placeholder', {
              organizationName: window.location.hostname?.split('.')[0],
            }))}
      </p>
    </div>
  );
};
