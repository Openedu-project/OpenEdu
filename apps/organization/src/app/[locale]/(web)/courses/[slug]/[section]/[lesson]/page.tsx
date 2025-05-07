import { getCourseOutlineService } from '@oe/api';
import { LearningPage, SEOMetadata } from '@oe/ui';
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
    keywords: ["course", "learning"],
    ogImage: {
      url: course?.thumbnail?.url ?? "",
      alt: course?.thumbnail?.name ?? course?.name,
    },
  });
}

export default async function CourseLearningPage({
  params,
}: {
  params: Promise<{ slug: string; section: string; lesson: string }>;
}) {
  const slug = (await params).slug;
  const section = (await params).section;
  const lesson = (await params).lesson;

  return <LearningPage slug={slug} section={section} lesson={lesson} />;
}
