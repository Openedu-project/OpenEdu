import type { IAIModel, IAIStatus, IAgenConfigs, IMessage, ISourceProps, TAgentType } from '@oe/api';
import { createStore } from '@oe/core';

export const AGENT_CONFIG: Record<TAgentType, keyof IAgenConfigs> = {
  ai_slide: 'present_creator_enabled',
  ai_code: 'code_executor_enabled',
  ai_image_generate: 'image_generator_enabled',
  ai_search: 'searcher_enabled',
};

interface IConversationStore {
  messages: IMessage[];
  isNewChat: boolean;
  status?: IAIStatus;
  selectedModel?: IAIModel;
  setMessages: (value: IMessage[]) => void;
  resetMessages: () => void;
  updateMessages: (value: IMessage, index?: number, callback?: () => void, id?: string) => void;
  addMessage: (messageData: IMessage, callback?: () => void) => void;
  setIsNewChat: (value: boolean) => void;
  setStatus: (value: IAIStatus) => void;
  setSelectedModel: (value?: IAIModel) => void;
  resetStatus: () => void;
  genMessage?: IMessage;
  setGenMessage: (value: IMessage, callback?: () => void, reset?: boolean, shortenedIndex?: number) => void;
  resetGenMessage: () => void;
  selectedAgent: TAgentType;
  setSelectedAgent: (agent: TAgentType) => void;
  openWebSource: { messageId: string; isOpen: boolean; sourceList?: ISourceProps[] };
  setOpenWebSource: (openWebSource: { messageId: string; isOpen: boolean; sourceList?: ISourceProps[] }) => void;
  resetOpenWebSource: () => void;
  width: number;
  setWidth: (width: number) => void;
  thinking: boolean;
  setThinking: (thinking: boolean) => void;
  resetPage: boolean;
  setResetPage: (resetPage: boolean) => void;
  newConversationId: string;
  setNewConversationId: (id: string) => void;
}

export const useConversationStore = createStore<IConversationStore>(set => {
  return {
    messages: [],
    isNewChat: false,
    status: undefined,
    selectedModel: undefined,
    genMessage: undefined,
    setMessages: (messages: IMessage[]) =>
      set(() => {
        return { messages };
      }),
    updateMessages: (messageData: IMessage, index?: number, callback?: () => void, id?: string) =>
      set(state => {
        const newChatMessages = id
          ? state.messages.map(msg => {
              if (msg.id === id) {
                return messageData;
              }
              return msg;
            })
          : [...state.messages.slice(0, index ?? state.messages.length), messageData];

        callback?.();

        return {
          messages: newChatMessages,
        };
      }),
    addMessage: (messageData: IMessage, callback?: () => void) =>
      set(state => {
        callback?.();
        return {
          messages: [...state.messages, messageData],
        };
      }),
    resetMessages: () => set({ messages: [] }),
    setIsNewChat: (isNewChat: boolean) =>
      set(() => {
        return { isNewChat };
      }),
    setStatus: (status: IAIStatus) =>
      set(() => {
        return { status };
      }),

    setSelectedModel: (selectedModel?: IAIModel) =>
      set(state => {
        const currentSelectedAgent = state.selectedAgent;
        const updatedAgent = selectedModel?.configs?.[AGENT_CONFIG[currentSelectedAgent]]
          ? currentSelectedAgent
          : 'ai_search';
        return { selectedModel, selectedAgent: updatedAgent };
      }),

    resetStatus: () => set({ status: undefined }),

    setGenMessage: (data: IMessage, callback?: () => void, reset?: boolean, shortenedIndex?: number) => {
      set(state => {
        const newMessage = reset
          ? data
          : {
              ...data,
              props: data.props ?? state.genMessage?.props,
              content: (state.genMessage?.content ?? '') + data?.content,
              reasoning: (state.genMessage?.reasoning ?? '') + data?.reasoning,
            };
        callback?.();
        if (!shortenedIndex) {
          return {
            genMessage: newMessage,
          };
        }
        return {
          genMessage: newMessage,
          messages: state.messages.slice(0, shortenedIndex),
        };
      });
    },
    resetGenMessage: () => set({ genMessage: undefined, status: undefined }),
    selectedAgent: 'ai_search',
    setSelectedAgent: (selectedAgent: TAgentType) =>
      set(() => {
        return { selectedAgent };
      }),
    openWebSource: { messageId: '', isOpen: false, sourceList: undefined },
    setOpenWebSource: (openWebSource: { messageId: string; isOpen: boolean; sourceList?: ISourceProps[] }) =>
      set(() => {
        return { openWebSource };
      }),
    resetOpenWebSource: () => set({ openWebSource: { messageId: '', isOpen: false, sourceList: [] } }),
    width: 0,
    setWidth: (width: number) =>
      set(() => {
        return { width };
      }),
    thinking: false,
    setThinking: (thinking: boolean) => {
      set(() => {
        return { thinking };
      });
    },
    resetPage: false,
    setResetPage: (resetPage: boolean) => {
      set(() => {
        return { resetPage };
      });
    },
    newConversationId: '',
    setNewConversationId: (newConversationId: string) => {
      set(() => {
        return { newConversationId };
      });
    },
  };
});
