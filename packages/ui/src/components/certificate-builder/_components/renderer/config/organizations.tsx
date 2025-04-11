import type { IFileResponse } from '@oe/api';
import { PlusIcon, XIcon } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useTranslations } from 'next-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Uploader } from '#components/uploader';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';
import { Input } from '#shadcn/input';

const createFileFromUrl = (url?: string, file?: File): IFileResponse => {
  const id = nanoid();
  return {
    id,
    url,
    height: 0,
    width: 0,
    name: file?.name || '',
    size: file?.size || 0,
    props: {},
    create_at: 0,
    delete_at: 0,
    duration: 0,
    ext: file?.type || '',
    mime: file?.type || '',
    user_id: '',
    thumbnail_url: '',
    update_at: 0,
  } as IFileResponse;
};

export const OrganizationsConfig = ({
  isPreview = false,
}: {
  isPreview?: boolean;
}) => {
  const tCertificate = useTranslations('certificate');
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'organizations',
  });

  return (
    <div className="flex flex-col gap-2">
      <p>{tCertificate('builder.preview.organizations')}</p>

      <div className="flex flex-1 flex-col gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-2 rounded-md border p-2">
            <FormFieldWithLabel
              name={`organizations.${index}.name`}
              label={tCertificate('builder.preview.organizationName')}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={e => field.onChange(e.target.value)}
                  placeholder={tCertificate('builder.preview.organizationName')}
                  className="flex-1"
                />
              )}
            />

            <FormFieldWithLabel
              name={`organizations.${index}.logo`}
              label={tCertificate('builder.preview.organizationLogo')}
              render={({ field }) => {
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
                            field.onChange(createFileFromUrl(base64, file));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <Button variant="outline" size="icon">
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Uploader
                    value={field.value}
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
              className="h-8"
            >
              {tCertificate('builder.preview.remove')}
            </Button>
          </div>
        ))}
      </div>
      <Button
        onClick={() =>
          append({
            id: nanoid(),
            name: '',
            logo: null,
          })
        }
        variant="outline"
        className="h-8 gap-2 px-2 text-primary hover:text-primary/80"
      >
        <PlusIcon className="h-4 w-4" />
        {tCertificate('builder.preview.addOrganization')}
      </Button>
    </div>
  );
};
