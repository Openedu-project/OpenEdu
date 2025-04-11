'use client';
import { buildQueryParam } from '@oe/core';
import { ArrowDownUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { usePathname, useRouter } from '#common/navigation';
import { Button } from '#shadcn/button';
import { CourseListFilter } from './course-list-filter';

interface ICourseListHeader {
  categoryIdsSelected: string[];
  levelIdsSelected: string[];
  orgIdsSelected: string[];
  completeCourseSelected: string[];
  sortValue: string;
  totalResult: number;
}

export function CourseListHeader({
  sortValue = 'desc',
  totalResult = 0,
  categoryIdsSelected,
  levelIdsSelected,
  orgIdsSelected,
  completeCourseSelected,
}: ICourseListHeader) {
  const t = useTranslations('courseList');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<string>(sortValue);

  const handleSort = useCallback(() => {
    const newSort = sort === 'desc' ? 'asc' : 'desc';
    setSort(newSort);
    router.push(
      `${pathname}?${buildQueryParam({
        currentParams: searchParams,
        params: [
          {
            name: 'sort',
            value: newSort,
          },
        ],
      })}`,
      {
        scroll: false,
      }
    );
  }, [router, pathname, searchParams, sort]);

  return (
    <div className="flex flex-col gap-2 p-4 md:flex-row md:items-center md:justify-between md:p-8">
      <p className="giant-iheading-semibold16 md:giant-iheading-semibold20 lg:giant-iheading-semibold28">
        {totalResult}&nbsp;
        {totalResult > 1 ? t('results') : t('result')}&nbsp;
        {t('found')}
      </p>
      <div className="flex items-center gap-3">
        <CourseListFilter
          categoryIdsSelected={categoryIdsSelected}
          levelIdsSelected={levelIdsSelected}
          orgIdsSelected={orgIdsSelected}
          completeCourseSelected={completeCourseSelected}
        />
        <Button
          variant={sort === 'desc' ? 'outline' : 'secondary'}
          className="flex items-center gap-2"
          onClick={handleSort}
        >
          <ArrowDownUp />
          <span>{t('sort')}</span>
        </Button>
      </div>
    </div>
  );
}
