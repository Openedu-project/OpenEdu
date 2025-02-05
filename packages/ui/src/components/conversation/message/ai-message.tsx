'use client';
import AIBot from '@oe/assets/images/ai-bot.png';
import Openedu from '@oe/assets/images/openedu.png';

import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { marked } from '@oe/core/utils/marker';
import { useMemo, useRef } from 'react';
import { Image } from '#components/image';
import { cn } from '#utils/cn';
import DisLikeButton from '../message-actions/dislike';
import Rewrite from '../message-actions/rewrite';
import type { IAIMessageProps } from '../type';
import '../highlight.css';
import Copy from '../message-actions/copy';
import LikeButton from '../message-actions/like';

export const AIMessage = ({ message, loading, rewrite }: IAIMessageProps) => {
  const html = useMemo(() => marked.parse(message.content), [message.content]);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col space-y-9 lg:flex-row lg:justify-between lg:space-x-9 lg:space-y-0">
      <div className={cn('flex flex-col space-y-6', !message.content && 'basis-full')}>
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

            <p className="mcaption-semibold14">{message?.ai_model?.display_name ?? 'AI Assistant'}</p>
          </div>
          {GENERATING_STATUS.includes(message.status ?? '') && message.content.length === 0 ? (
            <div className="flex w-12 items-end">
              <Image
                src={AIBot.src}
                alt="ai-bot"
                aspectRatio="1:1"
                fill
                sizes="30px"
                objectFit="contain"
                className="h-12 w-12 rounded-full bg-background"
                containerHeight="auto"
              />
              <div className="flex items-center justify-center space-x-1">
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
                  'mcaption-regular14 rich-text !m-0 rounded-[20px] border p-3 text-foreground',
                  'transition-all duration-100 ease-in-out'
                )}
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                dangerouslySetInnerHTML={{ __html: html }}
              />
              {GENERATING_STATUS.includes(message.status ?? '') && (
                <div className="absolute right-2 bottom-2">
                  <Image
                    src={AIBot.src}
                    alt="ai-bot"
                    aspectRatio="1:1"
                    fill
                    sizes="16px"
                    objectFit="contain"
                    className="h-4 w-4 rounded-full bg-background"
                    containerHeight={16}
                  />
                </div>
              )}
            </div>
          )}

          {!GENERATING_STATUS.includes(message.status ?? '') && (
            <div className="flex w-fit items-center rounded-[20px] border-2 px-2">
              <Copy disabled={loading} initialMessage={message.content} contentRef={contentRef} />
              <LikeButton
                handleLike={id => {
                  console.log(id);
                }}
                messageId={message.id}
                disabled
              />
              <DisLikeButton
                handleDisLike={id => {
                  console.log(id);
                }}
                messageId={message.id}
                disabled
              />
              <Rewrite disabled={!rewrite || loading} rewrite={rewrite} messageId={message.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
