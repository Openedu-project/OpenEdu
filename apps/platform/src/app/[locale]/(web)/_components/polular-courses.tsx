"use client";
import {
  useGetOrganizationByDomain,
  useGetPopularCoursesAtWebsite,
} from "@oe/api";
import { Carousel } from "@oe/ui";
import { useTranslations } from "next-intl";
import { CarouselWrapper } from "./popular-course-carousel";

export function PopularCoursesSection() {
  const t = useTranslations("homePageLayout.popularCoursesSection");
  const { organizationByDomain } = useGetOrganizationByDomain();
  const { dataPopularCourses } = useGetPopularCoursesAtWebsite({
    params: {
      org_id:
        organizationByDomain?.alt_domain ?? organizationByDomain?.domain ?? "",
    },
  });
  // const orgData = await getOrgByDomainService();
  // const [t, dataPopularCourses] = await Promise.all([
  //   getTranslations("homePageLayout.popularCoursesSection"),
  //   getPopularCoursesServicesAtWebsite(undefined, {
  //     params: { org_id: orgData?.domain ?? orgData?.alt_domain ?? "" },
  //   }),
  // ]);

  // const courses = coursesData?.results || [];
  // const hasMultipleSlides = courses.length > 8;

  // const slides: ICourse[][] = [];
  // for (let i = 0; i < courses.length; i += 8) {
  //   slides.push(courses.slice(i, i + 8));
  // }

  return (
    <section className="container relative mx-auto px-0 md:px-4">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselWrapper
          dataPopularCourses={dataPopularCourses}
          // hasMultipleSlides={hasMultipleSlides}
          viewAllText={t("viewAll")}
          title={t("title")}
          params={{
            org_id:
              organizationByDomain?.alt_domain ??
              organizationByDomain?.domain ??
              "",
          }}
        />
      </Carousel>
    </section>
  );
}
