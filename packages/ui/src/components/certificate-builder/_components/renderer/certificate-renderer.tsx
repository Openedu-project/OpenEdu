'use client';

import type { ICertificateData, ICertificateTemplate } from '@oe/api/types/certificate';
import { getElementPosition } from '../../utils';
import { ElementRenderer } from './element-renderer';

interface CertificateRendererProps {
  template?: ICertificateTemplate;
  data?: ICertificateData;
  showPlaceholder?: boolean;
}

export const CertificateRenderer = ({ template, data, showPlaceholder = false }: CertificateRendererProps) => {
  const frame = template?.frame;

  return (
    <div
      style={{
        width: frame?.width ?? '100%',
        height: frame?.height ?? '100%',
        backgroundImage: frame?.file?.url ? `url(${frame.file.url})` : undefined,
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
    >
      {template?.elements?.map(element => (
        <div
          key={element.id}
          style={{
            position: 'absolute',
            ...getElementPosition(element),
            width: element.styles?.width,
            height: element.styles?.height,
          }}
        >
          <ElementRenderer key={element.id} element={element} data={data} showPlaceholder={showPlaceholder} />
        </div>
      ))}
    </div>
  );
};
