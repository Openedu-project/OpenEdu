"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { ListBlogs } from "../../_components/list-blogs";
import { ListPopularCourses } from "../../_components/list-popular-courses";

export default function FeaturedContentsPage() {
  const { type, settingKey } = useParams();

  const renderedContent = useMemo(() => {
    if (type === "popular" && settingKey === "course") {
      return <ListPopularCourses />;
    }

    if (type === "popular" && settingKey === "blog") {
      return <ListBlogs />;
    }

    return false;
  }, [type, settingKey]);
  return (
    renderedContent || (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        No data
      </div>
    )
  );
}
