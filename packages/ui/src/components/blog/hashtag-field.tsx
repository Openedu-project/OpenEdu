import { useGetHashtags } from '@oe/api/hooks/useHashtag';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import type { KeyboardEvent } from 'react';
import { AutocompeteMultiple } from '#components/autocomplete';
import { BlogField, BlogFieldSkeleton } from './blog-field';

export function HashtagField() {
  const tBlogs = useTranslations('blogForm');
  const { hashtags, hashtagsIsLoading } = useGetHashtags({
    page: 1,
    per_page: 999,
  });

  const hashtagsName = useMemo(() => hashtags?.results.map(hashtag => hashtag.name), [hashtags]);

  if (hashtagsIsLoading) {
    return <BlogFieldSkeleton title={tBlogs('hashtag')} />;
  }

  if (!hashtagsName || hashtagsName?.length === 0) {
    return null;
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, handleSelectOptions?: (value: string) => void) => {
    if (
      e.key === ' ' ||
      e.code === 'Space' ||
      (e.key === 'Enter' && (e.currentTarget.value.length === 0 || hashtagsName.includes(e.currentTarget.value)))
    ) {
      e.preventDefault();
      return;
    }

    if (e.nativeEvent.isComposing || e.key !== 'Enter') {
      return;
    }

    e.preventDefault();
    handleSelectOptions?.(e.currentTarget.value);
  };

  return (
    <BlogField name="hashtag_names" title={tBlogs('hashtag')}>
      <AutocompeteMultiple options={hashtagsName} placeholder={tBlogs('inputHashtag')} onKeyDown={handleKeyDown} />
    </BlogField>
  );
}
