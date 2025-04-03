import type { IFormQuestion, IFormResponse } from '@oe/api/types/form';
import type { IFormUserResponse, IFormUserResponseAnswerItem } from '@oe/api/types/form-user-response';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import type { TFunction } from '@oe/i18n/types';
import type { ColumnDef, ColumnExportConfig } from '@oe/ui/components/table';

const filterdQuestions = (questions: IFormQuestion[]) => {
  return questions
    ?.filter(question => {
      const type = question?.question_type;
      if (
        type === 'heading' ||
        type === 'space' ||
        type === 'paragraph' ||
        type === 'submitButton' ||
        type === 'image'
      ) {
        return undefined;
      }
      return question;
    })
    ?.filter(Boolean);
};

const getAnswer = (answer?: IFormUserResponseAnswerItem) => {
  let value = answer?.answer_text;

  if (answer?.question_type === 'datetimePicker') {
    value = formatDateHourMinute(Number(value));
  }

  if (
    answer?.question_type === 'selectbox' ||
    answer?.question_type === 'multipleChoice' ||
    answer?.question_type === 'multipleSelection' ||
    answer?.question_type === 'multipleChoiceGrid'
  ) {
    value = answer?.option_text;
  }

  return value;
};

export const generateColumns = (detailFormData: IFormResponse, t: TFunction): ColumnDef<IFormUserResponse>[] => {
  const baseColumns: ColumnDef<IFormUserResponse>[] = [
    {
      header: t('responseId'),
      accessorKey: 'id',
      size: 200,
    },
    {
      header: t('user'),
      accessorKey: 'user',
      cell: ({ row }) => <p>{row?.original?.user?.display_name || row?.original?.user?.email || '-'}</p>,
      size: 200,
    },
    // Add other base columns as needed
  ];

  const questions = filterdQuestions(detailFormData.questions);
  const answerColumns: ColumnDef<IFormUserResponse>[] = Array.from({ length: questions.length }, (_, index) => {
    return {
      id: questions[index]?.id,
      header: t('question', {
        index: index + 1,
        title: questions[index]?.title,
      }),
      accessor: 'answers',
      size: 250,
      cell({ row }) {
        const { answers } = row.original;
        if (Array.isArray(answers)) {
          const mergerdAnswers = mergeAnswersByQuestionId(answers as IFormUserResponseAnswerItem[]);
          return <div>{getAnswer(mergerdAnswers[index])}</div>;
        }

        const key = Object.keys(answers)[index];

        return key && <div>{getAnswer(answers[key]) || ''}</div>;
      },
    };
  });

  return [...baseColumns, ...answerColumns];
};

export const generateExportConfig = (detailFormData: IFormResponse, t: TFunction): ColumnExportConfig[] => {
  // Include the base columns first
  const baseExportConfig: ColumnExportConfig[] = [
    {
      columnId: 'id',
      exportHeader: t('responseId'),
      order: 0,
    },
    {
      columnId: 'user',
      exportHeader: t('user'),
      order: 1,
      // Transform function to get display name or email
      transform: (_value, row: IFormUserResponse) => row?.user?.display_name || row?.user?.email || '-',
    },
    // Add other base columns as needed
  ];

  const questions = filterdQuestions(detailFormData.questions);
  // Add question/answer columns
  const answerExportConfig: ColumnExportConfig[] = questions.map((question, index) => {
    return {
      columnId: question.id,
      exportHeader: t('question', {
        index: index + 1,
        title: question.title,
      }),
      order: index + baseExportConfig.length, // Ensure correct ordering
      // This is the key part - a transform function to access the nested answer
      transform: (_value, row: IFormUserResponse) => {
        if (!row.answers) {
          return '';
        }

        // Handle different answer data structures
        if (Array.isArray(row.answers)) {
          return getAnswer(row.answers[index]);
        }

        // Object structure with question IDs as keys
        return getAnswer(row.answers[question.id]) || '';
      },
    };
  });

  return [...baseExportConfig, ...answerExportConfig];
};

export function normalToSnake(text: string) {
  if (!text) {
    return '';
  }

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s/g, '_');
}
interface GroupedAnswers {
  [questionId: string]: IFormUserResponseAnswerItem[];
}

function mergeAnswersByQuestionId(answers: IFormUserResponseAnswerItem[]): IFormUserResponseAnswerItem[] {
  // Group the items by question_id
  const groupedByQuestionId: GroupedAnswers = {};

  // biome-ignore lint/complexity/noForEach: <explanation>
  answers.forEach((item: IFormUserResponseAnswerItem) => {
    const questionId: string = item.question_id;

    if (!groupedByQuestionId[questionId]) {
      groupedByQuestionId[questionId] = [];
    }

    groupedByQuestionId[questionId].push(item);
  });

  // Merge the items with the same question_id
  const mergedAnswers: IFormUserResponseAnswerItem[] = [];

  // biome-ignore lint/complexity/noForEach: <explanation>
  Object.keys(groupedByQuestionId).forEach((questionId: string) => {
    const group = groupedByQuestionId[questionId];

    // If there's only one item in the group, add it directly
    if (group && group?.length === 1 && group?.[0]) {
      mergedAnswers.push(group[0]);
      return;
    }

    // If there are multiple items, merge them
    const mergedItem = { ...group?.[0] }; // Create a copy of the first item

    // Create a set to collect unique option_text values to avoid duplicates
    const uniqueOptionTexts: Set<string> = new Set();

    // biome-ignore lint/complexity/noForEach: <explanation>
    group?.forEach((item: IFormUserResponseAnswerItem) => {
      if (item.option_text) {
        uniqueOptionTexts.add(item.option_text);
      }
    });

    // Join the unique option_text values with a comma
    mergedItem.option_text = Array.from(uniqueOptionTexts).join(', ');

    if (mergedItem?.id) {
      mergedAnswers.push(mergedItem as IFormUserResponseAnswerItem);
    }
  });

  return mergedAnswers;
}
