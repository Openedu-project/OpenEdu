import type { ICourseOutline } from '@oe/api/types/course/course';
import type { FormTriggerCondition, IFormTrigger } from '@oe/api/types/course/course-trigger';
import type { ISection } from '@oe/api/types/course/segment';
import { ACTION_TYPES, type ActionType, type CourseActionProps } from './types';

// Helper functions
export const findFormRelationByEntityId = (formRelations: IFormTrigger[], entityId: string) =>
  formRelations.find(relation => relation.start_when.entity_id === entityId && relation.enabled && !relation.submitted);

const checkActivedTrigger = ({
  relations,
  entityId,
  type,
}: {
  relations?: IFormTrigger[];
  entityId?: string;
  type?: FormTriggerCondition;
}) => {
  if (relations && entityId && type) {
    const currentTrigger = findFormRelationByEntityId(relations, entityId);

    return !!(currentTrigger && currentTrigger.submitted === false && currentTrigger?.start_when?.type === type);
  }
};

export const determineAction = ({
  is_pay,
  is_paid,
  is_enrolled,
  form_relations,
  entityId,
}: CourseActionProps): ActionType => {
  if (is_pay && !is_paid && !is_enrolled) {
    return ACTION_TYPES.PAY_NOT_PAID;
  }
  if ((!is_pay && is_enrolled) || (is_paid && is_enrolled)) {
    return ACTION_TYPES.NOT_PAY_ENROLLED;
  }
  if (!is_enrolled && checkActivedTrigger({ relations: form_relations, entityId, type: 'clicked_on' })) {
    return ACTION_TYPES.TRIGGER;
  }

  return ACTION_TYPES.DEFAULT;
};

export const hasValidOutlineItems = (courseData?: ICourseOutline): boolean => {
  if (!courseData) {
    return false;
  }
  // Helper to check if a section is valid (has lessons)
  const isValidSection = (section: ISection): boolean => {
    return Array.isArray(section.lessons) && section.lessons.length > 0;
  };

  // Check if course has outline and at least one valid section with lessons
  return Array.isArray(courseData.outline) && courseData.outline.length > 0 && courseData.outline.some(isValidSection);
};

export const getFirstLessonInfo = (courseData?: ICourseOutline) => {
  if (!hasValidOutlineItems(courseData)) {
    return null;
  }
  // Get first section by order
  const firstSection = [...(courseData?.outline || [])].sort((a, b) => a.order - b.order)[0];

  if (firstSection?.lessons?.length === 0) {
    return null;
  }

  // Get first lesson by order
  const firstLesson = [...(firstSection?.lessons || [])].sort((a, b) => a.order - b.order)[0];

  return {
    lessonUid: firstLesson?.uid,
    sectionUid: firstSection?.uid,
  };
};
