'use client';

import type { ICertificateData, ICertificateTemplate } from '@oe/api/types/certificate';
import { Document, Image, Page, pdf } from '@react-pdf/renderer';
import type { FC, MouseEvent } from 'react';
import './pdf-fonts';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button, type ButtonProps } from '#shadcn/button';
import { PDFImageRenderer } from './pdf-image-renderer';
import { PDFOrganizationRenderer } from './pdf-organization-renderer';
import { PDFRichTextRenderer } from './pdf-rich-text-renderer';
import { PDFSignatureRenderer } from './pdf-signature-renderer';
import { PDFTextRenderer } from './pdf-text-renderer';

export const CertificatePDF: FC<{
  template: ICertificateTemplate;
  data?: ICertificateData;
}> = ({ template, data }) => {
  return (
    <Document style={{ fontFamily: 'Inter', fontSize: 14 }}>
      <Page
        key={template.id}
        size={[template.frame?.width ?? 800, template.frame?.height ?? 600]}
        style={{
          backgroundColor: template.frame?.backgroundColor,
          position: 'relative',
          padding: 0,
        }}
      >
        {/* Background Image */}
        {template.frame?.file?.url && (
          <Image
            src={template.frame?.file?.url}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: template.frame?.width,
              height: template.frame?.height,
            }}
          />
        )}

        {template.elements?.map(element => {
          if (element.visible === false) {
            return null;
          }

          switch (element.type) {
            case 'text':
              return <PDFTextRenderer key={element.id} element={element} data={data} />;
            case 'image':
              return <PDFImageRenderer key={element.id} element={element} />;
            case 'rich-text':
              return <PDFRichTextRenderer key={element.id} element={element} data={data} />;
            case 'signature':
              return <PDFSignatureRenderer key={element.id} element={element} data={data} />;
            case 'organization':
              return <PDFOrganizationRenderer key={element.id} element={element} data={data} />;

            default:
              return null;
          }
        })}
      </Page>
    </Document>
  );
};

export const generatePDF = async (template: ICertificateTemplate, data?: ICertificateData) => {
  try {
    const blob = await pdf(<CertificatePDF key={template.id} template={template} data={data} />).toBlob();

    return blob;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
};

interface ExportPDFButtonProps extends ButtonProps {
  fileName?: string;
  template: ICertificateTemplate;
  data?: ICertificateData;
}

export const ExportPDFButton = ({ fileName, template, data, onClick, ...props }: ExportPDFButtonProps) => {
  const tCertificate = useTranslations('certificate');

  const handleExportPDF = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      const blob = await generatePDF(template, data);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const name =
        data?.learner_name && data?.course_name && data?.issue_date
          ? `${template.name}-${data.learner_name}-${data.course_name}-${data.issue_date}`
          : template.name;
      a.download = `${fileName || name}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      onClick?.(e);
    } catch (error) {
      console.error('Export PDF error:', error);
      toast.error(tCertificate('builder.preview.downloadError'));
    }
  };

  return (
    <Button {...props} onClick={handleExportPDF}>
      <Download className="h-4 w-4" />
      {props.children || tCertificate('builder.preview.download')}
    </Button>
  );
};
