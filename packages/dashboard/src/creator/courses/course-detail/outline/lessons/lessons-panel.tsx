"use client";
import type { ILesson } from "@oe/api";
import { Button } from "@oe/ui";
import { DndSortable, DndSortableDragButton } from "@oe/ui";
import { cn } from "@oe/ui";
import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import { SegmentBadgeSelect } from "../../../_components/segment-badge-select";
import { useLessonActions } from "../../_hooks/useLessonActions";
import { buildOutlineRoute } from "../../_utils/build-outline-route";

export function LessonsPanel({
  className,
  closeButton,
}: {
  className?: string;
  closeButton?: ReactNode;
}) {
  const tCourse = useTranslations("course");
  const {
    activeSection,
    courseId,
    sectionId,
    lessonId,
    handleAddLesson,
    handleSortLessons,
  } = useLessonActions();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState(false);

  const onAddLesson = async () => {
    setLoading(true);
    await handleAddLesson();
    setLoading(false);
  };

  const handleSelectLesson = (lesson: ILesson) => {
    const outlineRoute = buildOutlineRoute({
      courseId,
      sectionId,
      lessonId: lesson.id,
    });
    if (outlineRoute) {
      router.push(outlineRoute);
    }
  };

  const onSortLessons = async (lessons: ILesson[]) => {
    setSorting(true);
    await handleSortLessons(lessons);
    setSorting(false);
  };

  return (
    <div
      className={cn(
        "flex h-full w-[300px] shrink-0 cursor-pointer flex-col gap-2 overflow-y-auto p-0",
        className
      )}
    >
      <div className="pb-0">
        <Button
          variant="outline"
          className="flex w-full items-center justify-center gap-2 text-blue-600 hover:bg-background/80 hover:text-primary/80"
          onClick={onAddLesson}
          loading={loading}
          disabled={loading}
          title="Add Lesson"
        >
          <PlusIcon className="h-4 w-4" />
          {tCourse("outline.lesson.actions.addNew")}
        </Button>
        {closeButton}
      </div>
      <DndSortable<ILesson, unknown>
        data={activeSection?.lessons?.sort((a, b) => a.order - b.order) || []}
        dataConfig={{
          idProp: "id",
          type: "array",
          direction: "vertical",
        }}
        className="scrollbar flex h-[calc(100vh-330px)] flex-col gap-2 overflow-y-auto pt-0"
        loading={sorting}
        renderConfig={{
          renderItem: ({ item }) => (
            <div
              className={cn(
                "flex items-center gap-2 rounded-md border bg-background p-2 ",
                item?.original.id === lessonId && "border-primary",
                !item?.original.title && "border-destructive"
              )}
              title={item?.original.title}
              onClick={() => handleSelectLesson(item?.original)}
              onKeyDown={() => {
                void 0;
              }}
            >
              <DndSortableDragButton />
              <p className="truncate font-medium text-sm">
                {item?.original.title}
              </p>
              <SegmentBadgeSelect
                className="ml-auto"
                status={item?.original.status}
                data={item?.original}
                type="lesson"
              />
            </div>
          ),
        }}
        onChange={onSortLessons}
      />
    </div>
  );
}
