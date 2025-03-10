import type { IAIModel, IAIStatus, IMessage, ISourceProps, TAgentType } from '@oe/api/types/conversation';
import { create } from 'zustand';
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
  setSelectedModel: (value: IAIModel) => void;
  resetStatus: () => void;
  genMessage?: IMessage;
  setGenMessage: (value: IMessage, callback?: () => void, reset?: boolean, shortenedIndex?: number) => void;
  resetGenMessage: () => void;
  selectedAgent: TAgentType;
  setSelectedAgent: (agent: TAgentType) => void;
  openWebSource: { messageId: string; isOpen: boolean; sourceList?: ISourceProps[] };
  setOpenWebSource: (openWebSource: { messageId: string; isOpen: boolean; sourceList?: ISourceProps[] }) => void;
  resetOpenWebSource: () => void;
}

export const useConversationStore = create<IConversationStore>(set => {
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

    setSelectedModel: (selectedModel: IAIModel) =>
      set(() => {
        return { selectedModel, selectedAgent: 'ai_search' };
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
            };
        callback?.();

        return {
          genMessage: newMessage,
          messages: state.messages.slice(0, shortenedIndex ?? state.messages.length),
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
  };
});
