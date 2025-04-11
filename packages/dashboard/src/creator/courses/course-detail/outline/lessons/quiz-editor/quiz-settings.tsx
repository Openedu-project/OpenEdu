import { InputNumber } from '@oe/ui';
import { InputSelectForm } from '@oe/ui';
import { InputTimeDuration } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { Switch } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { QuizTriggerSettings } from './quiz-trigger-settings';
import type { IQuizProps } from './types';
import { PASS_CRITERIA_TYPES, TIME_LIMIT_TYPES } from './utils';

export function QuizSettings({ contentIndex, quizIndex }: IQuizProps) {
  const tCourseQuiz = useTranslations('course.outline.lesson.content.quiz');
  const timeLimitEnabled = useWatch({
    name: `contents[${contentIndex}].quizzes[${quizIndex}].settings.time_limit_enabled`,
  });

  const submissionLimitEnabled = useWatch({
    name: `contents[${contentIndex}].quizzes[${quizIndex}].settings.submission_limit_enabled`,
  });

  const timeBonusPointsEnabled = useWatch({
    name: `contents[${contentIndex}].quizzes[${quizIndex}].settings.time_bonus_points_enabled`,
  });

  const penaltyPointsEnabled = useWatch({
    name: `contents[${contentIndex}].quizzes[${quizIndex}].settings.penalty_points_enabled`,
  });

  const streakBonusEnabled = useWatch({
    name: `contents[${contentIndex}].quizzes[${quizIndex}].settings.streak_bonus_enabled`,
  });

  const passCriteria = useWatch({
    name: `contents[${contentIndex}].quizzes[${quizIndex}].settings.pass_criteria`,
  });

  const inputName = useMemo(() => {
    return passCriteria === 'correct_answers'
      ? `contents[${contentIndex}].quizzes[${quizIndex}].settings.min_correct_answers_to_pass`
      : `contents[${contentIndex}].quizzes[${quizIndex}].settings.min_percentage_to_pass`;
  }, [passCriteria, contentIndex, quizIndex]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
        <FormFieldWithLabel
          name={`contents[${contentIndex}].quizzes[${quizIndex}].settings.shuffle_choices_enabled`}
          isToggleField
          label={tCourseQuiz('settings.shuffleChoices')}
          className="w-full"
          infoText={tCourseQuiz('settings.shuffleChoicesInfo')}
          render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
        />

        <FormFieldWithLabel
          name={`contents[${contentIndex}].quizzes[${quizIndex}].settings.shuffle_questions_enabled`}
          isToggleField
          label={tCourseQuiz('settings.shuffleQuestions')}
          className="w-full"
          infoText={tCourseQuiz('settings.shuffleQuestionsInfo')}
          render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
        />
      </div>

      <FormFieldWithLabel
        name={`contents[${contentIndex}].quizzes[${quizIndex}].settings.show_correct_answers_enabled`}
        isToggleField
        label={tCourseQuiz('settings.showCorrectAnswers')}
        infoText={tCourseQuiz('settings.showCorrectAnswersInfo')}
        render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
      />

      <FormFieldWithLabel
        name={`contents[${contentIndex}].quizzes[${quizIndex}].settings.time_limit_enabled`}
        isToggleField
        label={tCourseQuiz('settings.timeLimit')}
        infoText={tCourseQuiz('settings.timeLimitInfo')}
        render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
      />

      {timeLimitEnabled && (
        <InputSelectForm
          selectPosition="start"
          inputProps={{
            name: `contents[${contentIndex}].quizzes[${quizIndex}].settings.time_limit`,
            type: 'text',
            placeholder: tCourseQuiz('settings.timeLimit'),
            Component: InputTimeDuration,
          }}
          selectProps={{
            name: `contents[${contentIndex}].quizzes[${quizIndex}].settings.time_limit_type`,
            items: TIME_LIMIT_TYPES.map(type => ({
              value: type.value,
              label: tCourseQuiz(type.label),
            })),
            placeholder: tCourseQuiz('settings.timeLimit'),
            className: 'min-w-40 w-40 bg-muted',
          }}
        />
      )}

      <FormFieldWithLabel
        name={`contents[${contentIndex}].quizzes[${quizIndex}].settings.submission_limit_enabled`}
        isToggleField
        label={tCourseQuiz('settings.submissionLimit')}
        infoText={tCourseQuiz('settings.submissionLimitInfo')}
        render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
      />

      {submissionLimitEnabled && (
        <FormFieldWithLabel
          name={`contents[${contentIndex}].quizzes[${quizIndex}].settings.submission_limit`}
          render={({ field }) => <InputNumber value={field.value} onChange={field.onChange} min={0} />}
        />
      )}

      <FormFieldWithLabel
        name={`contents[${contentIndex}].quizzes[${quizIndex}].settings.time_bonus_points_enabled`}
        isToggleField
        label={tCourseQuiz('settings.timeBonusPoints')}
        infoText={tCourseQuiz('settings.timeBonusPointsInfo')}
        render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
      />

      {timeBonusPointsEnabled && (
        <FormFieldWithLabel
          name={`contents[${contentIndex}].quizzes[${quizIndex}].settings.time_bonus_points_per_second`}
          render={({ field }) => <InputNumber value={field.value} onChange={field.onChange} min={0} />}
        />
      )}

      <FormFieldWithLabel
        name={`contents[${contentIndex}].quizzes[${quizIndex}].settings.penalty_points_enabled`}
        isToggleField
        label={tCourseQuiz('settings.penaltyPoints')}
        infoText={tCourseQuiz('settings.penaltyPointsInfo')}
        render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
      />

      {penaltyPointsEnabled && (
        <FormFieldWithLabel
          name={`contents[${contentIndex}].quizzes[${quizIndex}].settings.penalty_points_per_wrong_answer`}
          render={({ field }) => <InputNumber value={field.value} onChange={field.onChange} min={0} />}
        />
      )}

      <FormFieldWithLabel
        name={`contents[${contentIndex}].quizzes[${quizIndex}].settings.streak_bonus_enabled`}
        isToggleField
        label={tCourseQuiz('settings.streakBonus')}
        infoText={tCourseQuiz('settings.streakBonusInfo')}
        render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
      />

      {streakBonusEnabled && (
        <InputSelectForm
          selectPosition="start"
          inputProps={{
            name: `contents[${contentIndex}].quizzes[${quizIndex}].settings.streak_bonus_percentage_increment`,
            type: 'number',
            placeholder: tCourseQuiz('settings.streakBonusPercentageIncrement'),
            Component: InputNumber,
            // min: 0,
          }}
          input2Props={{
            name: `contents[${contentIndex}].quizzes[${quizIndex}].settings.streak_bonus_max_percentage`,
            type: 'number',
            placeholder: tCourseQuiz('settings.streakBonusMaxPercentage'),
            Component: InputNumber,
            // min: 0,
          }}
          selectProps={{
            name: `contents[${contentIndex}].quizzes[${quizIndex}].settings.streak_bonus_type`,
            items: [{ value: 'percentage', label: 'Percentage' }],
            placeholder: tCourseQuiz('settings.streakBonusType'),
            className: 'min-w-40 w-40 bg-muted',
          }}
        />
      )}

      <InputSelectForm
        selectPosition="start"
        label={tCourseQuiz('settings.passCriteria')}
        inputProps={{
          name: inputName,
          type: 'number',
          placeholder: tCourseQuiz('settings.passCriteriaMin'),
          Component: InputNumber,
          min: 0,
        }}
        selectProps={{
          name: `contents[${contentIndex}].quizzes[${quizIndex}].settings.pass_criteria`,
          items: PASS_CRITERIA_TYPES.map(type => ({
            value: type.value,
            label: tCourseQuiz(type.label),
          })),
          placeholder: tCourseQuiz('settings.passCriteria'),
          className: 'min-w-40 w-40 bg-muted',
        }}
      />

      <QuizTriggerSettings contentIndex={contentIndex} quizIndex={quizIndex} />
    </div>
  );
}
