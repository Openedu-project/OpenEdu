"use client";
import type { ICourse, IFeaturedContent } from "@oe/api";
import { useGetPopularCoursesAtWebsite } from "@oe/api";
import type { IFilter } from "@oe/api";
import { PLATFORM_ROUTES } from "@oe/core";
import { buttonVariants } from "@oe/ui";
import { Link } from "@oe/ui";
import { CourseCard } from "@oe/ui";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@oe/ui";
import { cn } from "@oe/ui";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { KeyedMutator } from "swr";

interface CarouselWrapperProps {
  dataPopularCourses?: IFeaturedContent<ICourse>[];
  // hasMultipleSlides: boolean;
  viewAllText: string;
  title: string;
  params?: IFilter;
  host?: string;
}

export function CarouselWrapper({
  dataPopularCourses,
  // hasMultipleSlides,
  viewAllText,
  title,
  params,
}: CarouselWrapperProps) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    loop: false,
  });

  const { dataPopularCourses: data, mutatePopularCourses } =
    useGetPopularCoursesAtWebsite({
      params: { org_id: params?.org_id ?? "" },
      fallback: dataPopularCourses,
    });

  const courses = data?.sort((a, b) => a.order - b.order) || [];
  const hasMultipleSlides = courses?.length > 8;

  // biome-ignore lint/suspicious/noEvolvingTypes: <explanation>
  const slides = [];
  for (let i = 0; i < courses?.length; i += 8) {
    slides.push(courses.slice(i, i + 8));
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          {hasMultipleSlides && (
            <div className="flex gap-2">
              <CarouselPrevious
                className={cn(
                  buttonVariants({
                    variant: "default",
                  }),
                  "static h-8 w-8 translate-x-0 translate-y-0 rounded-full p-0"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
              </CarouselPrevious>
              <CarouselNext
                className={cn(
                  buttonVariants({
                    variant: "default",
                  }),
                  "static h-8 w-8 translate-x-0 translate-y-0 rounded-full p-0"
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </CarouselNext>
            </div>
          )}
          <Link
            href={PLATFORM_ROUTES.courses}
            className={buttonVariants({ variant: "secondary" })}
          >
            {viewAllText}
          </Link>
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <CarouselContent>
          {slides?.map((slideItems) => (
            <CarouselItem key={slideItems[0]?.id}>
              <div className="grid grid-cols-1 gap-4 pb-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {slideItems?.map(
                  (course) =>
                    course?.entity && (
                      <CourseCard
                        key={course.id}
                        courseData={course?.entity}
                        className="h-full"
                        showHover={true}
                        showPrice={true}
                        showThubnail={true}
                        showOwner={false}
                        mutate={
                          mutatePopularCourses as KeyedMutator<
                            IFeaturedContent<ICourse>[]
                          >
                        }
                      />
                    )
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </>
  );
}
