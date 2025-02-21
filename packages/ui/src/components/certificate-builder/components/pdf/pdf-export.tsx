'use client';

import { Document, Image, Page, Text, pdf } from '@react-pdf/renderer';
import type { FC } from 'react';
import type { CertificateData, CertificateTemplate } from '../../types';
import './pdf-fonts';
import { Download } from 'lucide-react';
import { Button, type ButtonProps } from '#shadcn/button';

// Reference font
// const styles = StyleSheet.create({
//   title: {
//     fontFamily: 'Roboto'
//   }
// })

export const CertificatePDF: FC<{
  template: CertificateTemplate;
  data: CertificateData;
}> = ({ template, data }) => {
  return (
    <Document>
      <Page
        size={[template.width, template.height]}
        style={{
          backgroundColor: template.backgroundColor,
          position: 'relative',
          padding: 0,
        }}
      >
        {/* Background Image */}
        {template.backgroundImage && (
          <Image
            src={template.backgroundImage}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: template.width,
              height: template.height,
            }}
          />
        )}

        {/* Elements */}
        {template.elements.map(element => {
          if (element.visible === false) {
            return null;
          }

          switch (element.type) {
            case 'text':
              return (
                <Text
                  key={element.id}
                  style={{
                    position: 'absolute',
                    left: element.x,
                    top: element.y,
                    width: element.width || 200,
                    fontSize: element.fontSize || 12,
                    color: element.color || '#000000',
                    fontFamily: 'Inter',
                    ...(element.bold && { fontWeight: '700' }),
                    ...(element.italic && { fontStyle: 'italic' }),
                    ...(element.underline && { textDecoration: 'underline' }),
                    ...(element.align && { textAlign: element.align }),
                  }}
                  render={() =>
                    element.dynamic && element.dynamicKey && data[element.dynamicKey]
                      ? data[element.dynamicKey]
                      : element.text
                  }
                />
              );
            case 'image':
              return element.src ? (
                <Image
                  key={element.id}
                  src={element.src}
                  style={{
                    position: 'absolute',
                    left: element.x,
                    top: element.y,
                    width: element.width || 100,
                    height: element.height || 100,
                    objectFit: 'contain',
                  }}
                />
              ) : null;
            default:
              return null;
          }
        })}
      </Page>
    </Document>
  );
};

export const generatePDF = async (template: CertificateTemplate, data: CertificateData) => {
  return await pdf(<CertificatePDF template={template} data={data} />).toBlob();
};

interface ExportPDFButtonProps extends ButtonProps {
  fileName?: string;
  template: CertificateTemplate;
  data: CertificateData;
}

export const ExportPDFButton = ({ fileName, template, data, ...props }: ExportPDFButtonProps) => {
  const handleExportPDF = async () => {
    const blob = await generatePDF(template, data);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const name =
      data.studentName && data.courseName && data.issueDate
        ? `${template.name}-${data.studentName}-${data.courseName}-${data.issueDate}`
        : template.name;
    a.download = `${fileName || name}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExportPDF} {...props}>
      <Download className="h-4 w-4" />
      {props.children || 'Export PDF'}
    </Button>
  );
};
