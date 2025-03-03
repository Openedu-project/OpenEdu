'use client';

import { useGetCertLayers } from '@oe/api/hooks/useCertificate';
import { useGetCourseById } from '@oe/api/hooks/useCourse';
import { type ICreateCourseCertificate, courseCertificateSchema } from '@oe/api/schemas/courses/createCourseSchema';
import { updateCourseCertTemplateService } from '@oe/api/services/certificate';
import type { ICertificateData } from '@oe/api/types/certificate';
import {
  type ICertificateDataSchema,
  RendererConfigModal,
  TemplateScalePreview,
} from '@oe/ui/components/certificate-builder';
import { FormWrapper } from '@oe/ui/components/form-wrapper';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { toast } from '@oe/ui/shadcn/sonner';
import { Switch } from '@oe/ui/shadcn/switch';
import { CheckIcon, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { COURSE_DETAIL_FORM_IDS } from '../_utils/constants';

export default function CourseDetailCertificatePage() {
  const tCourse = useTranslations('course');
  const { courseId } = useParams<{ courseId: string }>();
  const { course } = useGetCourseById(courseId);
  const { dataCertLayers, mutateCertLayers } = useGetCertLayers({
    courseId,
  });

  const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>(undefined);

  const handleTemplateClick = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleSubmit = (data: ICreateCourseCertificate) => {
    console.log(data);
  };

  const handleUpdateCertificateTemplate = async (data: ICertificateDataSchema) => {
    await updateCourseCertTemplateService(undefined, {
      params: {
        courseId,
        templateId: selectedTemplate,
      },
      payload: data as Partial<ICertificateData>,
    });
    await mutateCertLayers();
    toast.success(
      tCourse('common.toast.updateSuccess', {
        item: tCourse('common.courseTitle'),
      })
    );
  };

  return (
    <div className="mx-auto h-full max-w-[900px] px-1 py-4">
      <FormWrapper
        id={COURSE_DETAIL_FORM_IDS.certificate}
        schema={courseCertificateSchema}
        useFormProps={{
          defaultValues: course?.props?.certificate_condition,
        }}
        onSubmit={handleSubmit}
        onError={() => {
          toast.error(
            tCourse('common.toast.updateError', {
              item: tCourse('common.courseTitle'),
            })
          );
        }}
        className="flex h-full flex-col gap-4 space-y-0"
      >
        {({ loading }) => (
          <>
            <div className="flex items-center justify-between rounded-lg bg-background p-4 shadow-sm">
              <h1 className="mb-0 font-semibold text-xl">{tCourse('certificate.title')}</h1>
              <Button size="sm" type="submit" disabled={loading} loading={loading}>
                {tCourse('common.actions.save')}
                <CheckIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="scrollbar flex h-full flex-col gap-4 overflow-auto">
              <FormFieldWithLabel
                name="has_certificate"
                className="rounded-lg bg-background p-4 shadow-sm"
                labelClassName="mb-4 text-lg"
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-lg">{tCourse('certificate.display')}</span>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </div>
                    <span className="text-muted-foreground text-xs">{tCourse('certificate.displayDescription')}</span>
                  </div>
                )}
              />
              <div className="rounded-lg bg-background p-4 shadow-sm">
                <span className="font-medium text-lg">{tCourse('certificate.selectTemplate')}</span>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {dataCertLayers?.results?.map(certificateTemplate => {
                    return (
                      <div
                        key={certificateTemplate.id}
                        className={`cursor-pointer rounded-md border-2 text-left ${
                          selectedTemplate === certificateTemplate.id ? 'border-primary' : 'border-transparent'
                        }`}
                        onClick={() => handleTemplateClick(certificateTemplate.id)}
                        aria-pressed={selectedTemplate === certificateTemplate.id}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleTemplateClick(certificateTemplate.id);
                          }
                        }}
                      >
                        <TemplateScalePreview template={certificateTemplate.template} />
                        <div className="mt-2 flex items-center justify-between p-2">
                          <p className="font-medium text-sm">{certificateTemplate.name || 'Mẫu chứng chỉ'}</p>
                          <RendererConfigModal
                            template={certificateTemplate.template}
                            data={certificateTemplate}
                            onSubmit={handleUpdateCertificateTemplate}
                            onError={() => {
                              toast.error(
                                tCourse('common.toast.updateError', {
                                  item: tCourse('common.courseTitle'),
                                })
                              );
                            }}
                            trigger={
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Settings className="h-4 w-4" />
                              </Button>
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </FormWrapper>
    </div>
  );
}
