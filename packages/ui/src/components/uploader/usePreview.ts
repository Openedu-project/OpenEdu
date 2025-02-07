import { useCallback, useEffect, useState } from 'react';
import type { FileType } from './types';
import { MAX_PREVIEW_FILE_SIZE, previewFile } from './utils';

export const usePreviewImage = (file?: FileType, listType?: string) => {
  const [previewImage, setPreviewImage] = useState(file?.url ? file.url : null);

  const getThumbnail = useCallback(
    (callback: (previewImage: string | ArrayBuffer | null) => void) => {
      if (!listType || !~['picture-text', 'picture'].indexOf(listType)) {
        return;
      }

      if (!file?.originFile || file?.originFile?.size > MAX_PREVIEW_FILE_SIZE) {
        return;
      }

      previewFile(file.originFile, callback);
    },
    [file, listType]
  );

  useEffect(() => {
    if (!file?.url) {
      getThumbnail(previewImage => {
        setPreviewImage(previewImage as string);
      });
    }
  }, [file?.url, getThumbnail]);

  return { previewImage };
};
