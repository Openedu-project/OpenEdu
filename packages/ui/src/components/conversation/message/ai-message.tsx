'use client';
import AIMascot from '@oe/assets/images/ai/ai-mascot.png';
import Openedu from '@oe/assets/images/openedu.png';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { marked } from '@oe/core/utils/marker';
import { useEffect, useMemo, useRef } from 'react';
import { Image } from '#components/image';
import { cn } from '#utils/cn';
import Copy from '../message-actions/copy';
import DisLikeButton from '../message-actions/dislike';
import LikeButton from '../message-actions/like';
import Rewrite from '../message-actions/rewrite';
import { SourcesButton } from '../sources/sources-button';
import type { IAIMessageProps } from '../type';
import { CodeDownloadHydration } from './code-download-button';
import { ImageAction } from './image-action';
import { LinkPreviewHydration } from './preview-link';
import { ThinkingMessage } from './thinking-message';

export const AIMessage = ({
  message,
  loading,
  rewrite,
  content,
  actionsButton = true,
  className,
  hiddenSourceBtn,
}: IAIMessageProps) => {
  const html = useMemo(() => marked.parse(content ?? message.content), [message.content, content]);
  const contentRef = useRef<HTMLDivElement>(null);
  const sources = message.props?.source_results;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    const buttonLinks = contentRef.current.querySelectorAll('a[data-meta-trigger="true"]');

    for (const link of buttonLinks) {
      const href = link.getAttribute('href');
      if (!href) {
        continue;
      }

      if (link.parentElement?.classList.contains('link-preview-wrapper')) {
        continue;
      }

      // Create a wrapper for the link
      const wrapper = document.createElement('span');
      wrapper.className = 'link-preview-wrapper';

      const parent = link.parentElement;
      if (!parent) {
        continue;
      }

      const clone = link.cloneNode(true);

      wrapper.appendChild(clone);

      link.insertAdjacentElement('beforebegin', wrapper);
      link.remove();
    }
  }, [html]);
  return (
    <div className={cn('flex gap-2', className)}>
      <Image
        src={AIMascot.src}
        alt="ai-bot"
        aspectRatio="1:1"
        width={40}
        height={40}
        className="h-8 w-8 bg-background md:h-10 md:w-10"
        wrapClassNames="w-auto"
        objectFit="contain"
        containerHeight={40}
      />
      <div className={cn('flex grow flex-col space-y-6', !message.content && 'basis-full')}>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row items-center space-x-2">
            <div>
              <Image
                src={message?.ai_model?.thumbnail_url ?? Openedu.src}
                alt="ai-logo"
                aspectRatio="1:1"
                fill
                sizes="20px"
                objectFit="contain"
                className="h-4 w-4 rounded-full bg-background"
                containerHeight="auto"
              />
            </div>

            <p className="mcaption-semibold14 text-test">{message?.ai_model?.display_name ?? 'AI Assistant'}</p>
          </div>
          {message.reasoning && (
            <ThinkingMessage thinking={message.reasoning ?? ''} isGenerating={message.status === 'reasoning'} />
          )}
          {GENERATING_STATUS.includes(message.status ?? '') &&
          message.content.length === 0 &&
          message.reasoning?.length === 0 ? (
            <div className="flex w-12 items-end">
              <div className="flex items-center justify-center space-x-1 py-4">
                <div className="h-2 w-2 animate-[bounce_1s_infinite] rounded-full bg-primary" />
                <div className="h-2 w-2 animate-[bounce_1s_infinite_0.2s] rounded-full bg-primary" />
                <div className="h-2 w-2 animate-[bounce_1s_infinite_0.4s] rounded-full bg-primary" />
              </div>
            </div>
          ) : (
            <div className="relative w-full bg-background">
              <div
                ref={contentRef}
                className={cn(
                  'mcaption-regular14 rich-text !m-0 p-1 text-foreground',
                  'transition-all duration-100 ease-in-out'
                )}
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                dangerouslySetInnerHTML={{ __html: html }}
              />
              <LinkPreviewHydration id={message?.id} />
              <ImageAction id={message?.id} />
              <CodeDownloadHydration id={message?.id} />
            </div>
          )}
          {sources && (sources?.length ?? 0) > 0 && !hiddenSourceBtn && (
            <SourcesButton sources={sources} messageId={message.id} />
          )}
          {actionsButton && !GENERATING_STATUS.includes(message.status ?? '') && (
            <div className="flex w-fit items-center rounded-[20px] border-2 px-2">
              <Copy disabled={loading} initialMessage={message.content} contentRef={contentRef} />
              <LikeButton messageId={message.id} disabled />
              <DisLikeButton messageId={message.id} disabled />
              <Rewrite disabled={!rewrite || loading} rewrite={rewrite} messageId={message.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
