import type { IFormResponse } from '@oe/api/types/form';
import type { IFormUserResponse } from '@oe/api/types/form-user-response';
import type { TFunction } from '@oe/i18n/types';
import type { ColumnDef, ColumnExportConfig } from '@oe/ui/components/table';

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

  const answerColumns: ColumnDef<IFormUserResponse>[] = Array.from(
    { length: detailFormData.questions.length },
    (_, index) => {
      return {
        id: detailFormData.questions[index]?.id,
        header: t('question', {
          index: index + 1,
          title: detailFormData.questions[index]?.title,
        }),
        accessor: 'answers',
        size: 250,
        cell({ row }) {
          const { answers } = row.original;

          if (Array.isArray(answers)) {
            return <div>{answers[index]?.answer_text || ''}</div>;
          }
          const key = Object.keys(answers)[index];

          return key && <div>{answers[key]?.answer_text || ''}</div>;
        },
      };
    }
  );

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

  // Add question/answer columns
  const answerExportConfig: ColumnExportConfig[] = detailFormData.questions.map((question, index) => {
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
          return row.answers[index]?.answer_text || '';
        }

        // Object structure with question IDs as keys
        return row.answers[question.id]?.answer_text || '';
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
