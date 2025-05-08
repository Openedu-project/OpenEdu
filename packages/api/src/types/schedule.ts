import type { HTTPPagination } from './fetch';

export interface ISchedule {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  name: string;
  description: string;
  start_at: number;
  end_at: number;
  org_id: string;
  events: IScheduleEvent[];
}
export interface ISchedulePayload {
  name: string;
  description: string;
  start_at: number;
  end_at: number;
}
export interface IScheduleEvent {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  schedule_id: string;
  name: string;
  description: string;
  location: string;
  start_at: number;
  end_at: number;
  join_link: string;
  event_type: string;
}
export interface IScheduleEventPayload {
  name: string;
  description: string;
  start_at: number;
  end_at: number;
  location: string;
  join_link: string;
  event_type: string;
  schedule_id: string;
}

export interface IScheduleEventRes extends HTTPPagination<IScheduleEvent> {}
