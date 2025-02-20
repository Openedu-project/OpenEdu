'use client';

import type { ICertificate } from '@oe/api/types/certificate';
import type { IFileResponse } from '@oe/api/types/file';
import { formatDate } from '@oe/core/utils/datetime';
import {
  Document,
  Font,
  PDFDownloadLink,
  Page,
  Image as ReactPdfImage,
  StyleSheet,
  Text,
  View,
  usePDF,
} from '@react-pdf/renderer';
import html2canvas from 'html2canvas-pro';
import dynamic from 'next/dynamic';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '#shadcn/button';
import { IMAGE_LOAD_DELAY, PDF_DIMENSIONS, PNG_QUALITY } from './constant';
import { convertPdfStyleToCSS, handleBlobUpload } from './helper';

const PDFViewer = dynamic(() => import('./pdf-viewer'), { ssr: false });

// Register font once at the module level
Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/notosans/v6/0Ue9FiUJwVhi4NGfHJS5uA.ttf',
});

// Memoized styles
const STATIC_STYLES = {
  pdf: StyleSheet.create({
    viewer: {
      height: '100%',
      width: '100%',
      minHeight: '300px',
      border: 'none',
      outline: 'none',
    },
  }),
  document: StyleSheet.create({
    body: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      fontFamily: 'Inter',
    },
  }),
};

// Components
const CertificatePDF = ({ certificate }: { certificate: ICertificate }) => {
  const currentStyles = useMemo(() => StyleSheet.create(certificate.props), [certificate.props]);
  const pdfDocumentRef = useRef<Document>(null);

  return (
    <Document ref={pdfDocumentRef}>
      <Page
        style={STATIC_STYLES.document.body}
        size={[PDF_DIMENSIONS.width, PDF_DIMENSIONS.height]}
        orientation="landscape"
      >
        <View style={currentStyles.view}>
          <ReactPdfImage style={currentStyles.image} src={certificate?.files[0]?.url} />

          <ReactPdfImage style={currentStyles.logoA} src={certificate.root_layer.logo.url} />
          {certificate.org_layer?.logo && (
            <ReactPdfImage style={currentStyles.logoB} src={certificate.org_layer.logo.url} />
          )}

          {certificate?.root_layer?.signature && (
            <ReactPdfImage style={currentStyles.signatureA} src={certificate.root_layer.signature.url} />
          )}
          {certificate?.org_layer?.signature && (
            <ReactPdfImage style={currentStyles.signatureB} src={certificate.org_layer.signature.url} />
          )}

          <Text style={currentStyles.course}>{certificate.course_name}</Text>
          <Text style={currentStyles.learner}>{certificate?.learner_name || 'Learner name'}</Text>
          <Text style={currentStyles.date}> {formatDate(certificate?.date || Date.now())}</Text>
          <Text style={currentStyles.creatorA}>{certificate.root_layer.signature_name}</Text>
          {certificate.org_layer?.signature_name && (
            <Text style={currentStyles.creatorB}>{certificate.org_layer.signature_name}</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

const CertificateHTML = ({ certificate }: { certificate: ICertificate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentStyles = certificate.props;

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: `${PDF_DIMENSIONS.width}px`,
    height: `${PDF_DIMENSIONS.height}px`,
    backgroundColor: 'transparent',
    transformOrigin: 'top left',
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <img
        src={certificate?.files[0]?.url}
        style={convertPdfStyleToCSS(currentStyles.image)}
        alt="Certificate background"
      />
      <img src={certificate.root_layer.logo.url} style={convertPdfStyleToCSS(currentStyles.logoA)} alt="Logo A" />
      {certificate.org_layer?.logo && (
        <img src={certificate.org_layer.logo.url} style={convertPdfStyleToCSS(currentStyles.logoB)} alt="Logo B" />
      )}
      {certificate?.root_layer?.signature && (
        <img
          src={certificate.root_layer.signature.url}
          style={convertPdfStyleToCSS(currentStyles.signatureA)}
          alt="Signature A"
        />
      )}
      {certificate?.org_layer?.signature && (
        <img
          src={certificate.org_layer.signature.url}
          style={convertPdfStyleToCSS(currentStyles.signatureB)}
          alt="Signature B"
        />
      )}
      <div style={convertPdfStyleToCSS(currentStyles.course)}>{certificate.course_name}</div>
      <div style={convertPdfStyleToCSS(currentStyles.learner)}>{certificate?.learner_name || 'Learner name'}</div>
      <div style={convertPdfStyleToCSS(currentStyles.creatorA)}>{certificate.root_layer.signature_name}</div>
      {certificate.org_layer?.signature_name && (
        <div style={convertPdfStyleToCSS(currentStyles.creatorB)}>{certificate.org_layer.signature_name}</div>
      )}
    </div>
  );
};

const ViewCertificate = ({ certificate }: { certificate: ICertificate }) => (
  <PDFViewer style={STATIC_STYLES.pdf.viewer} showToolbar={false}>
    <CertificatePDF certificate={certificate} />
  </PDFViewer>
);

const ExportPDFCertificate = ({
  certificate,
  title = 'Export now',
}: {
  certificate: ICertificate;
  title?: string;
}) => (
  <PDFDownloadLink
    document={<CertificatePDF certificate={certificate} />}
    fileName={`${certificate?.learner_name || certificate.course_name}_certificate.pdf`}
  >
    {({ loading }) => (loading ? 'Loading certificate...' : <Button variant="link">{title}</Button>)}
  </PDFDownloadLink>
);

interface UploadStatus {
  loading: boolean;
  error: string | null;
  success: boolean;
}

/**
 * Generate PDF blob from certificate data
 */
const generatePDFBlob = async (certificate: ICertificate): Promise<Blob> => {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  document.body.appendChild(container);

  return new Promise((resolve, reject) => {
    try {
      const root = createRoot(container);

      const PDFGenerator = () => {
        const [instance] = usePDF({
          document: <CertificatePDF certificate={certificate} />,
        });

        useEffect(() => {
          if (instance.blob) {
            resolve(instance.blob);
          }
          if (instance.error) {
            reject(instance.error);
          }
        }, [instance.blob, instance.error]);

        return null;
      };

      root.render(<PDFGenerator />);
    } catch (error) {
      reject(error);
    } finally {
      setTimeout(() => {
        try {
          container.remove();
        } catch (e) {
          console.error('Cleanup error:', e);
        }
      }, 100);
    }
  });
};

/**
 * Generate PNG blob from certificate data
 */
const generatePNGBlob = async (certificate: ICertificate): Promise<Blob> => {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  document.body.appendChild(container);

  const root = createRoot(container);
  try {
    root.render(<CertificateHTML certificate={certificate} />);

    // Wait for render and images
    await new Promise(resolve => setTimeout(resolve, IMAGE_LOAD_DELAY));
    await Promise.all(
      [...container.getElementsByTagName('img')].map(
        img =>
          new Promise((resolve, reject) => {
            if (img.complete) {
              resolve(true);
            }
            img.addEventListener('load', () => resolve(true));
            img.addEventListener('error', () => reject(new Error(`Failed to load image: ${img.src}`)));
          })
      )
    );

    const certificateElement = container.firstElementChild as HTMLElement;
    if (!certificateElement) {
      throw new Error('Certificate element not found');
    }

    const canvas = await html2canvas(certificateElement, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      width: certificateElement.offsetWidth,
      height: certificateElement.offsetHeight,
      imageTimeout: 15_000,
      scale: 1,
    });

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        blob => (blob ? resolve(blob) : reject(new Error('Failed to convert to PNG'))),
        'image/png',
        PNG_QUALITY
      );
    });
  } finally {
    try {
      root?.unmount();
      container.remove();
    } catch (e) {
      console.error('Cleanup error:', e);
    }
  }
};

const useUploadCertificate = ({
  certificate,
}: {
  certificate: ICertificate;
}) => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    loading: false,
    error: null,
    success: false,
  });

  /**
   * Handle PDF upload process
   */
  const handleUploadPDF = useCallback(async (): Promise<IFileResponse | undefined> => {
    try {
      setUploadStatus({ loading: true, error: null, success: false });

      const pdfBlob = await generatePDFBlob(certificate);
      const response = await handleBlobUpload(pdfBlob, 'certificate.pdf');

      setUploadStatus({ loading: false, error: null, success: true });
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload PDF';
      console.error('PDF upload error:', error);
      setUploadStatus({
        loading: false,
        error: errorMessage,
        success: false,
      });
      return undefined;
    }
  }, [certificate]);

  /**
   * Handle PNG upload process
   */
  const handleUploadPNG = useCallback(async (): Promise<IFileResponse | undefined> => {
    try {
      setUploadStatus({ loading: true, error: null, success: false });

      const pngBlob = await generatePNGBlob(certificate);
      const response = await handleBlobUpload(pngBlob, 'certificate.png');

      setUploadStatus({ loading: false, error: null, success: true });
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload PNG';
      console.error('PNG upload error:', error);
      setUploadStatus({
        loading: false,
        error: errorMessage,
        success: false,
      });
      return undefined;
    }
  }, [certificate]);

  return {
    uploadPDF: handleUploadPDF,
    uploadPNG: handleUploadPNG,
    isUploading: uploadStatus.loading,
    uploadError: uploadStatus.error,
    uploadSuccess: uploadStatus.success,
  };
};

export { CertificatePDF, ViewCertificate, ExportPDFCertificate, useUploadCertificate, CertificateHTML };
