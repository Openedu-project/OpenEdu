import type { ILesson, ISection } from './segment';

export interface ILearningProgressOverview {
  total_lessons: number;
  completed_lessons: number;
  current_section: ISection;
  current_lesson: ILesson;
}
