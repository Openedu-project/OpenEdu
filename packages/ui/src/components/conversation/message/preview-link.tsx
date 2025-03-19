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
    <HoverCard openDelay={300} closeDelay={200}>
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
  const [previews, setPreviews] = useState<{ href: string; element: HTMLElement }[]>([]);
  useEffect(() => {
    const wrappers = document?.querySelectorAll(`#${CSS.escape(id)} .link-preview-wrapper`);
    const previewsData = Array.from(wrappers).map(wrapper => {
      const href = wrapper.getAttribute('data-link-href') || '';
      return { href, element: wrapper as HTMLElement };
    });

    setPreviews(previewsData);
  }, [id]);

  return (
    <>
      {previews.map(({ href, element }) => {
        // Get the original link element
        const linkElement = element.querySelector('a');
        if (!linkElement) {
          return null;
        }

        // Create a portal for each link
        return createPortal(
          <LinkPreview key={href} href={href}>
            <a
              href={href}
              className="my-1 inline-flex items-center justify-center break-all rounded-full border bg-primary/10 px-2 py-1 hover:border-primary hover:bg-background hover:text-primary"
              target={linkElement.target}
              rel={linkElement.rel}
            >
              {linkElement.textContent}
            </a>
          </LinkPreview>,
          element
        );
      })}
    </>
  );
};
