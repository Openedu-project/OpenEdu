import { getCourseOutlineService } from '@oe/api';
import { generateSEO } from '@oe/core';
import { CourseDetailPage } from '@oe/ui';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseOutlineService(undefined, { id: slug });

  return generateSEO({
    title: course?.name ?? '',
    description: course?.description,
    keywords: ['course', 'learning'],
    openGraph: {
      images: [
        {
          url: course?.thumbnail.url ?? '',
          alt: course?.name,
        },
      ],
    },
    twitter: {
      image: course?.thumbnail.url ?? '',
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
