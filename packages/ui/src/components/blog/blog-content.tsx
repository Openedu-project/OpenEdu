'use client';

import { marked } from '@oe/core/utils/marker';
import { createRoot } from 'react-dom/client';
import ReactPlayer from 'react-player';

export function BlogContent({
  content,
  isMarkdown = false,
}: {
  content: string;
  isMarkdown?: boolean;
}) {
  return (
    <div
      className="rich-text !m-0 py-6 text-foreground"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: isMarkdown ? marked.parse(content) : content,
      }}
      ref={el => {
        if (el) {
          for (const block of el.querySelectorAll('[data-type="video"]')) {
            const element = block as HTMLDivElement;
            const src = element.getAttribute('src') ?? '';
            createRoot(element).render(
              <div className="relative aspect-video w-full">
                {src.includes('iframe.mediadelivery.net') ? (
                  <iframe
                    src={src}
                    loading="lazy"
                    title="video"
                    className="absolute top-0 h-full w-full border-none"
                    allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
                    allowFullScreen
                  />
                ) : (
                  <ReactPlayer
                    url={src}
                    controls
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                  />
                )}
              </div>
            );
          }
        }
      }}
    />
  );
}
