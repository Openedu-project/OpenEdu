"use client";

import { usePostCreateLaunchpad } from "@oe/api/hooks/useLaunchpad";
import type { ICourse } from "@oe/api/types/course/course";
import { createAPIUrl } from "@oe/api/utils/fetch";
import type { HTTPErrorMetadata } from "@oe/api/utils/http-error";
import { LAUNCHPAD_STATUS } from "@oe/api/utils/launchpad";
import { CREATOR_ROUTES } from "@oe/core/utils/routes";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "#common/navigation";
import { Button } from "#shadcn/button";
import { DialogContent, DialogTitle } from "#shadcn/dialog";
import { ScrollArea } from "#shadcn/scroll-area";
import { cn } from "#utils/cn";
import CourseCardCompact from "../../components/course-card/course-card-compact";

const SelectCreateCourse = ({
  dataCouses,
}: {
  dataCouses: ICourse[] | null;
}) => {
  const tError = useTranslations("errors");

  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const { triggerPostCreateLaunchpad, isLoadingPostCreateLaunchpad } =
    usePostCreateLaunchpad();

  const handleSelectCourse = (course: ICourse) => {
    setSelectedCourse(course);
  };

  const handleMakeLaunchpad = useCallback(async () => {
    const params = {
      name: selectedCourse?.name,
      description: selectedCourse?.description,
      thumbnail_id: selectedCourse?.thumbnail_id,
      course_cuid: selectedCourse?.cuid,
      status: LAUNCHPAD_STATUS.DRAFT,
      estimate_funding_days: 0,
      categories: [],
      levels: [],
    };
    try {
      const res = await triggerPostCreateLaunchpad(params);
      if (res) {
        const launchpadURL = createAPIUrl({
          endpoint: CREATOR_ROUTES.creatorCreateLaunchpadDetail,
          params: { id: res.id },
        });
        router.push(launchpadURL);
      }
    } catch (error) {
      console.error("Create Launchpad Error:", error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [router, selectedCourse, triggerPostCreateLaunchpad, tError]);

  return (
    <DialogContent className={cn("!max-w-5xl !rounded-3xl max-h-[90vh]")}>
      <DialogTitle>Select From Course List</DialogTitle>
      <ScrollArea className="h-[60vh]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dataCouses?.map((course) => (
            <CourseCardCompact
              key={course.id}
              course={course}
              isSelected={selectedCourse?.id === course.id}
              onClick={() => handleSelectCourse(course)}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="flex flex-col items-center justify-between gap-2 border-t pt-4 md:flex-row">
        <p>Notice: All course include 4 sections at least.</p>
        <Button
          className="rounded-xl font-semibold"
          onClick={handleMakeLaunchpad}
          loading={isLoadingPostCreateLaunchpad}
        >
          Make Launchpad
        </Button>
      </div>
    </DialogContent>
  );
};

export default SelectCreateCourse;
