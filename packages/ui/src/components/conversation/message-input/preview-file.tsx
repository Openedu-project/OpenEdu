import { postEmbedDocument, type z } from '@oe/api';
import { CircleX, ImageIcon, Paperclip } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { type UseFieldArrayRemove, type UseFormReturn, useFieldArray } from 'react-hook-form';
import { Image } from '#components/image';
import { Button } from '#shadcn/button';
import { Progress } from '#shadcn/progress';
import { useSocketStore } from '#store/socket';
import { cn } from '#utils/cn';
import type { TFileResponse, TFileStatus } from '../type';
import type { chatSchema } from '../utils';

interface IPreviewFileProps {
  file: TFileResponse;
  remove?: UseFieldArrayRemove;
  filePosition?: number;
  viewOnly?: boolean;
  updateFile?: (index: number, newValue: TFileResponse) => void;
  chatId?: string;
}

export const PreviewFile = ({
  form,
  chatId,
  filesData,
}: {
  filesData: TFileResponse[];
  form: UseFormReturn<z.infer<typeof chatSchema>>;
  chatId?: string;
}) => {
  const { remove } = useFieldArray({
    control: form.control,
    name: 'files',
  });

  const updateFile = (index: number, newValue: TFileResponse) => {
    form.setValue(`files.${index}`, newValue);
  };

  return (
    <div className="scrollbar mb-2 flex w-full gap-2 overflow-x-auto">
      {filesData?.map((file, index) =>
        file.mime?.includes('image') ? (
          <PreviewImage key={file.id ?? crypto.randomUUID()} file={file} remove={remove} filePosition={index} />
        ) : (
          <PreviewDocument
            key={file.id ?? crypto.randomUUID()}
            file={file}
            remove={remove}
            filePosition={index}
            updateFile={updateFile}
            chatId={chatId}
          />
        )
      )}
    </div>
  );
};

export const PreviewImage = ({ file, remove, filePosition, viewOnly }: IPreviewFileProps) => {
  const onRemove = () => {
    remove?.(filePosition);
  };
  return (
    <div className="relative flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-lg bg-foreground/10">
      {!viewOnly && <HitboxLayer file={file} handleRemove={onRemove} />}
      {file.status === 'error' ? (
        <div className={cn('flex items-center gap-1 p-2 text-destructive')}>
          <ImageIcon className="h-3 w-3 shrink-0" />
          <p className={cn('mcaption-regular12 line-clamp-3 break-all')}>{file.name}</p>
        </div>
      ) : (
        <Image
          className="absolute rounded-lg object-cover"
          alt="screen-shot"
          fill
          sizes="160px"
          noContainer
          src={file?.url}
        />
      )}
    </div>
  );
};

export const PreviewDocument = ({ file, remove, filePosition, viewOnly, updateFile, chatId }: IPreviewFileProps) => {
  const onRemove = () => {
    remove?.(filePosition);
    // await cancelEmbedDocument(undefined, { task_id: file.id });
  };
  const updateFileStatus = (status?: TFileStatus, process?: number) => {
    updateFile?.(filePosition ?? 0, { ...file, status, process });
  };

  return (
    <div
      className={cn(
        'relative flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary',
        viewOnly && 'border bg-background'
      )}
    >
      {!viewOnly && <HitboxLayer file={file} handleRemove={onRemove} updateStatus={updateFileStatus} chatId={chatId} />}
      <div className={cn('flex items-center gap-1 p-2')}>
        <Paperclip className="h-3 w-3 shrink-0" />
        <p className={cn('mcaption-regular12 line-clamp-3 break-all')}>{file.name}</p>
      </div>
    </div>
  );
};

const HitboxLayer = ({
  file,
  handleRemove,
  updateStatus,
  chatId,
}: {
  file: TFileResponse;
  handleRemove: () => void;
  updateStatus?: (status: TFileStatus, progress?: number) => void;
  chatId?: string;
}) => {
  const tStatus = useTranslations('general.statusVariants');
  const apiCalledRef = useRef(false);
  const { AIDocumentStatusData, resetSocketData } = useSocketStore();

  const [status, setStatus] = useState<TFileStatus>('generating');
  const [progress, setProgress] = useState(file.process ?? 0);

  useEffect(() => {
    if (!updateStatus) {
      setStatus(file.status ?? 'error');
      return;
    }

    if (file.status === 'generating' && !apiCalledRef.current && file.process === 0) {
      const res = postEmbedDocument(undefined, {
        attachment_id: file.id,
        ai_conversation_id: chatId,
      });
      apiCalledRef.current = true;

      if (!res) {
        updateStatus?.('error');
        setStatus('error');
      }
    }

    if (file.status) {
      setStatus(file.status);
    }
  }, [file, chatId, updateStatus]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (status === 'generating') {
      if (apiCalledRef.current) {
        updateStatus?.('generating', 50);
      }
      interval = setInterval(() => {
        setProgress(prevProgress => {
          const increment = 0.2 + Math.random() * 0.15;
          const newProgress = Math.min(prevProgress + increment, 90);

          return newProgress;
        });
      }, 100);
    } else if (status === 'completed') {
      updateStatus?.('completed', 100);
      interval = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          const newProgress = Math.min(prevProgress + 4, 100);
          return newProgress;
        });
      }, 30);
    } else {
      setProgress(100);
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [status, updateStatus]);

  useEffect(() => {
    if (
      AIDocumentStatusData &&
      AIDocumentStatusData.data?.file_id === file.id &&
      AIDocumentStatusData.data?.status !== 'generating'
    ) {
      const fileStatus = AIDocumentStatusData.data?.status === 'failed' ? 'error' : AIDocumentStatusData.data?.status;
      updateStatus?.(fileStatus);
      setStatus(fileStatus);
      resetSocketData('ai_chat_document_status');
    }
  }, [AIDocumentStatusData, file.id, resetSocketData, updateStatus]);

  return (
    <div
      className={cn(
        'absolute flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-lg border border-primary',
        status === 'error' && 'border-destructive bg-background/30'
      )}
    >
      <Button
        variant="ghost"
        type="button"
        size="icon"
        className="!p-0 absolute top-0 right-0 z-10 h-[16px] w-[16px] rounded-full bg-foreground/40 hover:bg-foreground/50"
        onClick={handleRemove}
      >
        <CircleX width={16} height={16} color="var(--background)" />
      </Button>
      <div className="absolute right-0 bottom-0 flex w-full items-end justify-end gap-1 rounded-lg">
        {status === 'generating' || progress < 100 ? (
          <div className="grow rounded-full bg-background p-1.5">
            <Progress value={progress} className="h-1 transition-all" />
          </div>
        ) : (
          !file.mime?.includes('image') && (
            <p
              className={cn(
                'mcaption-regular10 m-1 rounded-lg p-1 text-center',
                status === 'error' ? 'bg-destructive-foreground text-destructive' : 'bg-foreground/50 text-background'
              )}
            >
              {status === 'error' ? tStatus('failed') : file.ext?.slice(1).toUpperCase()}
            </p>
          )
        )}
      </div>
    </div>
  );
};
