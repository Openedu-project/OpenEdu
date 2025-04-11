import type { ICertificateData, ICertificateElement } from '@oe/api';
import { ImageRenderer } from './image-renderer';
import { OrganizationRenderer } from './organization-renderer';
import { RichTextCertificateRenderer } from './rich-text-renderer';
import { SignatureRenderer } from './signature-renderer';
import { TextRenderer } from './text-renderer';

export const ElementRenderer = ({
  element,
  data,
  showPlaceholder = false,
}: {
  element: ICertificateElement;
  data?: ICertificateData;
  showPlaceholder?: boolean;
}) => {
  switch (element.type) {
    case 'text':
      return <TextRenderer element={element} data={data} />;
    case 'image':
      return <ImageRenderer element={element} showPlaceholder={showPlaceholder} />;
    case 'rich-text':
      return <RichTextCertificateRenderer element={element} data={data} />;
    case 'signature':
      return <SignatureRenderer element={element} data={data} showPlaceholder={showPlaceholder} />;
    case 'organization':
      return <OrganizationRenderer element={element} data={data} showPlaceholder={showPlaceholder} />;
    default:
      return null;
  }
};
