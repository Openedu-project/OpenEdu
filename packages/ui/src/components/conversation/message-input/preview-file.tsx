import type { IFileResponse } from '@oe/api/types/file';
import type { z } from '@oe/api/utils/zod';
import { CircleX } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { Image } from '#components/image';
import { Button } from '#shadcn/button';
import type { chatSchema } from '../utils';

export const PreviewImage = ({
  imagesData,
  form,
}: { imagesData: IFileResponse[]; form: UseFormReturn<z.infer<typeof chatSchema>> }) => (
  <div className="scrollbar mb-2 flex w-full gap-2 overflow-x-auto">
    {imagesData?.map(image => (
      <div key={image.id} className="relative h-[90px] w-[160px] shrink-0 rounded-lg bg-foreground/10">
        <Image
          className="absolute rounded-lg object-cover"
          alt="screen-shot"
          fill
          sizes="160px"
          noContainer
          src={image?.url}
        />
        <Button
          variant="ghost"
          type="button"
          size="icon"
          className="!p-0 absolute top-0 right-0 h-[16px] w-[16px] rounded-full bg-foreground/40 hover:bg-foreground/50"
          onClick={() => {
            form.setValue(
              'images',
              imagesData?.filter(item => item.id !== image.id)
            );
          }}
        >
          <CircleX width={16} height={16} color="hsl(var(--background))" />
        </Button>
      </div>
    ))}
  </div>
);
