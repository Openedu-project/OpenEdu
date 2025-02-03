import type { IFileResponse } from '@oe/api/types/file';
import { Image } from '@oe/ui/components/image';
import { CircleX, FileUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { FieldValues, Path } from 'react-hook-form';
import { Uploader } from '#components/uploader';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';
import { INPUT_BUTTON } from '../constant';
import type { InputFieldProps } from '../type';
import { InputDefault } from './input-default';

export const InputImageAnalysis = <TFormValues extends FieldValues>({
  handleKeyDown,
  setInputType,
  inputRef,
  canChangeType,
}: InputFieldProps<TFormValues>) => {
  const buttonData = INPUT_BUTTON.find(button => button.type === 'image_analysis');
  const tAI = useTranslations('aiAssistant');

  return (
    <div className="relative flex w-full items-center justify-center gap-2">
      <div className="flex shrink-0 items-center gap-1 border-r px-1">
        {buttonData?.icon}
        <p className="mcaption-semibold12 hidden lg:block">{tAI(buttonData?.textKey)}</p>

        {canChangeType && (
          <Button
            variant="ghost"
            type="button"
            size="icon"
            className="!p-2 h-8 w-8"
            onClick={() => setInputType?.('chat')}
          >
            <CircleX className="h-4 w-4" />
          </Button>
        )}
      </div>

      <InputDefault inputRef={inputRef} handleKeyDown={handleKeyDown} />

      <FormFieldWithLabel
        name={'images' as Path<TFormValues>}
        render={({ field }) => (
          <>
            {field.value?.length > 0 && (
              <div className="horizontal-scrollbar absolute bottom-[40px] left-0 flex w-full overflow-x-auto">
                <div className="flex items-center gap-2 rounded-lg bg-foreground/30 p-2">
                  {(field.value as IFileResponse[]).map(image => (
                    <div key={image.id} className="relative h-[90px] w-[160px] shrink-0">
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
                          field.onChange((field.value as IFileResponse[])?.filter(item => item.id !== image.id));
                        }}
                      >
                        <CircleX width={16} height={16} color="hsl(var(--background))" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="relative h-full grow">
              <div className="h-[16px] w-[16px] overflow-hidden">
                <FileUp className="absolute h-4 w-4" />
                <Uploader
                  multiple
                  listType="picture"
                  value={field.value}
                  onChange={field.onChange}
                  fileListVisible={false}
                  accept="image/*"
                  className="overflow-hidden opacity-0"
                />
              </div>
            </div>
          </>
        )}
      />
    </div>
  );
};
