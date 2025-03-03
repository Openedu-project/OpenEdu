'use client';

import type { ICertificateData, ICertificateTemplate } from '@oe/api/types/certificate';
import { fileResponseSchema } from '@oe/api/types/file';
import { z } from '@oe/api/utils/zod';
import type { DialogProps } from '@radix-ui/react-dialog';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { DatePicker } from '#components/date-picker';
import type { FormErrorHandler } from '#components/form-wrapper';
import { Modal } from '#components/modal';
import { FormFieldWithLabel } from '#shadcn/form';
import { Input } from '#shadcn/input';
import { ExportPDFButton } from '../pdf';
import { OrganizationsConfig } from './config/organizations';
import { SignaturesConfig } from './config/signatures';
import { TemplateScalePreview } from './template-scale-preview';

const certificateSchema = z.object({
  learner_name: z.string().optional(),
  course_name: z.string().optional(),
  issue_date: z.number().optional(),
  organizations: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        logo: z.object({
          id: z.string(),
          url: z.string(),
        }),
      })
    )
    .nullable()
    .optional(),
  signatures: z
    .array(
      z.object({
        id: z.string(),
        educator_name: z.string(),
        position: z.string(),
        signature: fileResponseSchema.nullable().optional(),
      })
    )
    .nullable()
    .optional(),
});

export type ICertificateDataSchema = z.infer<typeof certificateSchema>;

interface PreviewModalProps extends DialogProps {
  trigger?: ReactNode;
  template: ICertificateTemplate;
  data?: Partial<ICertificateData>;
  showPlaceholder?: boolean;
  isPreview?: boolean;
  onDownloadSuccess?: () => void;
  onSubmit?: (data: ICertificateDataSchema) => void;
  onError?: FormErrorHandler;
}

export const RendererConfigModal = ({
  trigger,
  template,
  data: defaultValues,
  showPlaceholder = false,
  isPreview = false,
  onDownloadSuccess,
  onSubmit = () => ({}),
  onError,
  ...props
}: PreviewModalProps) => {
  const tCertificate = useTranslations('certificate');
  const tGeneral = useTranslations('general');
  const [data, setData] = useState<ICertificateDataSchema>(defaultValues as ICertificateDataSchema);

  const handleChange = (data: ICertificateDataSchema) => {
    setData(data);
  };

  return (
    <Modal
      title={isPreview ? tCertificate('builder.preview.title') : tCertificate('builder.preview.config')}
      validationSchema={certificateSchema}
      defaultValues={defaultValues}
      trigger={trigger}
      onChange={handleChange}
      onSubmit={onSubmit}
      onError={onError}
      className="flex max-h-[80vh] flex-col md:w-[90vw] md:max-w-[800px]"
      contentClassName="px-4 flex flex-1 overflow-hidden"
      formClassName="flex flex-col md:flex-row space-y-0 gap-4"
      buttons={[
        {
          label: tCertificate('builder.preview.cancel'),
          variant: 'outline',
          type: 'button',
        },

        {
          label: tCertificate('builder.preview.download'),
          component: handleClose => (
            <ExportPDFButton
              key={template.id}
              template={template}
              data={data as ICertificateData}
              variant="outline"
              className="gap-2"
              onClick={() => {
                onDownloadSuccess?.();
                handleClose?.();
              }}
            />
          ),
        },
        ...(isPreview
          ? []
          : [
              {
                label: tGeneral('save'),
                type: 'submit' as const,
              },
            ]),
      ]}
      {...props}
    >
      <div className="h-40 flex-1 shrink-0 overflow-hidden md:h-auto">
        <TemplateScalePreview template={template} data={data as ICertificateData} className="h-40 md:h-full" />
      </div>
      <div className="scrollbar flex flex-1 flex-col gap-4 overflow-y-auto">
        {isPreview ? (
          <>
            <FormFieldWithLabel name="learner_name" label="Learner Name" render={({ field }) => <Input {...field} />} />
            <FormFieldWithLabel name="course_name" label="Course Name" render={({ field }) => <Input {...field} />} />
            <FormFieldWithLabel
              name="issue_date"
              label="Issue Date"
              render={({ field }) => (
                <DatePicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={date =>
                    date ? field.onChange(new Date(date as Date).getTime()) : field.onChange(undefined)
                  }
                />
              )}
            />
          </>
        ) : null}
        <OrganizationsConfig />
        <SignaturesConfig />
      </div>
    </Modal>
  );
};
