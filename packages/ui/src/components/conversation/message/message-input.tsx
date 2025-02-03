'use client';
import type { InputType } from '@oe/api/types/conversation';
import { type IFileResponse, fileResponseScheme } from '@oe/api/types/file';
import { usePathname } from 'next/navigation';

import { cancelConversation } from '@oe/api/services/conversation';
import { isLogin } from '@oe/api/utils/auth';
import { z } from '@oe/api/utils/zod';
import { MoveRight, Square } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { FormWrapper } from '#components/form-wrapper';
import { useLoginRequiredStore } from '#components/login-required-modal';
import { Button } from '#shadcn/button';
import { Card } from '#shadcn/card';
import { cn } from '#utils/cn';
import type { MessageFormValues, MessageInputProps } from '../type';
import { InputField } from './message-input-field';
import { InputOption } from './message-input-option';

const createFormSchema = (inputType: InputType) => {
  switch (inputType) {
    case 'image_analysis': {
      return z.object({
        message: z.string().optional(),
        images: z.array(
          fileResponseScheme.optional().refine(data => data !== undefined, {
            message: 'formValidation.required',
          })
        ),
      });
    }
    default: {
      return z.object({
        message: z.string().min(1, 'formValidation.required'),
      });
    }
  }
};

const MessageInput: React.FC<MessageInputProps> = ({
  generating = false,
  sendMessage,
  className,
  initialMessage = '',
  messageId,
  hiddenBtn = false,
  showInputOption = false,
  type = 'chat',
  messageType,
  images,
  resetOnSuccess = false,
}) => {
  const tAI = useTranslations('aiAssistant');
  const pathname = usePathname();

  const [inputType, setInputType] = useState<InputType>(type);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { setLoginRequiredModal } = useLoginRequiredStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window?.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setInputType('chat');
  }, [messageType]);

  useEffect(() => {
    if (inputRef.current && document.activeElement !== inputRef.current && !isMobile) {
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.value.length;
      inputRef.current.selectionEnd = inputRef.current.value.length;
    }
  });

  useEffect(() => {
    if (type) {
      setInputType(type);
    }
  }, [type]);

  const handleCancel = async () => {
    const id = pathname.split('/').pop();
    if (id) {
      await cancelConversation(undefined, id);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
    form: UseFormReturn<MessageFormValues>
  ) => {
    const message = form.getValues('message');

    if (e.nativeEvent.isComposing) {
      return;
    }

    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      !generating &&
      (inputType !== 'chat' || (message && message.trim()?.length > 0))
    ) {
      e.preventDefault();
      void form.trigger();
      if (Object.keys(form.formState.errors)?.length === 0) {
        void form.handleSubmit(handleSubmit)();
        resetOnSuccess && form.reset();
      }
    } else if (inputType === 'chat' && message && message.trim()?.length === 0) {
      form.setValue('message', '');
    }
  };

  const inputSchema = useMemo(() => createFormSchema(inputType), [inputType]);

  const defaultValues = useMemo(() => ({ message: initialMessage ?? '', images }), [initialMessage, images]);

  const handleSubmit = async (values: z.infer<typeof inputSchema>) => {
    if (generating) {
      return;
    }
    const login = await isLogin();

    if (!login) {
      setLoginRequiredModal(true);
      return;
    }

    const message = values.message ? values.message : tAI('messageImage');

    try {
      await sendMessage({
        messageInput: message,
        type: inputType,
        images: (values as unknown as { images: IFileResponse[] }).images,
        message_id: messageId,
      });
      inputRef.current?.focus();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className={cn('flex flex-col gap-4 bg-background', className)}>
      <FormWrapper
        id="messange-input"
        resetOnSuccess={resetOnSuccess}
        schema={inputSchema}
        onSubmit={handleSubmit}
        useFormProps={{ defaultValues }}
        className="w-full"
      >
        {({ loading, form }) => (
          <Card
            className={cn(
              'relative flex flex-row items-center space-x-2 rounded-full border border-primary bg-background p-2 pl-4',
              className
            )}
            onClick={() => {
              inputRef.current?.focus();
            }}
          >
            <InputField
              type={inputType}
              form={form}
              handleKeyDown={e => {
                handleKeyDown(e, form as UseFormReturn<MessageFormValues>);
              }}
              setInputType={setInputType}
              inputRef={inputRef}
              canChangeType={messageType && messageType.length > 1}
            />

            <div className={cn('flex items-center', hiddenBtn && 'hidden')}>
              {generating || loading ? (
                <Button
                  type="button"
                  size="icon"
                  className={cn('group/btn h-8 w-8 rounded-full bg-primary/10')}
                  onClick={handleCancel}
                >
                  <Square
                    fill="hsl(var(--primary))"
                    strokeWidth={3}
                    className="h-3 w-3 text-primary group-hover/btn:text-primary-foreground"
                  />
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="icon"
                  disabled={
                    (!form.watch('message')?.trim() && inputType === 'chat') || !form.formState.isValid || generating
                  }
                  className={cn(
                    'group/btn h-8 w-8 rounded-full bg-primary/10',
                    generating && 'cursor-not-allowed opacity-50'
                  )}
                  onClick={() => resetOnSuccess && form.reset()}
                  aria-label="Send message"
                >
                  <MoveRight strokeWidth={3} className="h-4 w-4 text-primary group-hover/btn:text-primary-foreground" />
                </Button>
              )}
            </div>
          </Card>
        )}
      </FormWrapper>

      {showInputOption && <InputOption messageType={messageType} handleSelect={opt => setInputType(opt)} />}
    </div>
  );
};

export default MessageInput;
