"use client";

import { useGetCoursesPublish } from "@oe/api/hooks/useCourse";
import type { ICourseResponse } from "@oe/api/types/course/course";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import CourseGrid from "./course-grid";
import { CourseGridSkeleton } from "./course-skeleton";
import PaginationWrapper from "./pagination-wrapper";
import { getSearchParamsData } from "./search-params-handler";

const PER_PAGE = 12;

interface CourseListProps {
  isOpenEdu: boolean;
  orgId?: string;
  fallback?: ICourseResponse;
}

export default function CourseList({
  isOpenEdu,
  orgId,
  fallback,
}: CourseListProps) {
  const searchParams = useSearchParams();
  const [params, setParams] = useState(() => {
    const searchParamsData = getSearchParamsData(searchParams);
    return {
      ...searchParamsData,
      page: 1,
      per_page: PER_PAGE,
      enable_root: isOpenEdu,
      org_id: orgId,
      sort: "create_at desc",
      preloads: ["Categories", "Owner", "Levels"],
    };
  });

  const {
    dataListCourses: dataCoursesPublish,
    isLoadingCourses,
    mutateListCourses,
  } = useGetCoursesPublish(params, params.page === 1 ? fallback : undefined);

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  if (isLoadingCourses) {
    return <CourseGridSkeleton />;
  }

  return (
    <>
      <CourseGrid
        courses={dataCoursesPublish?.results}
        mutate={mutateListCourses}
      />
      <PaginationWrapper
        currentPage={dataCoursesPublish?.pagination?.page ?? 1}
        totalCount={dataCoursesPublish?.pagination?.total_items ?? 0}
        onPageChange={handlePageChange}
        pageSize={PER_PAGE}
      />
    </>
  );
}
