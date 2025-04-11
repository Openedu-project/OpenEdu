import type { ICourseOutline } from '@oe/api';
import type { IFileResponse } from '@oe/api';
import type { ICoursePreviewVideo } from '@oe/api';
import { createStore } from '@oe/core';

export interface PreviewVideo extends IFileResponse {
  title: string;
}

interface CourseOutlineDetailState {
  courseOutline: ICourseOutline;
  setCourseOutline: (courseOutline?: ICourseOutline) => void;
  getPreviewLessonVideo: (courseData?: ICourseOutline) => PreviewVideo[] | undefined;
}

// Helper functions
const mergeCourseOutline = (currentOutline: ICourseOutline, newOutline?: ICourseOutline): ICourseOutline => {
  if (!newOutline) {
    return currentOutline;
  }

  return {
    ...currentOutline,
    ...newOutline,
    thumbnail: newOutline.thumbnail ?? currentOutline.thumbnail,
    is_paid: newOutline.is_paid ?? currentOutline.is_paid,
    is_enrolled: newOutline.is_enrolled ?? currentOutline.is_enrolled,
  };
};

const mapMediaToPreviewVideo = (media: IFileResponse, previewLessons?: ICoursePreviewVideo[]): PreviewVideo => {
  const matchingLesson = previewLessons?.find(lesson => lesson?.file_id === media.id);

  return matchingLesson
    ? {
        ...media,
        title: matchingLesson.title,
      }
    : { ...media, title: '' };
};

// Store
export const useCourseOutlineDetailStore = createStore<CourseOutlineDetailState>()((set, get) => ({
  courseOutline: {} as ICourseOutline,

  setCourseOutline(newOutline?: ICourseOutline) {
    set(state => ({
      courseOutline: mergeCourseOutline(state.courseOutline, newOutline),
    }));
  },

  getPreviewLessonVideo(courseData?: ICourseOutline) {
    const { courseOutline } = get();
    const { medias, props } = courseData ?? courseOutline;

    if (!medias) {
      return undefined;
    }

    return medias.map(media => mapMediaToPreviewVideo(media as IFileResponse, props?.preview_lessons ?? undefined));
  },
}));
