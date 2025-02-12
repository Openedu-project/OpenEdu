import { create } from 'zustand';

interface IAICourseInfo {
  courseId?: string;
  title?: string;
  description?: string;
  thumbnail_included?: boolean;
  thumbnail_desc?: string;
  thumbnail_id?: string;
}
interface IEditAICourseInfo {
  courseInfo?: IAICourseInfo;
  setCourseInfo: (courseInfo: IAICourseInfo) => void;
}

export const useEditAICourseInfo = create<IEditAICourseInfo>(set => {
  return {
    courseInfo: {
      title: '',
      description: '',
      thumbnail_included: false,
      thumbnail_id: '',
    },
    setCourseInfo: (courseInfo: IAICourseInfo) =>
      set(() => {
        return { courseInfo };
      }),
  };
});
