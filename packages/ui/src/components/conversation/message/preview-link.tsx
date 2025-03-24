'use client';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@oe/ui/shadcn/hover-card';
import type React from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useConversationStore } from '#store/conversation-store';
import { SourceCard } from '../sources/source-card';

interface LinkPreviewProps {
  children: React.ReactNode;
  href: string;
}

interface LinkMetadata {
  title?: string;
  content?: string;
}

export const LinkPreview = ({ children, href }: LinkPreviewProps) => {
  const [metadata, setMetadata] = useState<LinkMetadata | null | undefined>(null);
  const { messages } = useConversationStore();

  const getMetadata = () => {
    if (metadata) {
      return;
    }
    const data = messages.flatMap(message => message.props?.source_results);
    if (!data) {
      return null;
    }
    setMetadata(data.find(result => result?.url === href));
  };

  return (
    <HoverCard openDelay={50} closeDelay={50}>
      <HoverCardTrigger asChild onMouseEnter={getMetadata}>
        {children}
      </HoverCardTrigger>
      {metadata && (
        <HoverCardContent className="w-80 overflow-hidden rounded-xl p-3 shadow-lg">
          <SourceCard url={href} title={metadata?.title ?? ''} content={metadata?.content ?? ''} />
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

export const LinkPreviewHydration = ({ id }: { id: string }) => {
  const [previews, setPreviews] = useState<{ href: string; text: string; element: HTMLElement }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document?.getElementById(id);

      if (!container) {
        return;
      }
      const wrappers = container?.getElementsByClassName('link-preview-wrapper');

      const previewsData = Array.from(wrappers).map(wrapper => {
        const linkElement = wrapper.querySelector('a');
        while (wrapper.firstChild) {
          wrapper.removeChild(wrapper.firstChild);
        }
        return {
          href: linkElement?.href ?? '',
          text: linkElement?.textContent ?? '',
          element: wrapper as HTMLElement,
        };
      });

      setPreviews(previewsData);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <>
      {previews.map(({ href, text, element }) => {
        return createPortal(
          <LinkPreview key={href} href={href}>
            <a
              href={href}
              className="mcaption-regular10 inline-flex items-center justify-center break-all rounded-full border bg-primary/10 px-2 py-1 hover:border-primary hover:bg-background hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {text}
            </a>
          </LinkPreview>,
          element
        );
      })}
    </>
  );
};
