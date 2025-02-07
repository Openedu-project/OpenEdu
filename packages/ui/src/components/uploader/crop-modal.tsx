import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop, { makeAspectCrop, centerCrop } from 'react-image-crop';

import type { Crop, ReactCropProps } from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

import { useTranslations } from 'next-intl';
import { Modal } from '../modal';
import type { CropModalProps, FileType } from './types';

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export const MODAL_DROP_IMAGE = 'crop-uploader-image';

export const CropModal: React.FC<CropModalProps> = ({ file, aspectRatio = 4 / 3, cropProps, onComplete, onCancel }) => {
  const tUploader = useTranslations('uploader');
  const tGeneral = useTranslations('general');
  const [crop, setCrop] = useState<Crop | undefined>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [imgSrc, setImgSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCrop(undefined); // Makes crop preview update between images.
    const reader = new FileReader();

    reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
    if (file?.originFile) {
      reader.readAsDataURL(file.originFile);
    }
  }, [file]);

  const onImageLoad = useCallback(
    (image: HTMLImageElement) => {
      if (aspectRatio) {
        const { width, height } = image;
        setCrop(centerAspectCrop(width, height, aspectRatio));
      }
    },
    [aspectRatio]
  );

  const cropImage = useCallback(
    (handleClose?: () => void) => {
      if (!(completedCrop && imgRef.current)) {
        return;
      }

      const image = imgRef.current;
      const canvas = document.createElement('canvas');
      const crop = completedCrop;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('No 2d context');
      }

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob(blob => {
        if (!(blob && file?.originFile)) {
          return;
        }
        const croppedFile = new File([blob], file.originFile.name, { type: file.originFile.type });
        const updatedFile = {
          ...file,
          originFile: croppedFile,
        } as FileType;

        onComplete(updatedFile);
        handleClose?.();
      }, 'image/png');
    },
    [completedCrop, file, onComplete]
  );

  return (
    <>
      <Modal
        title="Crop Image"
        open={!!file}
        buttons={[
          {
            label: tGeneral('cancel'),
            variant: 'outline',
            onClick: onCancel,
          },
          {
            label: tUploader('crop'),
            variant: 'default',
            onClick: cropImage,
          },
        ]}
        onClose={onCancel}
        className="text-center"
      >
        <ReactCrop
          {...(cropProps as ReactCropProps)}
          crop={crop}
          onComplete={c => setCompletedCrop(c)}
          aspect={aspectRatio}
          locked
          onChange={(_, percentCrop) => setCrop(percentCrop)}
        >
          {imgSrc && (
            <img
              ref={imgRef}
              src={imgSrc}
              alt={tUploader('cropPreview')}
              onLoad={e => onImageLoad(e.currentTarget)}
              className="user-select-none w-full object-contain"
            />
          )}
        </ReactCrop>
      </Modal>
    </>
  );
};
