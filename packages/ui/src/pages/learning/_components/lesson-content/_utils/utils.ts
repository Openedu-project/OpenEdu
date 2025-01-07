import type { IAnswerItemSet } from '@oe/api/types/quiz';
import type { TAnswerInput } from '../_types/types';

export const transformAnswers = (input: TAnswerInput): IAnswerItemSet[][] => {
  const { answers } = input;

  if (typeof answers === 'string') {
    // single_choice
    return [[{ id: answers }]];
  }

  // multiple_choice
  if (Array.isArray(answers)) {
    return [
      answers.map(id => {
        return { id };
      }),
    ];
  }

  throw new Error('Invalid answer format');
};
