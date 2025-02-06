import type { ICourse } from '@oe/api/types/course/course';
import type { ISegment } from '@oe/api/types/course/segment';
import Collaborators from '@oe/assets/icons/collaborators';
import MedalStar from '@oe/assets/icons/medal-star';
import Trigger from '@oe/assets/icons/trigger';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { BookOpen, DollarSign, History, Settings, SquareUserRound } from 'lucide-react';
import type { ComponentType } from 'react';
import { isCourseInformationTabValid, isCourseOutlineTabValid } from './validation';

type CourseTab = {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  required: boolean;
  disabled?: boolean | ((course: ICourse) => boolean) | ((segments: ISegment[]) => boolean);
};

export const COURSE_DETAIL_TABS: CourseTab[] = [
  {
    id: 'information',
    label: 'courseInformation',
    icon: Settings,
    href: CREATOR_ROUTES.courseSettingUp,
    required: true,
  },
  {
    id: 'outline',
    label: 'courseOutline',
    icon: BookOpen,
    href: CREATOR_ROUTES.courseOutline,
    required: true,
    disabled: (course: ICourse) => !isCourseInformationTabValid(course),
  },
  {
    id: 'price',
    label: 'coursePrice',
    icon: DollarSign,
    href: CREATOR_ROUTES.coursePrice,
    required: true,
    disabled: (segments: ISegment[]) => !isCourseOutlineTabValid(segments),
  },
  {
    id: 'certificate',
    label: 'courseCertificate',
    icon: MedalStar,
    href: CREATOR_ROUTES.courseCertificate,
    required: false,
  },
  {
    id: 'trigger',
    label: 'courseTrigger',
    icon: Trigger,
    href: CREATOR_ROUTES.courseTriggerForm,
    required: false,
  },
  {
    id: 'collaborators',
    label: 'courseCollaborators',
    icon: Collaborators,
    href: CREATOR_ROUTES.courseCollaborators,
    required: false,
  },
  {
    id: 'learners',
    label: 'courseLearners',
    icon: SquareUserRound,
    href: CREATOR_ROUTES.courseLearners,
    required: false,
  },
  {
    id: 'history',
    label: 'courseHistory',
    icon: History,
    href: CREATOR_ROUTES.courseHistory,
    required: false,
  },
];

// export const COURSE_DETAIL_FORM_IDS = {
//   courseName: 'courseName',
//   information: 'information',
//   outline: 'outline',
//   preview: 'preview',
// };
