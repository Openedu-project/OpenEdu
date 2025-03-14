import { useGetForm, useGetFormSummary, useGetFormUserResponses } from '@oe/api/hooks/useForms';
import type { IFormUserResponse } from '@oe/api/types/form-user-response';
import { ExportXLSXButton, Table, TableProvider, type TableRef } from '@oe/ui/components/table';
import { Badge } from '@oe/ui/shadcn/badge';
import type { Table as TableTanstack } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { generateColumns, generateExportConfig } from './_functions';

export function AnswersModalContent({
  id,
  formUID,
}: {
  id: string;
  formUID: string;
}) {
  const t = useTranslations('course.form.answers');
  const { dataFormUserResponses } = useGetFormUserResponses(id, {
    all_versions: true,
    preloads: 'Users',
  });
  const { dataFormSummary } = useGetFormSummary(formUID);
  const { dataForm } = useGetForm({ id });

  const [tableInstance, setTableInstance] = useState<TableTanstack<IFormUserResponse> | null>(null);

  const tableRef = useCallback((node: TableRef<IFormUserResponse> | null) => {
    // This function gets called whenever the Table component mounts or updates
    if (node?.table) {
      // If table is available in the node, update our state
      setTableInstance(node.table);
    }
  }, []);

  const canRenderTable = dataForm && generateColumns(dataForm) && dataFormUserResponses;

  const showExportButton = tableInstance && dataFormSummary?.total_responses;

  return (
    <>
      {canRenderTable && (
        <TableProvider>
          <div className="flex w-full justify-between pb-2">
            <div className="flex items-center gap-4">
              <p className="mcaption-bold20">{t('general')}</p>

              {dataFormSummary?.total_responses ? (
                <Badge>
                  {t(dataFormSummary.total_responses > 1 ? 'responses' : 'response', {
                    count: dataFormSummary.total_responses,
                  })}
                </Badge>
              ) : (
                <></>
              )}
            </div>

            {showExportButton ? (
              <ExportXLSXButton
                table={tableInstance}
                filename="Report"
                sheetName="Report"
                columnConfig={generateExportConfig(dataForm)}
              />
            ) : (
              <></>
            )}
          </div>

          <Table ref={tableRef} columns={generateColumns(dataForm)} data={dataFormUserResponses} />
        </TableProvider>
      )}
    </>
  );
}
