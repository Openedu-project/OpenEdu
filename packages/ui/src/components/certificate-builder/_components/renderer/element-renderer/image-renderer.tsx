import type { ICertificateImageElement } from '@oe/api/types/certificate';
import { useTranslations } from 'next-intl';

export const ImageRenderer = ({
  element,
  showPlaceholder = false,
}: {
  element?: ICertificateImageElement;
  showPlaceholder?: boolean;
}) => {
  const tCertificate = useTranslations('certificate');

  return (
    <div
      style={{
        width: element?.styles?.width,
        height: element?.styles?.height,
      }}
    >
      {element?.file?.url ? (
        <img src={element.file.url} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      ) : showPlaceholder ? (
        <span className="flex h-full w-full items-center justify-center rounded-md border border-muted-foreground border-dashed text-center text-muted-foreground text-sm">
          {tCertificate('builder.elements.image.title')}
        </span>
      ) : null}
    </div>
  );
};
