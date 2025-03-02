import Collaborators from '@oe/assets/icons/collaborators';
import MedalStar from '@oe/assets/icons/medal-star';
import Trigger from '@oe/assets/icons/trigger';
import type { ISvgProps } from '@oe/assets/icons/types';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { BookOpen, DollarSign, History, Settings, SquareUserRound } from 'lucide-react';
import type { ComponentType } from 'react';

type CourseTab = {
  id: string;
  label: string;
  Icon: ComponentType<ISvgProps>;
  href: string;
  required: boolean;
};

export const COURSE_DETAIL_TABS: CourseTab[] = [
  {
    id: 'information',
    label: 'tabs.courseInformation',
    Icon: Settings,
    href: CREATOR_ROUTES.courseSettingUp,
    required: true,
  },
  {
    id: 'outline',
    label: 'tabs.courseOutline',
    Icon: BookOpen,
    href: CREATOR_ROUTES.courseOutline,
    required: true,
  },
  {
    id: 'price',
    label: 'tabs.coursePrice',
    Icon: DollarSign,
    href: CREATOR_ROUTES.coursePrice,
    required: true,
  },
  {
    id: 'certificate',
    label: 'tabs.courseCertificate',
    Icon: MedalStar,
    href: CREATOR_ROUTES.courseCertificate,
    required: false,
  },
  {
    id: 'trigger',
    label: 'tabs.courseTrigger',
    Icon: Trigger,
    href: CREATOR_ROUTES.courseTriggerForm,
    required: false,
  },
  {
    id: 'collaborators',
    label: 'tabs.courseCollaborators',
    Icon: Collaborators,
    href: CREATOR_ROUTES.courseCollaborators,
    required: false,
  },
  {
    id: 'learners',
    label: 'tabs.courseLearners',
    Icon: SquareUserRound,
    href: CREATOR_ROUTES.courseLearners,
    required: false,
  },
  {
    id: 'history',
    label: 'tabs.courseHistory',
    Icon: History,
    href: CREATOR_ROUTES.courseHistory,
    required: false,
  },
];

export const COURSE_DETAIL_FORM_IDS = {
  courseName: 'courseName',
  information: 'information',
  lesson: 'lesson',
  sectionTitle: 'sectionTitle',
  certificate: 'certificate',
};
