import { useCallback, useEffect, useState } from 'react';

export function useTableData<TData>({
  data,
  isLoading,
}: {
  data?: TData[];
  isLoading?: boolean;
}) {
  const [tableData, setTableData] = useState<TData[]>(data ?? []);

  useEffect(() => {
    if (!isLoading && data) {
      setTableData(data);
    }
  }, [data, isLoading]);

  const updateTableData = useCallback((rowIndex: number, columnId: string, value: TData) => {
    setTableData((prev: TData[]) =>
      prev.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  }, []);

  return { tableData, setTableData, updateTableData };
}
