import type { IAIModel, IAIStatus, IMessage } from '@oe/api/types/conversation';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
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
  setGenMessage: (value: IMessage, callback?: () => void, shortenedIndex?: number) => void;
  resetGenMessage: () => void;
  resetPage: boolean;
  setResetPage: (value: boolean) => void;
}

export const useConversationStore = create<IConversationStore>(set => {
  return {
    messages: [],
    isNewChat: false,
    status: undefined,
    selectedModel: undefined,
    genMessage: undefined,
    resetPage: false,
    setResetPage: (value: boolean) =>
      set(() => {
        return { resetPage: value };
      }),
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
        let add = false;

        let newMessages = state.messages.map(message => {
          if (message.id === messageData.id) {
            add = true;
            return {
              ...message,
              ...messageData,
              content: message.content + messageData.content,
            };
          }
          return message;
        });

        if (!add) {
          newMessages = [...state.messages, messageData];
        }
        callback?.();
        return {
          messages: newMessages,
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
        return { selectedModel };
      }),

    resetStatus: () => set({ status: undefined }),

    setGenMessage: (data: IMessage, callback?: () => void, shortenedIndex?: number) => {
      set(state => {
        const newMessages = { ...data, content: (state.genMessage?.content ?? '') + data?.content };
        callback?.();

        if (!GENERATING_STATUS.includes(data?.status ?? '')) {
          return {
            messages: [...state.messages.slice(0, shortenedIndex ?? state.messages.length), newMessages],
            genMessage: undefined,
          };
        }
        return {
          genMessage: newMessages,
          messages: state.messages.slice(0, shortenedIndex ?? state.messages.length),
        };
      });
    },
    resetGenMessage: () => set({ genMessage: undefined }),
  };
});
