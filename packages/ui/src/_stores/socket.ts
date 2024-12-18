import type {
  EventData,
  IAIBlogStatusData,
  IAICourseStatusData,
  IBadgeEventData,
  ICertificateEventData,
  ICourseEventData,
  IPaymentEventData,
  ISocketRes,
  ISocketStore,
} from '@oe/api/types/socket';
import { create } from 'zustand';

type ISocketKey =
  | 'badge'
  | 'course'
  | 'payment'
  | 'notification'
  | 'certificate'
  | 'ai_blog_status'
  | 'ai_course_status';

export const useSocketStore = create<ISocketStore>(set => {
  return {
    badgeData: null,
    courseData: null,
    paymentData: null,
    notificationData: null,
    certificateData: null,
    AIBlogStatusData: null,
    AICourseStatusData: null,
    messageData: [],
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

          default: {
            console.warn(`Unhandled reset key: ${key}`);
            return state;
          }
        }
      }),
  };
});
