'use client';
import { useTranslations } from 'next-intl';
import { type ReactNode, useState } from 'react';
import { Link } from '#common/navigation';
import { Image } from '#components/image';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';
import EditButton from '../message-actions/edit';
import MessageInput from '../message-input/message-input';
import type { IMessageBoxProps } from '../type';

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

export const UserMessage = ({ message, loading, sendMessage, messageType }: IMessageBoxProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const tAction = useTranslations('general');

  return (
    <div className={cn('group flex w-full items-center justify-end gap-2 pt-2')}>
      {(!message.ai_agent_type || messageType?.includes(message.ai_agent_type)) && !loading && (
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
            message.ai_agent_type === 'ai_image_analysis' && 'pt-[130px]'
          )}
        >
          <MessageInput
            className="w-full"
            sendMessage={({ messageInput, images }) => {
              void sendMessage({
                messageInput,
                type: message.ai_agent_type,
                message_id: message.id,
                images,
              });
              setIsEdit(false);
            }}
            initialMessage={message.content}
            type={message.ai_agent_type}
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
            'mcaption-semibold14 max-w-full whitespace-pre-line rounded-xl border bg-primary/10 p-4 text-foreground lg:max-w-[80%]',
            'before:!rounded-xl before:absolute before:right-0 before:z-[-1] before:h-full before:w-full before:bg-white before:content-[""]'
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
                    fill
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
  );
};
