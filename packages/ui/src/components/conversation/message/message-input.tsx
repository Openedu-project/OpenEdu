'use client';
import { type IFileResponse, fileResponseSchema } from '@oe/api/types/file';
import { usePathname } from 'next/navigation';

import { cancelConversation } from '@oe/api/services/conversation';
import type { TAgentType } from '@oe/api/types/conversation';
import { isLogin } from '@oe/api/utils/auth';
import { z } from '@oe/api/utils/zod';
import { MoveRight, Square } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { type ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { FormWrapper } from '#components/form-wrapper';
import { useLoginRequiredStore } from '#components/login-required-modal';
import { Button } from '#shadcn/button';
import { Card } from '#shadcn/card';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { INPUT_BUTTON } from '../constants';
import type { MessageFormValues, MessageInputProps } from '../type';
import { InputField } from './message-input-field';
import { InputOption } from './message-input-option';

const createFormSchema = (inputType: TAgentType) => {
  switch (inputType) {
    case 'ai_image_analysis': {
      return z.object({
        message: z.string().min(1, 'formValidation.required'),
        images: z.array(
          fileResponseSchema.optional().refine(data => data !== undefined, {
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
  messageType,
  images,
  resetOnSuccess = false,
}) => {
  const tAI = useTranslations('aiAssistant');
  const pathname = usePathname();
  const { selectedModel, selectedAgent, setSelectedAgent } = useConversationStore();
  const [filteredAgents, setFilteredAgents] = useState<TAgentType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { setLoginRequiredModal } = useLoginRequiredStore();

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

  const handleCancel = async () => {
    const id = pathname.split('/').pop();
    if (id) {
      await cancelConversation(undefined, id);
    }
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

  const inputSchema = useMemo(() => {
    setFilteredAgents([]);
    return createFormSchema(selectedAgent);
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
              type={selectedAgent}
              form={form}
              handleKeyDown={e => {
                handleKeyDown(e, form as UseFormReturn<MessageFormValues>);
              }}
              handleInputChange={handleInputChange}
              setInputType={setSelectedAgent}
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
                  disabled={!form.formState.isValid || generating}
                  className={cn(
                    'group/btn h-8 w-8 rounded-full bg-primary/10',
                    generating && 'cursor-not-allowed opacity-50'
                  )}
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
        <InputOption className="mt-4" messageType={messageType} handleSelect={opt => setSelectedAgent(opt)} />
      )}
    </div>
  );
};

export default MessageInput;
