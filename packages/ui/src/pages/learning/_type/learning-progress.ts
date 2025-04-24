import type { ILessonLearningProgress, ISectionLearningProgress } from '@oe/api';

export interface ILessonLearningProgressByUid {
  [lesson_uid: string]: ILessonLearningProgress;
}

export interface ISectionLearningProgressByUid {
  [section_uid: string]: Omit<ISectionLearningProgress, 'lessons'> & {
    lesson_by_uid: ILessonLearningProgressByUid;
  };
}

export interface IMergedLearningProgress {
  sections: ISectionLearningProgress[];
  section_by_uid: ISectionLearningProgressByUid;
  all_lessons: ILessonLearningProgress[];
  lesson_by_uid: {
    [lesson_uid: string]: ILessonLearningProgress & {
      section_uid: string;
      global_index: number;
    };
  };
  total_lessons: number;
  completed_lessons: number;
}
