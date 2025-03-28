'use client';
import { useTranslations } from 'next-intl';
import { type ReactNode, useState } from 'react';
import { Link } from '#common/navigation';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';
import EditButton from '../message-actions/edit';
import MessageInput from '../message-input/message-input';
import { PreviewDocument, PreviewImage } from '../message-input/preview-file';
import type { IMessageBoxProps } from '../type';

export const convertTextWithLink = (text: string): ReactNode[] => {
  // Regular expression to match URLs - avoid capturing trailing punctuation
  const urlRegex = /(\bhttps?:\/\/[^\s,]+)|\b(www\.[^\s,]+)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  // Find all matches and build the parts array
  text.replace(urlRegex, (match, _, __, index: number) => {
    // Add text before the match
    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index));
    }

    // Clean up the URL if it ends with unwanted punctuation
    let cleanMatch = match;
    const unwantedEndings = ['.', ',', ')', ']', ';', ':', '"', "'"];

    for (const char of unwantedEndings) {
      if (cleanMatch.endsWith(char)) {
        cleanMatch = cleanMatch.slice(0, -1);
        break;
      }
    }

    // Add the link - ensure www. links have https:// prefix
    const fullUrl = cleanMatch.startsWith('www.') ? `https://${cleanMatch}` : cleanMatch;

    parts.push(
      <Link
        key={`link-${index}`}
        href={fullUrl}
        target="_blank"
        className="!p-0 h-auto whitespace-normal break-all text-primary underline hover:text-primary/80"
      >
        {cleanMatch}
      </Link>
    );

    lastIndex = index + match.length;
    return match;
  });

  // Add any remaining text after the last match
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
        <div className={cn('flex w-full flex-col items-end justify-end gap-2 rounded-2xl bg-background p-2 md:w-3/4')}>
          <MessageInput
            className="w-full"
            sendMessage={({ messageInput, files }) => {
              void sendMessage({
                messageInput,
                type: message.ai_agent_type,
                message_id: message.id,
                files,
              });
              setIsEdit(false);
            }}
            initialMessage={message.content}
            type={message.ai_agent_type}
            files={message.attachments}
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
            'mcaption-semibold14 max-w-[90%] whitespace-pre-line rounded-xl border bg-primary/10 p-4 text-foreground',
            'before:!rounded-xl before:absolute before:right-0 before:z-[-1] before:h-full before:w-full before:bg-white before:content-[""]'
          )}
        >
          {convertTextWithLink(message.content)}
          {message.attachments && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.attachments.map((image, index) =>
                image.mime.includes('image') ? (
                  <Link
                    key={image.id}
                    className="relative block h-[120px] w-[120px] rounded-lg bg-background p-0"
                    href={image?.url}
                    target="_blank"
                  >
                    <PreviewImage key={image.id} file={image} viewOnly filePosition={index} />
                  </Link>
                ) : (
                  <PreviewDocument key={image.id} file={image} viewOnly filePosition={index} />
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
