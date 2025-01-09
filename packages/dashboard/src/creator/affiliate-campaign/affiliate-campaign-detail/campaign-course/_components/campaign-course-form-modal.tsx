import { useGetCourses } from "@oe/api/hooks/useCourse";
import { useGetMe } from "@oe/api/hooks/useMe";
import {
  type AddCoursesCampaignSchemaType,
  addCoursesCampaignSchema,
} from "@oe/api/schemas/affiliateCampaignSchema";
import { AutocompeteMultiple } from "@oe/ui/components/autocomplete";
import { Modal } from "@oe/ui/components/modal";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@oe/ui/shadcn/form";
import { useTranslations } from "next-intl";
import type { OptionType } from "node_modules/@oe/ui/src/components/autocomplete/types";
import { Suspense, useCallback, useMemo } from "react";

interface IFormAffiliateCampaignCourseModal {
  onSubmit: (value: { course_cuids: string[] }) => void;
  onClose: () => void;
}

export default function FormAffiliateCampaignCourseModal({
  onSubmit,
  onClose,
}: IFormAffiliateCampaignCourseModal) {
  const t = useTranslations("affiliateDetailCourseModal");
  const { dataMe } = useGetMe();
  const { dataListCourses: courses } = useGetCourses({
    params: {
      page: 1,
      per_page: 999_999,
      user_id: dataMe?.id ?? "",
      is_pay: true,
      latest: true,
      preloads: "Published",
    },
  });
  const dataCourses = useMemo(
    () =>
      courses?.results?.map((item) => ({
        label: item.name,
        value: item.cuid,
      })) ?? [],
    [courses?.results]
  );
  const handleFormSubmit = useCallback(
    async (values: AddCoursesCampaignSchemaType) => {
      await onSubmit({
        course_cuids: values.course_cuids,
      });
    },
    [onSubmit]
  );

  return (
    <Modal
      open={true}
      title={t("addCoursesTitle")}
      onClose={onClose}
      buttons={[
        {
          type: "button",
          label: t("cancel"),
          variant: "outline",
          onClick: () => onClose(),
        },
        {
          type: "submit",
          label: t("save"),
          variant: "default",
        },
      ]}
      validationSchema={addCoursesCampaignSchema}
      onSubmit={handleFormSubmit}
    >
      {(form) => {
        return (
          <>
            <FormField
              control={form.control}
              name="course_cuids"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("selectCourses")}</FormLabel>
                  <FormControl>
                    <Suspense>
                      <AutocompeteMultiple
                        options={dataCourses}
                        value={
                          field.value.map((courseId) => {
                            const course = dataCourses.find(
                              (course) =>
                                course.value === (courseId as unknown as string)
                            );
                            return course
                              ? course
                              : { label: courseId, value: courseId };
                          }) as OptionType[]
                        }
                        onChange={(selected) =>
                          field.onChange(selected.map((item) => item.value))
                        }
                      />
                    </Suspense>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      }}
    </Modal>
  );
}
