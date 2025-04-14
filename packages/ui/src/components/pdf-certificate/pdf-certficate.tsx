'use client';

import type { IFileResponse } from '@oe/api';
import type { ICertificate } from '@oe/api';
import { useCallback, useState } from 'react';
import { handleBlobUpload } from './helper';

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface UploadStatus {
  loading: boolean;
  error: string | null;
  success: boolean;
}

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleUploadPDF = useCallback(
    async (blob: Blob): Promise<IFileResponse | undefined> => {
      try {
        setUploadStatus({ loading: true, error: null, success: false });

        const pdfBlob = blob;
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
    },
    [certificate]
  );

  /**
   * Handle PNG upload process
   */
  const handleUploadPNG = useCallback(async (pdfBlob: Blob): Promise<IFileResponse | undefined> => {
    try {
      setUploadStatus({ loading: true, error: null, success: false });

      // Convert Blob to ArrayBuffer
      const arrayBuffer = await pdfBlob.arrayBuffer();

      // Load PDF from ArrayBuffer
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      // Get the first page of PDF
      const page = await pdf.getPage(1);

      // Get the viewport of the page
      const viewport = page.getViewport({ scale: 2.0 }); // Scale 2.0 for high quality

      // Create canvas element
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Unable to get canvas context');
      }

      // Set the size of canvas according to Viewport
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF to canvas
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      // Convert canvas to Blob PNG
      const pngBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(blob => (blob ? resolve(blob) : reject(new Error('Failed to convert to PNG'))), 'image/png', 1);
      });

      // Upload PNG Blob
      const res = await handleBlobUpload(pngBlob, 'certificate.png');

      setUploadStatus({ loading: false, error: null, success: true });
      return res;
    } catch (error) {
      console.error('PNG generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate PNG';
      setUploadStatus({
        loading: false,
        error: errorMessage,
        success: false,
      });
      return undefined;
    }
  }, []);

  return {
    uploadPDF: handleUploadPDF,
    uploadPNG: handleUploadPNG,
    isUploading: uploadStatus.loading,
    uploadError: uploadStatus.error,
    uploadSuccess: uploadStatus.success,
  };
};

export { useUploadCertificate };
