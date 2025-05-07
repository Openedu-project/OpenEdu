import { getCourseOutlineService } from '@oe/api';
import { CourseDetailPage, SEOMetadata } from '@oe/ui';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseOutlineService(undefined, { id: slug });

  return SEOMetadata({
    title: course?.name,
    description: course?.description,
    keywords: ['course', 'learning'],
    ogImage: {
      url: course?.thumbnail.url ?? '',
      alt: course?.thumbnail?.name ?? course?.name,
    },
  });
}

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <div>
      <CourseDetailPage slug={slug} />
    </div>
  );
}
