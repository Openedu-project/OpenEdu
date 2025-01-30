import { getCoursesPublishService } from '@oe/api/services/course';
import type { ICourse } from '@oe/api/types/course/course';
import { Carousel } from '@oe/ui/shadcn/carousel';
import { getTranslations } from 'next-intl/server';
import { CarouselWrapper } from './popular-course-carousel';

export default async function PopularCoursesSection() {
  const [t, coursesData] = await Promise.all([
    getTranslations('homePageLayout.popularCoursesSection'),
    getCoursesPublishService(undefined, {
      params: {
        page: 1,
        per_page: 16,
        enable_root: true,
        sort: 'create_at desc',
        preloads: ['Categories', 'Owner', 'Levels'],
      },
    }),
  ]);

  const courses = coursesData?.results || [];
  const hasMultipleSlides = courses.length > 8;

  const slides: ICourse[][] = [];
  for (let i = 0; i < courses.length; i += 8) {
    slides.push(courses.slice(i, i + 8));
  }

  return (
    <section className="container relative mx-auto px-0 py-5 md:px-4 md:py-10">
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        className="w-full"
      >
        <CarouselWrapper
          slides={slides}
          hasMultipleSlides={hasMultipleSlides}
          viewAllText={t('viewAll')}
          title={t('title')}
        />
      </Carousel>
    </section>
  );
}
