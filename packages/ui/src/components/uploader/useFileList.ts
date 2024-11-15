import type React from 'react';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import type { ActionType, FileType } from './types';
import { createFile, fileListReducer } from './utils';

export const useFileList = (
  defaultFileList: FileType[] = []
): [React.RefObject<FileType[]>, (action: ActionType, callback?: (v: FileType[]) => void) => void] => {
  const fileListRef = useRef<FileType[]>(defaultFileList.map(createFile));
  const fileListUpdateCallback = useRef<((v: FileType[]) => void) | null>(null);

  const [fileList, dispatch] = useReducer(fileListReducer, fileListRef.current);
  fileListRef.current = fileList;

  useEffect(() => {
    fileListUpdateCallback.current?.(fileList);
    fileListUpdateCallback.current = null;
  }, [fileList]);

  useEffect(() => {
    return () => {
      fileListUpdateCallback.current = null;
    };
  }, []);

  const dispatchCallback = useCallback((action: ActionType, callback?: (v: FileType[]) => void) => {
    dispatch(action);
    fileListUpdateCallback.current = callback || null;
  }, []);

  return [fileListRef, dispatchCallback];
};
