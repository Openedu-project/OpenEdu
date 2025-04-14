'use client';

import type { ICertificateData, ICertificateTemplate } from '@oe/api';
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
        backgroundColor: frame?.backgroundColor ?? '#fff',
        backgroundImage: frame?.file?.url ? `url(${frame.file.url})` : undefined,
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
    >
      {template?.elements?.map(element => {
        if (element.visible === false) {
          return null;
        }
        return (
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
        );
      })}
    </div>
  );
};
