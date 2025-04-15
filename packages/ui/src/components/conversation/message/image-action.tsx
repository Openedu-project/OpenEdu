'use client';
import { Download, Eye } from 'lucide-react';
import { type MouseEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from '#common/navigation';
import { Button } from '#shadcn/button';

export const ImageAction = ({ id }: { id: string }) => {
  const [imageData, setImageData] = useState<{ src: string; text?: string; element: HTMLElement }[]>([]);

  useEffect(() => {
    const container = document?.getElementById(id);

    if (!container) {
      return;
    }
    const wrappers = container?.getElementsByClassName('image-preview');

    const previewsData = Array.from(wrappers).map(wrapper => {
      const imageElement = wrapper.querySelector('img');
      if (!imageElement) {
        return { src: '', element: wrapper as HTMLElement };
      }
      return {
        src: imageElement?.src ?? '',
        element: wrapper as HTMLElement,
      };
    });
    setImageData(previewsData);
  }, [id]);

  const handleDownload = (e: MouseEvent<HTMLButtonElement>, src: string, text?: string) => {
    e.preventDefault();

    fetch(src)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = text || 'image';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Error downloading image:', error));
  };

  return (
    <>
      {imageData.map(({ src, text, element }) => {
        if (!src) {
          return null;
        }
        return createPortal(
          <Link
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="invisible absolute top-0 left-0 z-50 flex h-full w-full cursor-pointer justify-end rounded-xl bg-foreground/50 group-hover:visible"
          >
            <div className="flex h-full flex-col items-end justify-between">
              <Eye className="h-6 w-6 text-background" />

              <Button
                variant="outline"
                className="aspect-square rounded-md bg-background/50 bg-transparent p-1 text-background hover:bg-background/70"
                onClick={e => handleDownload(e, src, text)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </Link>,
          element
        );
      })}
    </>
  );
};
