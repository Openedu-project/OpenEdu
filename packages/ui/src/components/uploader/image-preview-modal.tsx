'use client';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from '#shadcn/button';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '#shadcn/carousel';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle } from '#shadcn/dialog';
import { cn } from '#utils/cn';
import TransformWrapper from './transform-wrapper';
import type { FileType } from './types';

interface ImagePreviewModalProps {
  images: FileType[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ImagePreviewModal = ({ images, initialIndex = 0, isOpen, onClose }: ImagePreviewModalProps) => {
  const showNavigation = images.length > 1;

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-background/80 backdrop-blur-xs" />
      <DialogContent
        className="max-w-[90vw] border-none bg-transparent p-0 shadow-none md:max-w-3xl"
        onPointerDownOutside={onClose}
        closeClassName="bg-muted p-1 rounded-full"
      >
        <DialogHeader className="hidden">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <div className="relative">
          <Carousel
            className="w-full"
            opts={{
              startIndex: initialIndex,
              align: 'center',
            }}
            setApi={setApi}
          >
            <CarouselContent>
              {images.map(image => (
                <CarouselItem key={image.id ?? image.name} className="flex items-center justify-center">
                  <TransformWrapper>
                    <img
                      src={image.url || URL.createObjectURL(image.originFile as File)}
                      alt={image.name}
                      className={cn('mx-auto object-contain hover:cursor-move')}
                    />
                  </TransformWrapper>
                </CarouselItem>
              ))}
            </CarouselContent>
            {showNavigation && (
              <>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </>
            )}
            {showNavigation && (
              <div className="-translate-x-1/2 absolute bottom-4 left-1/2 flex gap-2">
                {images.map((image, index) => (
                  <Button
                    key={image.id ?? image.name}
                    className={cn(
                      'h-2 w-2 rounded-full transition-colors',
                      current === index ? 'bg-background' : 'bg-background/50'
                    )}
                    onClick={() => {
                      api?.scrollTo(index);
                    }}
                  />
                ))}
              </div>
            )}
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
};
