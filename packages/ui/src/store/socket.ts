import type {
  EventData,
  IAIBlogStatusData,
  IAICourseStatusData,
  IAIDocumentStatusData,
  IBadgeEventData,
  ICertificateEventData,
  ICourseEventData,
  IPaymentEventData,
  ISocketRes,
  ISocketStore,
} from '@oe/api';
import { createStore } from '@oe/core';

type ISocketKey =
  | 'badge'
  | 'course'
  | 'payment'
  | 'notification'
  | 'certificate'
  | 'ai_blog_status'
  | 'ai_course_status'
  | 'ai_chat_document_status';

export const useSocketStore = createStore<ISocketStore>(set => {
  return {
    badgeData: null,
    courseData: null,
    paymentData: null,
    notificationData: null,
    certificateData: null,
    AIBlogStatusData: null,
    AICourseStatusData: null,
    messageData: [],
    AIDocumentStatusData: null,
    setSocketData: <T extends EventData>(data: ISocketRes<T>) =>
      set(state => {
        switch (data.event) {
          case 'badge': {
            return { ...state, badgeData: data as ISocketRes<IBadgeEventData> };
          }
          case 'course': {
            return { ...state, courseData: data as ISocketRes<ICourseEventData> };
          }
          case 'payment': {
            return { ...state, paymentData: data as ISocketRes<IPaymentEventData> };
          }
          case 'notification': {
            return { ...state, notificationData: data as ISocketRes<IPaymentEventData> };
          }
          case 'certificate': {
            return { ...state, certificateData: data as ISocketRes<ICertificateEventData> };
          }
          case 'ai_blog_status': {
            return { ...state, AIBlogStatusData: data as ISocketRes<IAIBlogStatusData> };
          }
          case 'ai_course_status': {
            return { ...state, AICourseStatusData: data as ISocketRes<IAICourseStatusData> };
          }
          case 'ai_chat_document_status': {
            return { ...state, AIDocumentStatusData: data as ISocketRes<IAIDocumentStatusData> };
          }

          default: {
            console.warn(`Unhandled event type: ${data.event}`);
            return state;
          }
        }
      }),
    resetSocketData: (key: ISocketKey) =>
      set(state => {
        switch (key) {
          case 'badge': {
            return { ...state, badgeData: null };
          }
          case 'course': {
            return { ...state, courseData: null };
          }
          case 'payment': {
            return { ...state, paymentData: null };
          }
          case 'notification': {
            return { ...state, paymentData: null };
          }
          case 'certificate': {
            return { ...state, certificateData: null };
          }
          case 'ai_blog_status': {
            return { ...state, AIBlogStatusData: null };
          }
          case 'ai_course_status': {
            return { ...state, AICourseStatusData: null };
          }
          case 'ai_chat_document_status': {
            return { ...state, AIDocumentStatusData: null };
          }

          default: {
            console.warn(`Unhandled reset key: ${key}`);
            return state;
          }
        }
      }),
  };
});
