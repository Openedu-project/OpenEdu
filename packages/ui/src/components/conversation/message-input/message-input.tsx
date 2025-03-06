'use client';
import type { TAgentType } from '@oe/api/types/conversation';
import type { IFileResponse } from '@oe/api/types/file';
import { isLogin } from '@oe/api/utils/auth';
import type { z } from '@oe/api/utils/zod';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { type ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { FormWrapper } from '#components/form-wrapper';
import { useLoginRequiredStore } from '#components/login-required-modal';
import { Card } from '#shadcn/card';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { DESKTOP_BREAKPOINT, INPUT_BUTTON } from '../constants';
import type { MessageFormValues, MessageInputProps } from '../type';
import { chatSchema } from '../utils';
import { MessageInputAction } from './message-input-action';
import { InputField } from './message-input-field';
import { InputOption } from './message-input-option';
import { PreviewImage } from './preview-file';

const MessageInput: React.FC<MessageInputProps> = ({
  generating = false,
  sendMessage,
  className,
  initialMessage = '',
  messageId,
  hiddenBtn = false,
  messageType,
  images,
  resetOnSuccess = false,
}) => {
  const tAI = useTranslations('aiAssistant');
  const { selectedModel, selectedAgent, setSelectedAgent } = useConversationStore();
  const [filteredAgents, setFilteredAgents] = useState<TAgentType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { setLoginRequiredModal } = useLoginRequiredStore();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window?.innerWidth >= DESKTOP_BREAKPOINT);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!(inputRef.current && isDesktop) || document.activeElement === inputRef.current) {
      return;
    }
    inputRef.current.focus();
    inputRef.current.selectionStart = inputRef.current.value.length;
    inputRef.current.selectionEnd = inputRef.current.value.length;
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    if (filteredAgents.length > 0) {
      if ((inputRef.current?.value ?? '').startsWith('@')) {
        handleOpenAgentList(inputRef.current?.value ?? '');
      } else {
        setFilteredAgents([]);
      }
    }
  }, [selectedModel]);

  const handleOpenAgentList = (value: string) => {
    const searchText = value.split('@')?.pop()?.toLowerCase();
    const filtered = INPUT_BUTTON?.filter(
      agent =>
        tAI(agent.textKey)
          .toLowerCase()
          .includes(searchText ?? '') && messageType?.includes(agent.type)
    ).map(agent => agent.type);
    setFilteredAgents(filtered ?? []);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, form: UseFormReturn<MessageFormValues>) => {
    const message = form.getValues('message');

    if (e.nativeEvent.isComposing) {
      return;
    }
    if (message.startsWith('@')) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev < filteredAgents.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredAgents.length - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredAgents[selectedIndex]) {
            setSelectedAgent(filteredAgents[selectedIndex]);
            setFilteredAgents([]);
          }
          break;
        case 'Escape':
          setFilteredAgents([]);
          break;
        default:
          break;
      }
      return;
    }

    if (e.key === 'Enter' && !e.shiftKey && !generating) {
      e.preventDefault();
      void form.trigger();
      if (Object.keys(form.formState.errors)?.length === 0) {
        void form.handleSubmit(handleSubmit)();
        resetOnSuccess && form.reset();
      }
    } else if (message && message.trim()?.length === 0) {
      form.setValue('message', '');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (!value.startsWith('@')) {
      if (filteredAgents.length > 0) {
        setFilteredAgents([]);
      }
      return;
    }
    handleOpenAgentList(value);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const inputSchema = useMemo(() => {
    setFilteredAgents([]);
    return chatSchema;
  }, [selectedAgent]);

  const defaultValues = useMemo(() => ({ message: initialMessage ?? '', images }), [initialMessage, images]);

  const handleSubmit = async (values: z.infer<typeof inputSchema>) => {
    setFilteredAgents([]);
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
        type: selectedAgent,
        images: (values as unknown as { images: IFileResponse[] }).images,
        message_id: messageId,
      });
      inputRef.current?.focus();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className={cn('relative bg-background', className)}>
      {filteredAgents.length > 0 && (
        <div className="absolute right-0 bottom-full left-0 flex justify-center">
          <InputOption
            className="w-[95%] gap-0 rounded-t-lg border border-primary border-b-0 bg-background p-2"
            align="vertical"
            hiddenDisableAgent
            messageType={filteredAgents}
            handleSelect={opt => {
              setSelectedAgent(opt);
              setFilteredAgents([]);
            }}
            buttonClassName="border-0 justify-start gap-3 bg-transparent"
            selectedIndex={selectedIndex}
          />
        </div>
      )}
      <FormWrapper
        id="messange-input"
        resetOnSuccess={resetOnSuccess}
        schema={inputSchema}
        onSubmit={handleSubmit}
        useFormProps={{ defaultValues }}
        className="w-full"
      >
        {({ loading, form }) => {
          const imagesData = form.watch('images');
          return (
            <Card
              className={cn(
                'shadown relative flex min-h-40 flex-col gap-1 space-x-2 rounded-3xl bg-background p-2 pt-2 md:p-4',
                className
              )}
              onClick={() => {
                inputRef.current?.focus();
              }}
            >
              {Array.isArray(imagesData) && (imagesData?.length ?? 0) > 0 && (
                <PreviewImage form={form} imagesData={imagesData} />
              )}
              <InputField
                type={selectedAgent}
                form={form}
                handleKeyDown={e => {
                  handleKeyDown(e, form as UseFormReturn<MessageFormValues>);
                }}
                handleInputChange={handleInputChange}
                setInputType={setSelectedAgent}
                inputRef={inputRef}
                canChangeType={messageType && messageType.length > 1}
                className="grow"
              />
              {!hiddenBtn && <MessageInputAction form={form} loading={loading || generating} />}
            </Card>
          );
        }}
      </FormWrapper>
    </div>
  );
};

export default MessageInput;
