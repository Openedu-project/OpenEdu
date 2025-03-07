'use client';

import type { ICertificate } from '@oe/api/types/certificate';
import type { IFileResponse } from '@oe/api/types/file';
import { useCallback, useState } from 'react';
import { handleBlobUpload } from './helper';

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

  return {
    uploadPDF: handleUploadPDF,
    isUploading: uploadStatus.loading,
    uploadError: uploadStatus.error,
    uploadSuccess: uploadStatus.success,
  };
};

export { useUploadCertificate };
