export type IFeedbackStatus = 'approved' | 'feedback' | 'rejected';
export interface IDiscussion {
  id: string;
  email: string;
  username: string;
  content: string;
  send_date: number;
  entity_id: string;
  entity_version: number;
  action: IFeedbackStatus;
}

export interface IDiscussionRequest extends Pick<IDiscussion, 'id' | 'content'> {
  entity_id?: string; //optional, add entity_id when reply-feedback with this course version
}
