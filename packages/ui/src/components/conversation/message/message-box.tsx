'use client';

import type { IMessage, InputType } from '@oe/api/types/conversation';
import AIBot from '@oe/assets/images/ai-bot.png';
import Openedu from '@oe/assets/images/openedu.png';

import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { marked } from '@oe/core/utils/marker';
import { BookCopy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { Link } from '#common/navigation';
import { Image } from '#components/image';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';
import DisLikeButton from '../message-actions/dislike';
import EditButton from '../message-actions/edit';
import Rewrite from '../message-actions/rewrite';
import type { ISendMessageParams } from '../type';
import MessageInput from './message-input';
import '../highlight.css';
import Copy from '../message-actions/copy';
import LikeButton from '../message-actions/like';

const convertTextWithLink = (text: string) => {
  const urlRegex = /(https?:\/\/\S+)|(www\.\S+)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  // Find all matches and build the parts array
  text.replaceAll(urlRegex, (match, _, __, index: number) => {
    // Add text before the match
    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index));
    }

    // Add the link
    const fullUrl = match.startsWith('www.') ? `https://${match}` : match;

    parts.push(
      <Link
        key={index}
        href={fullUrl}
        target="_blank"
        className="!p-0 whitespace-normal text-primary underline hover:text-primary/80"
      >
        {match}
      </Link>
    );

    lastIndex = index + match.length;
    return match;
  });
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

const MessageBox = ({
  id,
  message,
  loading,
  rewrite,
  sendMessage,
  messageType,
}: {
  id?: string;
  message: IMessage;
  loading: boolean;
  rewrite?: () => void;
  sendMessage: ({
    messageInput,
    type,
    url,
    images,
    message_id,
    role,
    // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  }: ISendMessageParams) => void | Promise<unknown>;
  messageType?: InputType[];
}) => {
  const [parsedMessage, setParsedMessage] = useState<string>(message.content);
  const [isEdit, setIsEdit] = useState(false);

  const tAction = useTranslations('general');

  useEffect(() => {
    const regex = /\[(\d+)]/g;

    if (message.sender?.role === 'assistant' && message?.sources && message.sources.length > 0) {
      return setParsedMessage(
        message.content.replaceAll(
          regex,
          (_, number) =>
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `<a href="${
              message.sources?.[number - 1]?.metadata?.url
            }" target="_blank" className="bg-light-secondary dark:bg-dark-secondary px-1 rounded ml-1 no-underline text-xs text-black/70 dark:text-white/70 relative">${number}</a>`
        )
      );
    }

    setParsedMessage(message.content);
  }, [message]);

  const html = useMemo(() => marked.parse(parsedMessage), [parsedMessage]);

  return (
    <div className="py-2" id={id}>
      {message?.sender?.role === 'user' && (
        <div className={cn('group flex w-full items-center justify-end gap-2 pt-2')}>
          {(!message.configs?.is_image_analysis || messageType?.includes('image_analysis')) && !loading && (
            <EditButton
              className={isEdit ? 'hidden' : 'hidden group-hover:flex'}
              handleEdit={() => {
                setIsEdit(true);
              }}
              messageId={message.id}
            />
          )}

          {isEdit ? (
            <div
              className={cn(
                'flex w-full flex-col items-end justify-end gap-2 rounded-2xl bg-background p-2 md:w-3/4',
                message.configs?.is_image_analysis && 'pt-[130px]'
              )}
            >
              <MessageInput
                className="w-full"
                sendMessage={({ messageInput, images }) => {
                  void sendMessage({
                    messageInput,
                    type: message.configs?.is_image_analysis ? 'image_analysis' : 'chat',
                    message_id: message.id,
                    images,
                  });
                  setIsEdit(false);
                }}
                initialMessage={message.content}
                type={message.configs?.is_image_analysis ? 'image_analysis' : 'chat'}
                images={message.attachments}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                {tAction('cancel')}
              </Button>
            </div>
          ) : (
            <div
              className={cn(
                'mcaption-semibold14 max-w-full whitespace-pre-line rounded-[20px] bg-primary/10 px-4 py-2 text-foreground lg:max-w-[80%]',
                'before:!rounded-[20px] before:absolute before:right-0 before:z-[-1] before:h-full before:w-full before:bg-white before:content-[""]'
              )}
            >
              {convertTextWithLink(message.content)}
              {message.attachments && (
                <div className="flex justify-center gap-2">
                  {message.attachments.map(image => (
                    <Link
                      key={image.id}
                      className="relative mt-2 block aspect-video h-auto w-[150px] rounded-lg border bg-background md:w-[200px]"
                      href={image?.url}
                      target="_blank"
                    >
                      <Image
                        className="absolute rounded-lg"
                        alt="screen-shot"
                        sizes="160px"
                        noContainer
                        objectFit="contain"
                        style={{ objectPosition: 'center' }}
                        src={image?.url}
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {message.sender?.role === 'assistant' && (
        <div className="flex flex-col space-y-9 lg:flex-row lg:justify-between lg:space-x-9 lg:space-y-0">
          <div className={cn('flex flex-col space-y-6', !message.content && 'basis-full')}>
            {message.sources && message.sources.length > 0 && (
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-center space-x-2">
                  <BookCopy className="text-black dark:text-white" size={20} />
                  <h3 className="font-medium text-black text-xl dark:text-white">Sources</h3>
                </div>
                {/* <MessageSources sources={message.sources} /> */}
              </div>
            )}
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
                  <Copy disabled={loading} message={message} initialMessage={message.content} />
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
      )}
    </div>
  );
};

export default MessageBox;
