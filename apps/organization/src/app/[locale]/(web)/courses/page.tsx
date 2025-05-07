import { CoursesListPage, SEOMetadata } from '@oe/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = SEOMetadata({
  title: 'Courses',
  keywords: ['course', 'education', 'training', 'online learning', 'certificate'],
});

export default function CoursesPage({
  searchParams,
}: {
  searchParams: { n?: string };
}) {
  return <CoursesListPage isOpenEdu={false} searchParams={searchParams} />;
}
