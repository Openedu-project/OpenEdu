import type { IFileResponse } from '@oe/api/types/file';
import type { z } from '@oe/api/utils/zod';
import { CircleX, Paperclip } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { Image } from '#components/image';
import { Button } from '#shadcn/button';
import type { chatSchema } from '../utils';

export const PreviewFile = ({
  filesData,
  form,
}: {
  filesData: IFileResponse[];
  form: UseFormReturn<z.infer<typeof chatSchema>>;
}) => (
  <div className="scrollbar mb-2 flex w-full gap-2 overflow-x-auto">
    {filesData?.map(file => (
      <div
        key={file.id}
        className="relative flex h-[90px] w-[160px] shrink-0 items-center justify-center rounded-lg bg-foreground/10"
      >
        {file.thumbnail_url ? (
          <Image
            className="absolute rounded-lg object-cover"
            alt="screen-shot"
            fill
            sizes="160px"
            noContainer
            src={file?.thumbnail_url}
          />
        ) : (
          <div className="flex items-center gap-1 p-2">
            <Paperclip className="h-3 w-3 shrink-0" />
            <p className="mcaption-regular12 line-clamp-3 break-all">{file.name}</p>
          </div>
        )}
        <Button
          variant="ghost"
          type="button"
          size="icon"
          className="!p-0 absolute top-0 right-0 h-[16px] w-[16px] rounded-full bg-foreground/40 hover:bg-foreground/50"
          onClick={() => {
            form.setValue(
              'files',
              filesData?.filter(item => item.id !== file.id)
            );
          }}
        >
          <CircleX width={16} height={16} color="var(--background)" />
        </Button>
        {!file.mime?.includes('image') && (
          <p className="mcaption-regular10 absolute right-1 bottom-1 rounded-lg bg-foreground/50 p-1 text-center text-background">
            {file.ext?.slice(1).toUpperCase()}
          </p>
        )}
      </div>
    ))}
  </div>
);
