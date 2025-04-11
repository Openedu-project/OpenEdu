import type { IFileResponse } from '@oe/api';
// ... existing code ...
import type { ICertificateElement } from '@oe/api';
import { ChevronsLeftRightEllipsis, ImageIcon, Network, Signature, TriangleAlert, Type } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useTranslations } from 'next-intl';
import { GradientColorPicker } from '#components/color-picker';
import { Uploader } from '#components/uploader';
import { Alert, AlertDescription } from '#shadcn/alert';
import { Button } from '#shadcn/button';
import { Switch } from '#shadcn/switch';
import { cn } from '#utils/cn';
import { useCertificateBuilder } from '../../provider';
import { SIDEBAR_STYLES, defaultFrame } from '../constants';

export const FrameTab = () => {
  const tCertificate = useTranslations('certificate');
  const { template, updateTemplate, selectElement, showGrid, toggleGrid, snapToGrid, toggleSnapToGrid } =
    useCertificateBuilder();

  const handleAddElement = (type: ICertificateElement['type']) => {
    const newElement: ICertificateElement = {
      id: nanoid(),
      type,
      content: '',
      styles: {
        x: 100,
        y: 100,
        ...(type === 'image' && {
          width: 50,
          height: 50,
        }),
        ...(type === 'text' && {
          fontSize: 14,
          fontFamily: 'Inter',
          color: '#64748b',
          bold: false,
          italic: false,
          underline: false,
        }),
        ...(type === 'signature' && {
          width: 150,
          height: 80,
        }),
      },
      ...(type === 'organization' && {
        order: template.elements?.filter(el => el.type === 'organization')?.length ?? 0,
        showName: true,
        orientation: 'horizontal',
        logoStyles: {
          width: 50,
          height: 50,
        },
        nameStyles: {
          fontSize: 14,
          fontFamily: 'Inter',
          color: '#64748b',
          bold: false,
          italic: false,
          underline: false,
        },
      }),
      ...(type === 'signature' && {
        order: template.elements?.filter(el => el.type === 'signature')?.length ?? 0,
        positionStyles: {
          fontSize: 14,
          fontFamily: 'Inter',
          color: '#64748b',
          align: 'center',
          bold: false,
          italic: false,
          underline: false,
        },
        lineStyles: {
          height: 2,
          backgroundColor: '#e2e8f0',
        },
        signatureStyles: {
          fontSize: 14,
          fontFamily: 'Inter',
          color: '#64748b',
          align: 'center',
          bold: false,
          italic: false,
          underline: false,
        },
      }),
      visible: true,
    };

    updateTemplate({
      ...template,
      elements: [...(template.elements ?? []), newElement],
    });
    selectElement(newElement.id);
  };

  const handleUploadFrame = (file?: IFileResponse) => {
    if (!file) {
      updateTemplate({
        ...template,
        frame: {
          ...template.frame,
          file: undefined,
        },
      });
      return;
    }

    const img = new Image();
    img.src = file.url;

    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      let newWidth: number;
      let newHeight: number;

      // Tính toán kích thước mới dựa trên tỷ lệ khung hình
      if (img.naturalWidth > defaultFrame.width || img.naturalHeight > defaultFrame.height) {
        if (aspectRatio > 1) {
          // Ảnh ngang
          newWidth = Math.min(defaultFrame.width, img.naturalWidth);
          newHeight = newWidth / aspectRatio;
        } else {
          // Ảnh dọc hoặc vuông
          newHeight = Math.min(defaultFrame.height, img.naturalHeight);
          newWidth = newHeight * aspectRatio;
        }
      } else {
        // Ảnh nhỏ hơn kích thước mặc định
        newWidth = img.naturalWidth;
        newHeight = img.naturalHeight;
      }

      // Cập nhật frame với kích thước đã tính toán theo tỷ lệ
      updateTemplate({
        ...template,
        frame: {
          ...template.frame,
          file: file as IFileResponse,
          width: Math.floor(newWidth),
          height: Math.floor(newHeight),
          backgroundColor: template.frame?.backgroundColor ?? defaultFrame.backgroundColor,
        },
      });

      // Cleanup URL object nếu cần
      if (!file.url.startsWith('http')) {
        URL.revokeObjectURL(img.src);
      }
    };
  };

  return (
    <div className="p-4 pt-0">
      <Alert variant="warning" className="mb-4 p-2">
        <AlertDescription className="flex items-center gap-2">
          <TriangleAlert className="h-4 w-4 shrink-0" />
          {tCertificate('builder.warning')}
        </AlertDescription>
      </Alert>
      <div className={SIDEBAR_STYLES.section}>
        <h3 className={SIDEBAR_STYLES.heading}>{tCertificate('builder.frame.background.title')}</h3>
        <div className={SIDEBAR_STYLES.colorPicker}>
          <p className={SIDEBAR_STYLES.subheading}>{tCertificate('builder.frame.background.color')}</p>
          <GradientColorPicker
            value={template.frame?.backgroundColor ?? '#ffffff'}
            onChange={value =>
              updateTemplate({
                ...template,
                frame: { ...template.frame, backgroundColor: value },
              })
            }
          />
        </div>

        <div className="mt-2">
          <p className={SIDEBAR_STYLES.subheading}>{tCertificate('builder.frame.background.image')}</p>
          <Uploader
            id="frame-image"
            fileListVisible={false}
            listType="picture"
            value={template.frame?.file ?? []}
            accept="image/png, image/jpeg, image/jpg"
            onChange={file => handleUploadFrame(file as IFileResponse)}
          />
        </div>
      </div>
      <div className={SIDEBAR_STYLES.section}>
        <h3 className={SIDEBAR_STYLES.heading}>{tCertificate('builder.elements.title')}</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="flex h-auto flex-col items-center justify-center gap-1 p-3"
            onClick={() => handleAddElement('text')}
          >
            <Type className="h-5 w-5" />
            <span className="text-xs">{tCertificate('builder.elements.text.title')}</span>
          </Button>
          <Button
            variant="outline"
            className="flex h-auto flex-col items-center justify-center gap-1 p-3"
            onClick={() => handleAddElement('image')}
          >
            <ImageIcon className="h-5 w-5" />
            <span className="text-xs">{tCertificate('builder.elements.image.title')}</span>
          </Button>
          <Button
            variant="outline"
            className="flex h-auto flex-col items-center justify-center gap-1 p-3"
            onClick={() => handleAddElement('rich-text')}
          >
            <ChevronsLeftRightEllipsis className="h-5 w-5" />
            <span className="text-xs">{tCertificate('builder.elements.richText.title')}</span>
          </Button>
          <Button
            variant="outline"
            className="flex h-auto flex-col items-center justify-center gap-1 p-3"
            onClick={() => handleAddElement('signature')}
          >
            <Signature className="h-5 w-5" />
            <span className="text-xs">{tCertificate('builder.elements.signature.title')}</span>
          </Button>
          <Button
            variant="outline"
            className={cn('col-span-2 flex h-auto flex-col items-center justify-center gap-1 p-3')}
            onClick={() => handleAddElement('organization')}
          >
            <Network className="h-5 w-5" />
            <span className="text-xs">{tCertificate('builder.elements.organization.title')}</span>
          </Button>
        </div>
      </div>

      <div className={SIDEBAR_STYLES.sectionLast}>
        <h3 className={SIDEBAR_STYLES.heading}>{tCertificate('builder.frame.grid.title')}</h3>
        <div className="flex items-center gap-2">
          <Switch checked={showGrid} onCheckedChange={toggleGrid} id="show-grid" />
          <label htmlFor="show-grid" className="cursor-pointer font-medium text-sm">
            {tCertificate('builder.frame.grid.showGrid')}
          </label>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Switch checked={snapToGrid} onCheckedChange={toggleSnapToGrid} id="snap-to-grid" />
          <label htmlFor="snap-to-grid" className="cursor-pointer font-medium text-sm">
            {tCertificate('builder.frame.grid.snapToGrid')}
          </label>
        </div>
      </div>
    </div>
  );
};
