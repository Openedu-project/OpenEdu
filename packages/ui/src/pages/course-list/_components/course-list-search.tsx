'use client';

import { buildQueryParam } from '@oe/core';
import { MoveRight, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { usePathname, useRouter } from '#common/navigation';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';

export function CourseListSearch({
  searchValue = '',
}: {
  searchValue: string;
}) {
  const t = useTranslations('courseList');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchValue ?? '');

  const handleSearch = useCallback(() => {
    router.push(
      `${pathname}?${buildQueryParam({
        currentParams: searchParams,
        params: [
          {
            name: 'search',
            value: value,
          },
        ],
        resetPage: true,
      })}`,
      {
        scroll: false,
      }
    );
  }, [router, pathname, searchParams, value]);

  return (
    <div className="flex h-[100px] items-center justify-center bg-course-search-gradient p-4 md:h-[160px] md:p-8">
      <Input
        prefixIcon={<Search />}
        className="rounded-[360px] md:h-14"
        onChange={e => setValue(e.target.value)}
        value={value}
        placeholder={t('placeholderSearchCourse')}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        suffixIcon={
          <Button
            className="flex h-7 w-7 items-center justify-center rounded-full p-2 md:h-10 md:w-10"
            onClick={handleSearch}
          >
            <MoveRight />
          </Button>
        }
      />
    </div>
  );
}
