"use client";
import { createAICourseService } from "@oe/api";
import type { ICourse } from "@oe/api";
import { type ICreateAICourseOutline, courseOutlineSchema } from "@oe/api";
import { CREATOR_ROUTES } from "@oe/core";
import { buildUrl } from "@oe/core";
import { GENERATING_STATUS } from "@oe/core";
import { toast } from "@oe/ui";
import { Uploader } from "@oe/ui";
import { Button } from "@oe/ui";
import { useRouter } from "@oe/ui";
import { FormWrapper } from "@oe/ui";
import { InputNumber } from "@oe/ui";
import { SelectLanguage } from "@oe/ui";
import { Textarea } from "@oe/ui";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { DurationField } from "./form-field/duration-field";
import { CourseFormField } from "./form-field/form-field";
import { LevelField } from "./form-field/level-field";

export function CourseOutlineForm({
  className,
  course,
}: {
  className?: string;
  course: ICourse | null;
}) {
  const tAICourseForm = useTranslations("course.aiCourse");
  const tGeneral = useTranslations("general");
  const locale = useLocale();

  const router = useRouter();

  const generating = useMemo(
    () =>
      GENERATING_STATUS.includes(course?.ai_course?.general_info_status ?? ""),
    [course]
  );

  const defaultValues = useMemo(() => {
    if (course) {
      const { ai_course } = course;
      return {
        learner_info: ai_course?.learner_info ?? "",
        content_info: ai_course?.content_info ?? "",
        level_id: ai_course?.level_id ?? "",
        language: ai_course?.language ?? locale,
        duration: ai_course?.duration ?? 1,
        duration_type: ai_course?.duration_type ?? "day",
        study_load: ai_course?.study_load ?? 1,
        material_file: ai_course?.material,
      };
    }

    return {
      learner_info: "",
      content_info: "",
      level_id: "",
      language: locale,
      duration: 1,
      duration_type: "day" as ICreateAICourseOutline["duration_type"],
      study_load: 1,
    };
  }, [course, locale]);

  const onSubmit = async (data: ICreateAICourseOutline) => {
    const { material_file, ...base } = data;

    try {
      const res = await createAICourseService(undefined, {
        ...base,
        course_cuid: course?.ai_course?.course_cuid,
        material_id: material_file?.id,
        current_step: "learner_description_generate",
        type: "learner_description",
      });
      router.push(
        buildUrl({
          endpoint: CREATOR_ROUTES.aiCourseDetail,
          params: { id: res.id },
        })
      );
    } catch {
      toast.error(tAICourseForm("aiCreateError"));
    }
  };

  return (
    <FormWrapper
      id="ai_course_outline_form"
      schema={courseOutlineSchema}
      className={className}
      useFormProps={{ defaultValues }}
      onSubmit={onSubmit}
    >
      {({ form }) => (
        <>
          <CourseFormField
            name="learner_info"
            label={tAICourseForm("learnerInfo")}
            required
          >
            <Textarea rows={8} className="scrollbar" />
          </CourseFormField>

          <CourseFormField
            name="content_info"
            label={tAICourseForm("courseContent")}
            required
          >
            <Textarea rows={8} className="scrollbar" />
          </CourseFormField>

          <CourseFormField
            name="material_file"
            label={tAICourseForm("materialContent")}
            render={({ field }) => {
              const { onChange, value } = field;

              return (
                <Uploader
                  value={value}
                  onChange={onChange}
                  maxSizeBytes={50 * 1024 * 1024}
                  fileListVisible={false}
                  accept="application/pdf, application/vnd.ms-excel"
                />
              );
            }}
          />
          <LevelField />
          <CourseFormField name="language" label={tAICourseForm("language")}>
            <SelectLanguage />
          </CourseFormField>
          <DurationField form={form} />
          <CourseFormField
            name="study_load"
            label={tAICourseForm("studyLoad")}
            required
          >
            <InputNumber min={1} step={1} />
          </CourseFormField>
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              disabled={!!course?.id || generating}
              onClick={() => {
                form.reset();
              }}
            >
              {tGeneral("reset")}
            </Button>
            <Button
              type="submit"
              disabled={!!course?.id || generating}
              loading={form.formState.isSubmitting || generating}
            >
              {form.formState.isSubmitting || generating
                ? tGeneral("generating")
                : tGeneral("generate")}
            </Button>
          </div>
        </>
      )}
    </FormWrapper>
  );
}
