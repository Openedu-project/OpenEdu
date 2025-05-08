import { CoursesListPage, SEOMetadata } from '@oe/ui';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'coursesMetadata' });

  return SEOMetadata({
    title: t('courses'),
    description: t('description'),
    keywords: ['course', 'education', 'training', 'online learning', 'certificate'],
  });
}

export default function CoursesPage({
  searchParams,
}: {
  searchParams: { n?: string };
}) {
  return <CoursesListPage isOpenEdu={false} searchParams={searchParams} />;
}
