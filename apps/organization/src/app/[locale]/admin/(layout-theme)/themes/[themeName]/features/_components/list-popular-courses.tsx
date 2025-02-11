"use client";
import { useGetCoursesPublish } from "@oe/api/hooks/useCourse";
import {
  useGetPopularCourses,
  useUpdateFeaturedContent,
} from "@oe/api/hooks/useFeaturedContent";
import type { ICourse } from "@oe/api/types/course/course";
import type { IFeaturedContent } from "@oe/api/types/featured-contents";
import { DndSortable } from "@oe/ui/components/dnd-sortable";
import { PaginationCustom } from "@oe/ui/components/pagination-custom";
import { Button } from "@oe/ui/shadcn/button";
import { Input } from "@oe/ui/shadcn/input";
import { toast } from "@oe/ui/shadcn/sonner";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import type React from "react";
import { CourseItem } from "./course-item";

const PER_PAGE = 4;

const ListPopularCourses = ({
  orgId,
  domain,
}: {
  orgId?: string;
  domain?: string;
}) => {
  const t = useTranslations("themeFeaturedContent");
  const { triggerUpdateFeaturedContent } = useUpdateFeaturedContent();

  const [items, setItems] = useState<ICourse[]>([]);
  const [selectedDisplay, setSelectedDisplay] = useState<
    IFeaturedContent<undefined>[] | undefined
  >(undefined);
  const [maxDisplay, setMaxDisplay] = useState<number>(4);

  const [params, setParams] = useState(() => {
    return {
      page: 1,
      per_page: PER_PAGE,
      enable_root: false,
      org_id: orgId,
      sort: "create_at desc",
      preloads: ["Categories", "Owner", "Levels"],
    };
  });

  const { dataPopularCourses } = useGetPopularCourses({
    params: { org_id: domain ?? "" },
  });

  const { dataListCourses: dataCoursesPublish, isLoadingCourses } =
    useGetCoursesPublish(params);

  const processedData = useMemo(() => {
    if (!(dataCoursesPublish?.results && dataPopularCourses?.results)) {
      return null;
    }

    return {
      courses: dataCoursesPublish.results,
      popularCourses: dataPopularCourses.results,
    };
  }, [dataCoursesPublish, dataPopularCourses]);

  const handleSort = useCallback((newItems: ICourse[]) => {
    setItems(newItems);
    setSelectedDisplay((prev) =>
      prev?.map((item, index) => ({
        ...item,
        order: index,
      }))
    );
  }, []);

  const handleSave = useCallback(async () => {
    const featuredContents = selectedDisplay?.map((content, index) => ({
      entity_id: content.entity_id,
      order: index,
    }));

    if (!domain) {
      toast.error("Missing domain");
      return;
    }

    try {
      const res = await triggerUpdateFeaturedContent({
        org_id: domain ?? "",
        type: "popular",
        entity_type: "course",
        entities: featuredContents || [],
      });

      if (!res) {
        throw new Error("Update failed");
      }

      toast.success("Featured contents updated successfully");
    } catch (error) {
      console.error("Failed to update featured contents:", error);
      toast.error("Failed to update featured contents");
    }
  }, [selectedDisplay, triggerUpdateFeaturedContent, domain]);

  const handleCheckboxChange = useCallback(
    (checked: boolean, course: ICourse) => {
      if (checked) {
        if (!selectedDisplay || selectedDisplay?.length >= maxDisplay) {
          toast.error(`Maximum ${maxDisplay} items allowed`);
          return;
        }

        const newFeaturedContent: IFeaturedContent<undefined> = {
          id: "",
          org_id: "",
          entity_id: course.cuid,
          entity_type: "course",
          enabled: true,
          order: selectedDisplay.length,
          type: "course",
          entity: undefined,
        };

        setSelectedDisplay((prev) =>
          prev ? [...prev, newFeaturedContent] : []
        );
      } else {
        setSelectedDisplay((prev) =>
          prev?.filter((item) => item.entity_id !== course.cuid)
        );
      }
    },
    [maxDisplay, selectedDisplay]
  );

  const handlePageChange = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  const handleMaxDisplayChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMaxDisplay(Number(e.currentTarget.value));
    },
    []
  );

  useEffect(() => {
    if (dataCoursesPublish?.results) {
      setItems(dataCoursesPublish?.results);
    }
  }, [dataCoursesPublish]);

  useEffect(() => {
    if (!selectedDisplay && dataPopularCourses?.results) {
      setSelectedDisplay(dataPopularCourses?.results);
    }
  }, [selectedDisplay, dataPopularCourses]);

  if (isLoadingCourses) {
    return <div className="p-4">Loading...</div>;
  }

  if (!processedData) {
    return <div className="p-4">No data available</div>;
  }

  return (
    <div className="mx-auto w-full space-y-6 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-foreground/80 text-sm">{t("select")}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-sm">{t("maxItems")}</span>
              <Input
                type="number"
                value={maxDisplay}
                onChange={handleMaxDisplayChange}
                className="w-20"
              />
            </div>
            <p className="text-sm">
              {t("showing")} {selectedDisplay?.length ?? 0}/{maxDisplay}
            </p>
            <Button onClick={handleSave}>{t("saveChanges")}</Button>
          </div>
        </div>
      </div>

      {items.length > 0 && (
        <DndSortable<ICourse, unknown>
          data={items}
          dataConfig={{
            idProp: "cuid",
            type: "array",
            direction: "horizontal",
          }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          renderConfig={{
            renderItem: ({ item }) => (
              <CourseItem
                key={item.original.cuid}
                course={item.original}
                isSelected={
                  !!selectedDisplay?.find(
                    (c) => c.entity_id === item.original.cuid
                  )
                }
                onCheckboxChange={handleCheckboxChange}
              />
            ),
          }}
          onChange={handleSort}
        />
      )}

      <PaginationCustom
        currentPage={dataCoursesPublish?.pagination?.page ?? 1}
        totalCount={dataCoursesPublish?.pagination?.total_items ?? 0}
        onPageChange={handlePageChange}
        pageSize={PER_PAGE}
        className="p-8"
      />
    </div>
  );
};

export { ListPopularCourses };
