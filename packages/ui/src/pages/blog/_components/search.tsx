import { BLOG_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from '#common/navigation';
import { Input } from '#shadcn/input';

export function SearchBlog() {
  const router = useRouter();
  const t = useTranslations('blogHeader');
  const searchParam = useSearchParams();

  const debouncedOnChange = useDebouncedCallback((value: string) => {
    router.push(buildUrl({ endpoint: BLOG_ROUTES.searchBlog, queryParams: { n: value } }));
  }, 300);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    debouncedOnChange(value);
  };

  return (
    <Input
      className="rounded-full"
      prefixIcon={<Search />}
      onInput={handleSearch}
      placeholder={t('searchPlaceholder')}
      defaultValue={searchParam.get('n') ?? ''}
    />
  );
}
