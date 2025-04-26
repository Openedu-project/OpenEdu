import { generateSEO } from '@oe/core';
import { CoursesListPage } from '@oe/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEO({
  title: 'Courses',
  keywords: ['openedu.net', 'course', 'education', 'training', 'online learning', 'certificate'],
});

export default function CoursesPage({
  searchParams,
}: {
  searchParams: { n?: string };
}) {
  return <CoursesListPage isOpenEdu searchParams={searchParams} />;
}
