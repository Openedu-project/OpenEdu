import { AspectRatio } from '@oe/ui/shadcn/aspect-ratio';
import { Button } from '@oe/ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@oe/ui/shadcn/dialog';
import { ChevronLeft, ChevronRight, RotateCw, X, ZoomIn, ZoomOut } from 'lucide-react';
import type React from 'react';
import { memo, useCallback, useRef, useState } from 'react';
import { cn } from '#utils/cn';
import type { ImageGalleryProps, ImageType } from './image-gallery-type';
import { useImageTransform } from './useImageTransform';

/**
 * HOW TO USE
 * const images: ImageType[] = [
    {
      src: 'path/to/image',
      alt: 'Image alt',
      title: 'Image title',
      description: 'Image description'
    }
  ];

  <ImageGallery images={images} />

  <ImagePreviewGroup images={images} />

  // With custom title
  <ImageGallery
    images={images}
    title="Click to view images"
    titleClassName="text-red-500" // Optional custom styling
  />
 */

const ImageThumbnail = memo(
  ({
    image,
    onClick,
    title,
    titleClassName,
  }: {
    image: ImageType;
    onClick: () => void;
    title?: string | React.ReactNode;
    titleClassName?: string;
  }) => {
    if (title) {
      return (
        <div
          onClick={onClick}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === 'Space') {
              onClick();
            }
          }}
          className={cn('cursor-pointer text-blue-600 hover:text-blue-800 hover:underline', titleClassName)}
        >
          {title}
        </div>
      );
    }

    return (
      <div
        className="cursor-pointer overflow-hidden rounded-lg"
        onClick={onClick}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === 'Space') {
            onClick();
          }
        }}
      >
        <AspectRatio ratio={1}>
          <img
            src={image.src}
            alt={image.alt || ''}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </AspectRatio>
      </div>
    );
  }
);

ImageThumbnail.displayName = 'ImageThumbnail';

// Rest of the components remain the same...
const ImageControls = memo(
  ({
    onRotate,
    onZoomIn,
    onZoomOut,
  }: {
    onRotate: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
  }) => (
    <div className="mt-4 flex justify-center gap-2">
      <Button variant="outline" size="icon" onClick={onRotate}>
        <RotateCw className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={onZoomIn}>
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={onZoomOut}>
        <ZoomOut className="h-4 w-4" />
      </Button>
    </div>
  )
);

ImageControls.displayName = 'ImageControls';

export const ImageGallery = ({
  images = [],
  className,
  onImageChange,
  minScale,
  maxScale,
  scaleStep,
  title,
  titleClassName,
}: ImageGalleryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const { transform, dragState, handlers, resetTransforms } = useImageTransform({
    minScale,
    maxScale,
    scaleStep,
    imageRef,
  });

  const handlePrevious = useCallback(() => {
    const newIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    onImageChange?.(newIndex);
    resetTransforms();
  }, [selectedIndex, images.length, onImageChange, resetTransforms]);

  const handleNext = useCallback(() => {
    const newIndex = selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    onImageChange?.(newIndex);
    resetTransforms();
  }, [selectedIndex, images.length, onImageChange, resetTransforms]);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    resetTransforms();
  }, [resetTransforms]);

  const handleDialogChange = useCallback(
    (open: boolean, index: number) => {
      setIsOpen(open);
      if (open) {
        setSelectedIndex(index);
        onImageChange?.(index);
      } else {
        resetTransforms();
      }
    },
    [onImageChange, resetTransforms]
  );

  // If there's only one image and title is provided, render a simpler structure
  if (images.length === 1 && title) {
    return (
      <Dialog open={isOpen} onOpenChange={open => handleDialogChange(open, 0)}>
        <DialogTrigger asChild>
          <div className={cn('cursor-pointer text-blue-600 hover:text-blue-800 hover:underline', titleClassName)}>
            {title}
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-screen-lg border-none bg-black/90">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{images[0]?.title || ''}</span>
              <Button variant="outline" size="icon" onClick={closeDialog}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>{images[0]?.description || ''}</DialogDescription>
          </DialogHeader>
          <div
            className="relative flex items-center justify-center overflow-hidden"
            onMouseDown={handlers.handleMouseDown}
            onMouseMove={handlers.handleMouseMove}
            onMouseUp={handlers.handleMouseUp}
            onMouseLeave={handlers.handleMouseUp}
            onWheel={handlers.handleWheel}
            style={{
              cursor: transform.scale !== 1 ? (dragState.isDragging ? 'grabbing' : 'grab') : 'default',
            }}
          >
            <div className="overflow-hidden">
              <img
                ref={imageRef}
                src={images[0]?.src}
                alt={images[0]?.alt || ''}
                style={{
                  transform: `rotate(${transform.rotation}deg) scale(${transform.scale}) translate(${transform.position.x}px, ${transform.position.y}px)`,
                  transition: dragState.isDragging ? 'none' : 'transform 0.3s ease',
                  transformOrigin: 'center',
                }}
                className="max-h-[60vh] w-auto select-none"
                draggable={false}
              />
            </div>

            <div className="absolute top-2 left-2 rounded bg-black/90 px-2 py-1 text-sm text-white">
              {Math.round(transform.scale * 100)}%
            </div>
          </div>

          <ImageControls
            onRotate={handlers.handleRotate}
            onZoomIn={() => handlers.handleZoom(scaleStep || 0.1)}
            onZoomOut={() => handlers.handleZoom(-(scaleStep || 0.1))}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className={cn(title ? '' : 'grid grid-cols-3 gap-4', className)}>
      {images.map((image, index) => (
        <Dialog
          key={`images-${image.src}`}
          open={isOpen && selectedIndex === index}
          onOpenChange={open => handleDialogChange(open, index)}
        >
          <DialogTrigger asChild>
            <ImageThumbnail
              image={image}
              onClick={() => setSelectedIndex(index)}
              title={title}
              titleClassName={titleClassName}
            />
          </DialogTrigger>
          <DialogContent className="max-w-screen-lg border-none bg-black/90">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{image.title || ''}</span>
                <Button variant="outline" size="icon" onClick={closeDialog}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
              <DialogDescription>{image.description || ''}</DialogDescription>
            </DialogHeader>
            <div
              className="relative flex items-center justify-center overflow-hidden"
              onMouseDown={handlers.handleMouseDown}
              onMouseMove={handlers.handleMouseMove}
              onMouseUp={handlers.handleMouseUp}
              onMouseLeave={handlers.handleMouseUp}
              onWheel={handlers.handleWheel}
              style={{
                cursor: transform.scale !== 1 ? (dragState.isDragging ? 'grabbing' : 'grab') : 'default',
              }}
            >
              <div className="overflow-hidden">
                <img
                  ref={imageRef}
                  src={image.src}
                  alt={image.alt || ''}
                  style={{
                    transform: `rotate(${transform.rotation}deg) scale(${transform.scale}) translate(${transform.position.x}px, ${transform.position.y}px)`,
                    transition: dragState.isDragging ? 'none' : 'transform 0.3s ease',
                    transformOrigin: 'center',
                  }}
                  className="max-h-[60vh] w-auto select-none"
                  draggable={false}
                />
              </div>

              <div className="absolute top-2 left-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
                {Math.round(transform.scale * 100)}%
              </div>

              {images.length > 1 && (
                <>
                  <Button variant="ghost" size="icon" className="absolute left-2" onClick={handlePrevious}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="absolute right-2" onClick={handleNext}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            <ImageControls
              onRotate={handlers.handleRotate}
              onZoomIn={() => handlers.handleZoom(scaleStep || 0.1)}
              onZoomOut={() => handlers.handleZoom(-(scaleStep || 0.1))}
            />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export const ImagePreviewGroup = memo((props: ImageGalleryProps) => <ImageGallery {...props} />);

ImagePreviewGroup.displayName = 'ImagePreviewGroup';
