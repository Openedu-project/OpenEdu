import {
  getOrgByDomainService,
  getPopularCoursesServicesAtWebsite,
} from "@oe/api";
import { Carousel } from "@oe/ui";
import { getTranslations } from "next-intl/server";
import { CarouselWrapper } from "./popular-course-carousel";

export async function PopularCoursesSection() {
  const orgData = await getOrgByDomainService();
  const [t, dataPopularCourses] = await Promise.all([
    getTranslations("homePageLayout.popularCoursesSection"),
    getPopularCoursesServicesAtWebsite(undefined, {
      params: { org_id: orgData?.domain ?? orgData?.alt_domain ?? "" },
    }),
  ]);

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
          params={{ org_id: orgData?.domain ?? orgData?.alt_domain ?? "" }}
        />
      </Carousel>
    </section>
  );
}
