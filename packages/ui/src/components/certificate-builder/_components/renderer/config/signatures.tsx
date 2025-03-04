import type { IFileResponse } from '@oe/api/types/file';
import { PlusIcon, TrashIcon, XIcon } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useTranslations } from 'next-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Uploader } from '#components/uploader';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';
import { Input } from '#shadcn/input';

const createFileFromUrl = (url?: string): IFileResponse => {
  const id = nanoid();
  return {
    id,
    url,
    height: 0,
    width: 0,
    name: '',
    size: 0,
    props: {},
    create_at: 0,
    delete_at: 0,
    duration: 0,
    ext: '',
    mime: '',
    user_id: '',
    thumbnail_url: '',
    update_at: 0,
  } as IFileResponse;
};

export const SignaturesConfig = ({
  isPreview = false,
}: {
  isPreview?: boolean;
}) => {
  const tCertificate = useTranslations('certificate');
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'signatures',
  });

  return (
    <div className="flex flex-col gap-2">
      <p>{tCertificate('builder.preview.signatures')}</p>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-2 rounded-md border p-2">
            <FormFieldWithLabel
              name={`signatures.${index}.educator_name`}
              label={tCertificate('builder.preview.signerName')}
              render={({ field }) => (
                <Input {...field} placeholder={tCertificate('builder.preview.signerName')} className="flex-1" />
              )}
            />

            <FormFieldWithLabel
              name={`signatures.${index}.position`}
              label={tCertificate('builder.preview.signerPosition')}
              render={({ field }) => (
                <Input {...field} placeholder={tCertificate('builder.preview.signerPosition')} className="w-full" />
              )}
            />

            <FormFieldWithLabel
              name={`signatures.${index}.signature`}
              label={tCertificate('builder.preview.signature')}
              render={({ field }) => {
                const { value } = field;
                console.log('value', value);
                return isPreview ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = event => {
                            const base64 = event.target?.result as string;
                            field.onChange(createFileFromUrl(base64));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Uploader
                    value={value}
                    onChange={field.onChange}
                    fileListVisible={false}
                    listType="picture"
                    accept="image/png, image/jpeg"
                  />
                );
              }}
            />

            <Button
              onClick={() => {
                remove(index);
              }}
              variant="destructive"
              className="h-8 gap-2 px-2"
            >
              <TrashIcon className="h-4 w-4" />
              {tCertificate('builder.preview.remove')}
            </Button>
          </div>
        ))}
      </div>
      <Button
        onClick={() =>
          append({
            id: nanoid(),
            educator_name: '',
            position: '',
            signature: null,
          })
        }
        variant="outline"
        className="h-8 gap-2 px-2 text-primary hover:text-primary/80"
      >
        <PlusIcon className="h-4 w-4" />
        {tCertificate('builder.preview.addSignature')}
      </Button>
    </div>
  );
};
