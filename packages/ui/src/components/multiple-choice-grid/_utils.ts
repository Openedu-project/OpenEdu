import type { MultipleChoiceGridOption } from './multiple-choice-grid';

/**
 * Generates initial values for a MultipleChoiceGrid component.
 *
 * @param rows - Array of row options
 * @param columns - Array of column options
 * @param defaultSelections - Optional map of rowId to columnId for pre-selected values
 * @param selectFirst - If true, automatically selects the first column for each row
 * @returns Record mapping rowId to selected columnId
 */
export function generateMultipleChoiceGridValues(
  rows: MultipleChoiceGridOption[],
  columns: MultipleChoiceGridOption[],
  defaultSelections: Record<string, string>,
  selectFirst?: boolean
): Record<string, string> {
  // Initialize empty values object
  const values: Record<string, string> = {};

  // First apply the default selections if provided
  if (defaultSelections) {
    // biome-ignore lint/complexity/noForEach: <explanation>
    Object.keys(defaultSelections).forEach(rowId => {
      // Verify that both row and column exist before adding to values
      if (rows.some(row => row.id === rowId) && columns.some(column => column.id === defaultSelections[rowId])) {
        if (defaultSelections[rowId]) {
          values[rowId] = defaultSelections[rowId];
        }
      }
    });
  }

  // If selectFirst is true, select the first column for any row without a selection
  if (selectFirst && columns.length > 0) {
    const firstColumnId = columns[0]?.id;

    // biome-ignore lint/complexity/noForEach: <explanation>
    rows.forEach(row => {
      // Only set default if row doesn't already have a value
      if (!values[row.id] && firstColumnId) {
        values[row.id] = firstColumnId;
      }
    });
  }

  return values;
}
