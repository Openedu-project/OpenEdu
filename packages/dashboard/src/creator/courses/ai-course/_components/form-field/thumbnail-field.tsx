import { useGetCourseById } from '@oe/api/hooks/useCourse';
import type { ICreateAICourseInfo } from '@oe/api/schemas/courses/createCourseSchema';
import { createAICourseService } from '@oe/api/services/course';
import type { IAICourseStatus } from '@oe/api/types/course/ai-course';
import type { ICourse } from '@oe/api/types/course/course';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { Image } from '@oe/ui/components/image';
import { Button } from '@oe/ui/shadcn/button';
import { Label } from '@oe/ui/shadcn/label';
import { RadioGroup, RadioGroupItem } from '@oe/ui/shadcn/radio-group';
import { Skeleton } from '@oe/ui/shadcn/skeleton';
import { Switch } from '@oe/ui/shadcn/switch';
import { Textarea } from '@oe/ui/shadcn/textarea';
import { useSocketStore } from '@oe/ui/store/socket';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, type Dispatch, type SetStateAction, useEffect, useMemo, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useEditAICourseInfo } from '../../_store';
import { CourseFormField } from './form-field';

export interface IThumbnailFieldProps {
  courseData: ICourse;
  form: UseFormReturn<ICreateAICourseInfo>;
  setSubmitButtonProps: Dispatch<
    SetStateAction<
      | {
          loading: boolean;
          disabled: boolean;
        }
      | undefined
    >
  >;
}

const IMAGE_NUMBER = 2;
const MAX_GEN_THUMBNAIL = 2;

export function ThumbnailField({ courseData, form, setSubmitButtonProps }: IThumbnailFieldProps) {
  const tAICourseForm = useTranslations('courses.aiCourse');
  const [error, setError] = useState(false);
  const [status, setStatus] = useState<IAICourseStatus | undefined>(courseData?.ai_course?.thumbnail_status);
  const { AICourseStatusData, resetSocketData } = useSocketStore();
  const { course, mutateCourse } = useGetCourseById(courseData?.id, courseData);
  const { courseInfo, setCourseInfo } = useEditAICourseInfo();

  useEffect(() => {
    if (
      AICourseStatusData?.data &&
      AICourseStatusData?.data?.course_id === course?.id &&
      AICourseStatusData?.data.thumbnail_status !== 'pending'
    ) {
      void mutateCourse?.();
      setSubmitButtonProps({ loading: false, disabled: false });
      setStatus(AICourseStatusData?.data.thumbnail_status);
      resetSocketData('ai_course_status');
    }
  }, [AICourseStatusData, resetSocketData, course?.id, mutateCourse, setSubmitButtonProps]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const defaultDesc = useMemo(() => {
    if (courseInfo?.courseId !== courseData.id) {
      setCourseInfo({ ...courseInfo, thumbnail_desc: courseData?.ai_course?.thumbnail_description });
      return courseData?.ai_course?.thumbnail_description;
    }
    const initValue =
      (courseInfo?.thumbnail_desc?.length ?? 0) > 0
        ? courseInfo?.thumbnail_desc
        : courseData?.ai_course?.thumbnail_description;
    if (!initValue || initValue.length === 0) {
      setError(true);
    }
    return initValue;
  }, []);

  const thumbnails = useMemo(() => {
    if (!course?.ai_course) {
      return [];
    }
    const { ai_course } = course;

    if ((ai_course?.thumbnail_description?.length ?? 0) > 0) {
      setError(false);
    }

    return ai_course?.thumbnail_generated;
  }, [course]);

  const remainGenThubmnail = useMemo(
    () => MAX_GEN_THUMBNAIL - (course?.ai_course?.thumbnail_generate_count ?? 0),
    [course]
  );

  const handleGenThumbnail = async () => {
    const desc = document.getElementById('thumbnail_desc') as HTMLTextAreaElement;

    try {
      const res = await createAICourseService(undefined, {
        thumbnail_description: desc.value,
        thumbnail_quantity: IMAGE_NUMBER,
        type: 'learner_description',
        current_step: 'thumbnail_generate',
        course_cuid: course?.cuid,
      });

      if (res) {
        await mutateCourse?.();
        setStatus('generating');
        setSubmitButtonProps({ loading: false, disabled: true });
      }
    } catch {
      setStatus('failed');
    }
  };

  return (
    <>
      <CourseFormField
        name="thumbnail_included"
        fieldType="checkbox"
        label={tAICourseForm?.rich(remainGenThubmnail > 1 ? 'genAIForThumbnail2' : 'genAIForThumbnail', {
          number: remainGenThubmnail,
        })}
        render={({ field }) => (
          <Switch
            checked={field.value}
            onCheckedChange={val => {
              field.onChange(val);
              setCourseInfo({ ...courseInfo, thumbnail_included: val });
            }}
          />
        )}
      />
      {form.watch('thumbnail_included') && (
        <CourseFormField
          label={tAICourseForm('thumbnailDesc')}
          name="thumbnail_id"
          render={({ field }) => (
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <Textarea
                id="thumbnail_desc"
                placeholder={tAICourseForm('thumbnailPlaceholder')}
                rows={5}
                className="w-full"
                defaultValue={defaultDesc}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  const desc = e.currentTarget.value;
                  setCourseInfo({ ...courseInfo, thumbnail_desc: desc });
                  if (desc.length === 0) {
                    setError(true);
                  } else {
                    setError(false);
                  }
                }}
              />
              {thumbnails && thumbnails.length > 0 && (
                <RadioGroup
                  className="flex flex-wrap justify-center gap-spacing-mml"
                  {...field}
                  onValueChange={val => {
                    field.onChange(val);
                    setCourseInfo({ ...courseInfo, thumbnail_id: val });
                  }}
                >
                  {thumbnails?.map(image => (
                    <div
                      className={cn(
                        'relative aspect-video h-[200px] rounded-xl bg-blue-50',
                        field.value === image.id && 'border-2 border-primary'
                      )}
                      key={image.id}
                    >
                      <RadioGroupItem
                        value={image.id}
                        id={image.id}
                        className="absolute top-2 right-2 z-[20] bg-white"
                      />
                      <Label htmlFor={image.id} className="cursor-pointer">
                        <Image
                          src={image.url}
                          alt="ai-course"
                          noContainer
                          fill
                          priority
                          sizes="(max-width: 768px) 300px, (max-width: 1200px) 720px, 720px"
                          className="rounded-xl"
                        />
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {GENERATING_STATUS.includes(status ?? '') && (
                <div className="flex flex-wrap justify-center gap-6">
                  {Array.from({ length: IMAGE_NUMBER }, (_, i) => (
                    <Skeleton
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      key={i}
                      className="aspect-video h-[200px] rounded-xl"
                    />
                  ))}
                </div>
              )}

              {remainGenThubmnail > 0 && (
                <Button
                  variant="outline"
                  type="button"
                  disabled={
                    error ||
                    course?.ai_generate_status !== 'waiting' ||
                    GENERATING_STATUS.includes(course?.ai_course?.thumbnail_status ?? '')
                  }
                  className="w-full rounded-xl border-primary text-primary md:h-12"
                  onClick={handleGenThumbnail}
                >
                  {tAICourseForm('genThumbnail')}
                </Button>
              )}
            </div>
          )}
        />
      )}
    </>
  );
}
