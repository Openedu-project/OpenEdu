'use client';
import type { InputType } from '@oe/api/types/conversation';
import { type IFileResponse, fileResponseScheme } from '@oe/api/types/file';
import { usePathname } from 'next/navigation';

import { cancelConversation } from '@oe/api/services/conversation';
import { isLogin } from '@oe/api/utils/auth';
import { z } from '@oe/api/utils/zod';
import { Image } from '@oe/ui/components/image';
import { CircleX, FileUp, Image as ImageIcon, MoveRight, Square, Unlink2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { FormWrapper } from '#components/form-wrapper';
import { useLoginRequiredStore } from '#components/login-required-modal';
import { Uploader } from '#components/uploader';
import { Button } from '#shadcn/button';
import { Card } from '#shadcn/card';
import { FormFieldWithLabel } from '#shadcn/form';
import { cn } from '#utils/cn';
import type { ISendMessageParams } from '../type';

interface FormValues {
  message: string;
  images?: IFileResponse[];
}

export interface MessageInputProps {
  generating?: boolean;
  sendMessage: ({
    messageInput,
    type,
    url,
    images,
    message_id,
    role,
    // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  }: ISendMessageParams) => void | Promise<unknown>;
  className?: string;
  placeholder?: string;
  initialMessage?: string;
  messageId?: string;
  hiddenBtn?: boolean;
  type?: InputType;
  showInputOption?: boolean;
  messageType?: InputType[];
  images?: IFileResponse[];
}

type InputFieldProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  type: InputType;
  handleKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  setInputType: (value: InputType) => void;
  inputRef: React.RefObject<null | HTMLTextAreaElement>;
  canChangeType?: boolean;
};
interface IInputButton {
  type: InputType;
  textKey: string;
  icon: ReactNode;
}

const INPUT_BUTTON: IInputButton[] = [
  {
    type: 'image_analysis',
    textKey: 'imageAnalysis',
    icon: <ImageIcon size={16} className="text-[#FD77F3]" />,
  },
  {
    type: 'scrap_from_url',
    textKey: 'scrapURLLink',
    icon: <Unlink2 size={16} className="text-[#FFBD04]" />,
  },
];

const InputField = <TFormValues extends FieldValues>({
  form,
  type,
  handleKeyDown,
  setInputType,
  inputRef,
  canChangeType,
}: InputFieldProps<TFormValues>) => {
  const tAI = useTranslations('aiAssistant');

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    form.reset();
  }, [type]);

  switch (type) {
    case 'image_analysis': {
      const buttonData = INPUT_BUTTON.find(button => button.type === 'image_analysis');

      return (
        <div className="relative flex w-full items-center justify-center gap-2">
          <div className="flex shrink-0 items-center gap-1 border-r px-1">
            {buttonData?.icon}
            <p className="mcaption-semibold12 hidden lg:block">{tAI(buttonData?.textKey)}</p>

            {canChangeType && (
              <Button
                variant="ghost"
                type="button"
                size="icon"
                className="!p-2 h-8 w-8"
                onClick={() => setInputType('chat')}
              >
                <CircleX className="h-4 w-4" />
              </Button>
            )}
          </div>

          <FormFieldWithLabel name={'message' as Path<TFormValues>} className="w-full">
            <TextareaAutosize
              onKeyDown={handleKeyDown}
              placeholder={tAI('messageImage')}
              className={cn(
                'mcaption-regular12 lg:mcaption-regular14 block h-[20px] w-full resize-none bg-transparent focus-within:outline-none'
              )}
              maxRows={4}
              ref={inputRef}
            />
          </FormFieldWithLabel>

          <FormFieldWithLabel
            name={'images' as Path<TFormValues>}
            render={({ field }) => (
              <>
                {field.value?.length > 0 && (
                  <div className="horizontal-scrollbar absolute bottom-[40px] left-0 flex w-full overflow-x-auto">
                    <div className="flex items-center gap-2 rounded-lg bg-foreground/30 p-2">
                      {(field.value as IFileResponse[]).map(image => (
                        <div key={image.id} className="relative h-[90px] w-[160px] shrink-0">
                          <Image
                            className="absolute rounded-lg object-cover"
                            alt="screen-shot"
                            fill
                            sizes="160px"
                            noContainer
                            src={image?.url}
                          />
                          <Button
                            variant="ghost"
                            type="button"
                            size="icon"
                            className="!p-0 absolute top-0 right-0 h-[16px] w-[16px] rounded-full bg-foreground/40 hover:bg-foreground/50"
                            onClick={() => {
                              field.onChange((field.value as IFileResponse[])?.filter(item => item.id !== image.id));
                            }}
                          >
                            <CircleX width={16} height={16} color="hsl(var(--background)) h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="relative h-full grow">
                  <div className="h-[16px] w-[16px] overflow-hidden">
                    <FileUp className="absolute h-4 w-4" />
                    <Uploader
                      multiple
                      listType="picture"
                      value={field.value}
                      onChange={field.onChange}
                      fileListVisible={false}
                      accept="image/*"
                      className="overflow-hidden opacity-0"
                    />
                  </div>
                </div>
              </>
            )}
          />
        </div>
      );
    }
    case 'scrap_from_url': {
      const buttonData = INPUT_BUTTON.find(button => button.type === 'scrap_from_url');

      return (
        <>
          <div className="flex shrink-0 items-center gap-1 border-r">
            {buttonData?.icon}
            <p className="mcaption-semibold12 hidden lg:block">{tAI(buttonData?.textKey)}</p>

            {canChangeType && (
              <Button
                variant="ghost"
                type="button"
                size="icon"
                className="!p-2 h-8 w-8"
                onClick={() => setInputType('chat')}
              >
                <CircleX className="h-4 w-4" />
              </Button>
            )}
          </div>
          <FormFieldWithLabel name={'message' as Path<TFormValues>} className="w-full">
            <TextareaAutosize
              onKeyDown={handleKeyDown}
              placeholder={tAI('messageImage')}
              className={cn(
                'mcaption-regular12 lg:mcaption-regular14 block h-[20px] w-full resize-none bg-transparent focus-within:outline-none'
              )}
              maxRows={4}
              ref={inputRef}
            />
          </FormFieldWithLabel>
        </>
      );
    }
    default: {
      return (
        <FormFieldWithLabel name={'message' as Path<TFormValues>} className="w-full">
          <TextareaAutosize
            onKeyDown={handleKeyDown}
            placeholder={tAI('messageImage')}
            className={cn(
              'mcaption-regular12 lg:mcaption-regular14 block h-[20px] w-full resize-none bg-transparent focus-within:outline-none'
            )}
            maxRows={4}
            ref={inputRef}
          />
        </FormFieldWithLabel>
      );
    }
  }
};

const createFormSchema = (inputType: InputType) => {
  switch (inputType) {
    // case 'scrap_from_url': {
    //   return z.object({
    //     link: z.string().min(1, 'errors.isRequired'),
    //   });
    // }
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
}) => {
  const tAI = useTranslations('aiAssistant');
  const pathname = usePathname();

  const [inputType, setInputType] = useState(type);
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
    form: UseFormReturn<FormValues>
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
        form.reset();
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
    if (!isLogin) {
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
        resetOnSuccess
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
                handleKeyDown(e, form as UseFormReturn<FormValues>);
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
                  onClick={() => form.reset()}
                  aria-label="Send message"
                >
                  <MoveRight strokeWidth={3} className="h-4 w-4 text-primary group-hover/btn:text-primary-foreground" />
                </Button>
              )}
            </div>
          </Card>
        )}
      </FormWrapper>

      {showInputOption && (
        <div className="flex gap-2">
          {INPUT_BUTTON.filter(button => messageType?.includes(button.type)).map(button => (
            <Button
              key={button.type}
              variant="ghost"
              type="button"
              className="!rounded-full before:!rounded-full relative flex items-center gap-1 border border-primary bg-primary/5 before:absolute before:z-[-1] before:h-full before:w-full before:bg-white before:content-['']"
              onClick={() => {
                setInputType(button.type);
              }}
            >
              {button.icon}
              <span className="mcaption-semibold12 hidden md:block">{tAI(button.textKey)}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageInput;
