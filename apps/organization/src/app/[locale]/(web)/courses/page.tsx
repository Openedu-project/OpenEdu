import { generateSEO } from '@oe/core';
import { CoursesListPage } from '@oe/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEO({
  title: 'Courses',
  keywords: ['course', 'education', 'training', 'online learning'],
});

export default function CoursesPage({
  searchParams,
}: {
  searchParams: { n?: string };
}) {
  return <CoursesListPage isOpenEdu={false} searchParams={searchParams} />;
}
