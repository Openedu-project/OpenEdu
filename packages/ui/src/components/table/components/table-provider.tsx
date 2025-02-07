import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface TableContextType {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  mutate?: () => Promise<any>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  setMutate?: (fn: () => Promise<any>) => void;
  mutateAndClearCache?: () => void;
  setMutateAndClearCache?: (fn: () => void) => void;
}

const TableContext = createContext<TableContextType>({});

export function TableProvider({ children }: { children: ReactNode }) {
  const [mutate, setMutateState] = useState<
    (() => Promise<void>) | undefined
  >();

  const setMutate = useCallback((fn: () => Promise<void>) => {
    setMutateState(() => fn);
  }, []);

  const [mutateAndClearCache, setMutateAndClearCacheState] = useState<
    (() => void) | undefined
  >();

  const setMutateAndClearCache = useCallback((fn: () => void) => {
    setMutateAndClearCacheState(() => fn);
  }, []);

  return (
    <TableContext.Provider
      value={{ mutate, setMutate, mutateAndClearCache, setMutateAndClearCache }}
    >
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context;
}
