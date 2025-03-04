'use client';

import { useGetCertLayers } from '@oe/api/hooks/useCertificate';
import { useGetCourseById } from '@oe/api/hooks/useCourse';
import { type ICreateCourseCertificate, courseCertificateSchema } from '@oe/api/schemas/courses/createCourseSchema';
import { updateCourseService } from '@oe/api/services/course';
import type { ICourse } from '@oe/api/types/course/course';
import { FormWrapper } from '@oe/ui/components/form-wrapper';
import { Button } from '@oe/ui/shadcn/button';
import { CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@oe/ui/shadcn/carousel';
import { Carousel } from '@oe/ui/shadcn/carousel';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { toast } from '@oe/ui/shadcn/sonner';
import { Switch } from '@oe/ui/shadcn/switch';
import { CheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { COURSE_DETAIL_FORM_IDS } from '../_utils/constants';
import { CertificateCondition } from './_components/certificate-condition';
import { CertificateTemplate } from './_components/certificate-template';

export default function CourseDetailCertificatePage() {
  const tCourse = useTranslations('course');
  const tCertificate = useTranslations('certificate');
  const { courseId } = useParams<{ courseId: string }>();
  const { course, mutateCourse } = useGetCourseById(courseId);
  const { dataCertLayers } = useGetCertLayers({
    courseId,
  });

  const certificateLayer = dataCertLayers?.results?.find(layer => layer.type === 'certificate_layer');

  const certificateTemplates = dataCertLayers?.results?.filter(layer => layer.type === 'certificate_template');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.classList.add('overflow-hidden');
    }
  }, []);

  const handleSubmit = async (data: ICreateCourseCertificate) => {
    const certificateLayer = dataCertLayers?.results?.find(layer => layer.type === 'certificate_layer');
    if (!certificateLayer) {
      toast.error(tCertificate('noCertificateLayer'));
      return;
    }
    if (!course) {
      return;
    }
    await updateCourseService(undefined, {
      ...course,
      ...data,
      thumbnail: course?.thumbnail,
      thumbnail_id: course?.thumbnail?.id,
    } as ICourse);
    await mutateCourse();
    toast.success(
      tCourse('common.toast.updateSuccess', {
        item: tCourse('common.courseTitle'),
      })
    );
  };

  return (
    <FormWrapper
      id={COURSE_DETAIL_FORM_IDS.certificate}
      schema={courseCertificateSchema}
      useFormProps={{
        defaultValues: course,
      }}
      onSubmit={handleSubmit}
      onError={() => {
        toast.error(
          tCourse('common.toast.updateError', {
            item: tCourse('common.courseTitle'),
          })
        );
      }}
      className="mx-auto flex h-full max-w-[900px] flex-col gap-4 space-y-0 px-1 py-4"
    >
      {({ loading, form }) => (
        <>
          <div className="flex items-center justify-between rounded-lg bg-background px-4 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <FormFieldWithLabel
                name="has_certificate"
                // className="py-2"
                isToggleField
                label={tCertificate('display.title')}
                description={tCertificate('display.displayDescription')}
                render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
              />
            </div>
            {form.watch('has_certificate') && (
              <Button size="sm" type="submit" disabled={loading} loading={loading}>
                {tCourse('common.actions.save')}
                <CheckIcon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="scrollbar flex h-full flex-col gap-4 overflow-auto">
            {form.watch('has_certificate') && (
              <>
                <div className="rounded-lg bg-background p-4 shadow-sm">
                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <span className="font-medium text-lg">{tCertificate('selectTemplate.title')}</span>
                      <Carousel
                        opts={{
                          align: 'start',
                          containScroll: 'trimSnaps',
                        }}
                        className="w-full"
                      >
                        <CarouselContent className="-ml-2 md:-ml-4">
                          {certificateTemplates?.map(certificateTemplate => (
                            <CarouselItem key={certificateTemplate.id} className="pl-2 md:basis-1/2 md:pl-4">
                              <CertificateTemplate certificateTemplate={certificateTemplate} courseId={courseId} />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="-translate-x-0 absolute left-0" />
                        <CarouselNext className="absolute right-0 translate-x-0" />
                      </Carousel>
                    </div>

                    {certificateLayer && (
                      <div className="space-y-2">
                        <span className="font-medium text-lg">{tCertificate('selectTemplate.usedCertificate')}</span>
                        <CertificateTemplate certificateTemplate={certificateLayer} courseId={courseId} />
                      </div>
                    )}

                    <div className="space-y-2">
                      <span className="font-medium text-lg">{tCertificate('conditions.title')}</span>
                      <CertificateCondition />
                    </div>
                  </div>
                </div>
                {/* {certificateLayer && (
                  <CertificateMintNFT certificateLayer={certificateLayer} />
                )} */}
              </>
            )}
          </div>
        </>
      )}
    </FormWrapper>
  );
}
