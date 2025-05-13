import type { ILessonContent } from '@oe/api';
import type { ILessonSchema } from '@oe/api';
import type { TFunction } from '@oe/i18n';

export const hasContent = (lessonContent: ILessonContent | null) => {
  if (!lessonContent) {
    return false;
  }

  return (
    lessonContent.content?.length > 0 ||
    (lessonContent.files?.length ?? 0) > 0 ||
    (lessonContent.quizzes?.length ?? 0) > 0
  );
};

export const validateForm = (lesson: ILessonSchema, tCourse: TFunction) => {
  const errors = {
    lessonErrors: [] as string[],
    contentErrors: {} as Record<string, string[]>,
    quizErrors: {} as Record<string, string[]>,
  };

  if (!lesson.title) {
    errors.lessonErrors.push(tCourse('validation.lesson.title'));
  }

  if ((lesson.contents?.length ?? 0) > 0) {
    lesson.contents?.forEach((content, idx) => {
      const contentErrors: string[] = [];

      switch (content.type) {
        case 'video':
        case 'pdf':
          if ((content.files?.length ?? 0) === 0) {
            contentErrors.push(tCourse(`validation.content.${content.type}Required`));
          }
          break;
        case 'text': {
          const plainText = content.content.replace(/<[^>]*>/g, '');
          if ((plainText?.length ?? 0) === 0) {
            contentErrors.push(tCourse(`validation.content.${content.type}Required`));
          }
          break;
        }
        case 'embedded':
          if (!content.content) {
            contentErrors.push(tCourse('validation.content.required'));
          }
          break;
        case 'quiz':
          if ((content.quizzes?.length ?? 0) === 0) {
            contentErrors.push(
              tCourse('validation.minItems', {
                min: 1,
                item: tCourse('outline.lesson.content.quiz.title'),
              })
            );
          }
          break;
        default:
          break;
      }

      // Kiểm tra quizzes trong content
      if ((content.quizzes?.length ?? 0) > 0) {
        content.quizzes?.forEach((quiz, quizIdx) => {
          const quizErrors: string[] = [];

          if (!quiz.title) {
            quizErrors.push(tCourse('validation.quiz.titleRequired'));
          }

          if ((quiz.questions?.length ?? 0) > 0) {
            quiz.questions?.forEach((question, qIdx) => {
              if ((question.items?.length ?? 0) === 0) {
                quizErrors.push(
                  `${tCourse('validation.quiz.itemsMin')} (${tCourse('outline.lesson.content.quiz.question.title')} ${qIdx + 1})`
                );
              }
              if ((question.correct_item_sets?.[0]?.length ?? 0) === 0) {
                quizErrors.push(
                  `${tCourse('validation.quiz.correctAnswerRequired')} (${tCourse('outline.lesson.content.quiz.question.title')} ${qIdx + 1})`
                );
              }
            });
          } else {
            quizErrors.push(
              tCourse('validation.minItems', {
                min: 1,
                item: tCourse('outline.lesson.content.quiz.question.title'),
              })
            );
          }

          if ((quizErrors.length ?? 0) > 0) {
            errors.quizErrors[`${idx}-${quizIdx}`] = quizErrors;
          }
        });
      }

      if ((contentErrors.length ?? 0) > 0) {
        errors.contentErrors[idx] = contentErrors;
      }
    });
  } else {
    errors.lessonErrors.push(tCourse('validation.content.required'));
  }

  return errors;
};
