import type { CertificateData, CertificateElement, CertificateTemplate } from '../../types';
import { ElementRenderer } from './element-renderer';

interface CertificateRendererProps {
  template: CertificateTemplate;
  data?: CertificateData;
}

export const CertificateRenderer = ({ template, data }: CertificateRendererProps) => {
  const processElementValue = (element: CertificateElement) => {
    if (element.dynamic && element.dynamicKey && data) {
      return data[element.dynamicKey];
    }
    return element.text;
  };

  return (
    <div
      style={{
        width: template.width,
        height: template.height,
        backgroundColor: template.backgroundColor,
        backgroundImage: template.backgroundImage ? `url(${template.backgroundImage})` : undefined,
        position: 'relative',
      }}
    >
      {template.elements.map(element => (
        <div
          key={element.id}
          style={{
            position: 'absolute',
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height,
            transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined,
            zIndex: element.zIndex,
          }}
        >
          <ElementRenderer
            element={{
              ...element,
              text: processElementValue(element),
            }}
          />
        </div>
      ))}
    </div>
  );
};
