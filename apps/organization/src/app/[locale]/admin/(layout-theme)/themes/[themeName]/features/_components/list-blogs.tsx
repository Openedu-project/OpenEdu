'use client';
import { useGetBlogsPublish } from '@oe/api/hooks/useBlog';
import { useGetPopularBlogs, useUpdateFeaturedContent } from '@oe/api/hooks/useFeaturedContent';
import type { IBlog } from '@oe/api/types/blog';
import type { IFeaturedContent } from '@oe/api/types/featured-contents';
import { DndSortable } from '@oe/ui/components/dnd-sortable';
import { PaginationCustom } from '@oe/ui/components/pagination-custom';
import { Button } from '@oe/ui/shadcn/button';
import { Input } from '@oe/ui/shadcn/input';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type React from 'react';
import { BlogItem } from './blog-item';

const PER_PAGE = 4;

const ListBlogs = ({ orgId }: { orgId?: string }) => {
  const t = useTranslations('themeFeaturedContent');
  const { triggerUpdateFeaturedContent } = useUpdateFeaturedContent();

  const [items, setItems] = useState<IBlog[]>([]);
  const [selectedDisplay, setSelectedDisplay] = useState<IFeaturedContent<undefined>[] | undefined>(undefined);
  const [maxDisplay, setMaxDisplay] = useState<number>(4);

  const [params, setParams] = useState(() => {
    return {
      per_page: 4,
      page: 1,
      sort: 'update_at desc',
      not_org_id: orgId,
    };
  });

  const { dataPopularBlogs } = useGetPopularBlogs({
    params: { org_id: orgId ?? '' },
  });

  const { dataListBlog: blogsData, isLoadingBlog } = useGetBlogsPublish('default', params, undefined);

  const processedData = useMemo(() => {
    if (!(blogsData?.results && dataPopularBlogs?.results)) {
      return null;
    }

    return {
      courses: blogsData.results,
      popularCourses: dataPopularBlogs.results,
    };
  }, [blogsData, dataPopularBlogs]);

  const handleSort = useCallback((newItems: IBlog[]) => {
    setItems(newItems);
    setSelectedDisplay(prev =>
      prev?.map((item, index) => ({
        ...item,
        order: index,
      }))
    );
  }, []);

  const handleSave = useCallback(async () => {
    const featuredContents = selectedDisplay?.map((content, index) => ({
      entity_id: content.entity_id,
      order: index,
    }));

    try {
      const res = await triggerUpdateFeaturedContent({
        org_id: orgId ?? '',
        type: 'popular',
        entity_type: 'blog',
        entities: featuredContents || [],
      });

      if (!res) {
        throw new Error('Update failed');
      }

      toast.success('Featured contents updated successfully');
    } catch (error) {
      console.error('Failed to update featured contents:', error);
      toast.error('Failed to update featured contents');
    }
  }, [selectedDisplay, triggerUpdateFeaturedContent, orgId]);

  const handleCheckboxChange = useCallback(
    (checked: boolean, course: IBlog) => {
      if (checked) {
        if (!selectedDisplay || selectedDisplay?.length >= maxDisplay) {
          toast.error(`Maximum ${maxDisplay} items allowed`);
          return;
        }

        const newFeaturedContent: IFeaturedContent<undefined> = {
          id: '',
          org_id: '',
          entity_id: course.cuid,
          entity_type: 'blog',
          enabled: true,
          order: selectedDisplay.length,
          type: 'blog',
          entity: undefined,
        };

        setSelectedDisplay(prev => (prev ? [...prev, newFeaturedContent] : []));
      } else {
        setSelectedDisplay(prev => prev?.filter(item => item.entity_id !== course.cuid));
      }
    },
    [maxDisplay, selectedDisplay]
  );

  const handlePageChange = useCallback((page: number) => {
    setParams(prev => ({ ...prev, page }));
  }, []);

  const handleMaxDisplayChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDisplay(Number(e.currentTarget.value));
  }, []);

  useEffect(() => {
    if (blogsData?.results) {
      setItems(blogsData?.results);
    }
  }, [blogsData]);

  useEffect(() => {
    if (!selectedDisplay && dataPopularBlogs?.results) {
      setSelectedDisplay(dataPopularBlogs?.results);
    }
  }, [selectedDisplay, dataPopularBlogs]);

  if (isLoadingBlog) {
    return <div className="p-4">Loading...</div>;
  }

  if (!processedData) {
    return <div className="p-4">No data available</div>;
  }

  return (
    <div className="mx-auto w-full space-y-6 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-foreground/80 text-sm">{t('select')}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-sm">{t('maxItems')}</span>
              <Input type="number" value={maxDisplay} onChange={handleMaxDisplayChange} className="w-20" />
            </div>
            <p className="text-sm">
              {t('showing')} {selectedDisplay?.length ?? 0}/{maxDisplay}
            </p>
            <Button onClick={handleSave}>{t('saveChanges')}</Button>
          </div>
        </div>
      </div>

      {items.length > 0 && (
        <DndSortable<IBlog, unknown>
          data={items}
          dataConfig={{
            idProp: 'cuid',
            type: 'array',
            direction: 'horizontal',
          }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          renderConfig={{
            renderItem: ({ item }) => (
              <BlogItem
                key={item.original.cuid}
                blog={item.original}
                isSelected={!!selectedDisplay?.find(c => c.entity_id === item.original.cuid)}
                onCheckboxChange={handleCheckboxChange}
              />
            ),
          }}
          onChange={handleSort}
        />
      )}

      <PaginationCustom
        currentPage={blogsData?.pagination?.page ?? 1}
        totalCount={blogsData?.pagination?.total_items ?? 0}
        onPageChange={handlePageChange}
        pageSize={PER_PAGE}
        className="p-8"
      />
    </div>
  );
};

export { ListBlogs };
