import type { ICertificateData, ICertificateOrganizationElement } from '@oe/api/types/certificate';
import { useTranslations } from 'next-intl';
import { cn } from '#utils/cn';
import { getJustifyClass } from '../../../utils';

export const OrganizationRenderer = ({
  element,
  data,
  showPlaceholder = false,
}: {
  element?: ICertificateOrganizationElement;
  data?: ICertificateData;
  showPlaceholder?: boolean;
}) => {
  const tCertificate = useTranslations('certificate');

  const organization = data?.organizations?.[element?.order ?? 0];
  const logo = organization?.logo?.url;
  return (
    <div
      className={cn(
        'flex h-full w-full items-center gap-2',
        element?.orientation === 'horizontal' && 'flex-row',
        element?.orientation === 'vertical' && 'flex-col',
        getJustifyClass(element)
      )}
      style={{
        width: '100%',
      }}
    >
      {element?.styles?.align === 'right' && element?.showName && (
        <p
          className="flex-1 text-muted-foreground text-sm"
          style={{
            fontSize: element?.nameStyles?.fontSize,
            fontFamily: element?.nameStyles?.fontFamily,
            color: element?.nameStyles?.color,
            fontWeight: element?.nameStyles?.bold ? 'bold' : 'normal',
            fontStyle: element?.nameStyles?.italic ? 'italic' : 'normal',
            textDecoration: element?.nameStyles?.underline ? 'underline' : 'none',
          }}
        >
          {organization?.name ?? (showPlaceholder && tCertificate('builder.elements.organization.name'))}
        </p>
      )}
      {logo ? (
        <img
          src={logo}
          alt=""
          className="shrink-0 object-contain"
          style={{
            width: element?.logoStyles?.width ?? 50,
            height: element?.logoStyles?.height ?? 50,
          }}
        />
      ) : showPlaceholder ? (
        <span
          className="flex shrink-0 items-center justify-center rounded-md border border-muted-foreground border-dashed text-muted-foreground text-sm"
          style={{
            width: element?.logoStyles?.width ?? 50,
            height: element?.logoStyles?.height ?? 50,
          }}
        >
          {tCertificate('builder.elements.organization.logo')}
        </span>
      ) : null}
      {element?.showName && element?.styles?.align !== 'right' && (
        <p
          className="flex-1 text-muted-foreground text-sm"
          style={{
            fontSize: element?.nameStyles?.fontSize,
            fontFamily: element?.nameStyles?.fontFamily,
            color: element?.nameStyles?.color,
            fontWeight: element?.nameStyles?.bold ? 'bold' : 'normal',
            fontStyle: element?.nameStyles?.italic ? 'italic' : 'normal',
            textDecoration: element?.nameStyles?.underline ? 'underline' : 'none',
          }}
        >
          {organization?.name ?? (showPlaceholder && tCertificate('builder.elements.organization.name'))}
        </p>
      )}
    </div>
  );
};
