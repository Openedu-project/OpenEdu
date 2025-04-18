'use client';
import type { IBlog } from '@oe/api';
import { useGetBlogsPublish } from '@oe/api';
import { useGetPopularBlogs, useUpdateFeaturedContent } from '@oe/api';
import type { IFeaturedContent } from '@oe/api';
import { toast } from '@oe/ui';
import { Button } from '@oe/ui';
import { DndSortable } from '@oe/ui';
import { PaginationCustom } from '@oe/ui';
import { Input } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type React from 'react';
import { BLOGS_FIRST_PER_PAGE, BLOGS_MAX_DISPLAY } from '../_constants';
import { BlogItem } from './blog-item';

// Extend IBlog to include order property
interface BlogWithOrder extends IBlog {
  order?: number;
}

const ListBlogs = ({ domain }: { domain?: string }) => {
  const t = useTranslations('themeFeaturedContent');
  const { triggerUpdateFeaturedContent } = useUpdateFeaturedContent();

  // All available blogs
  const [availableBlogs, setAvailableBlogs] = useState<BlogWithOrder[]>([]);

  // Selected blogs for display (these are the ones that will be shown as featured)
  const [selectedBlogs, setSelectedBlogs] = useState<BlogWithOrder[]>([]);

  // Keep track of featured content for API submission
  const [featuredContent, setFeaturedContent] = useState<IFeaturedContent<undefined>[]>([]);

  const [maxDisplay, setMaxDisplay] = useState<number>(BLOGS_MAX_DISPLAY);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [needToRebuildSelected, setNeedToRebuildSelected] = useState(true);

  // Keep track of whether we've already fetched the full dataset
  const [hasLoadedFullDataset, setHasLoadedFullDataset] = useState(false);

  const [totalItems, setTotalItems] = useState(BLOGS_FIRST_PER_PAGE);

  // Initialize params with a check for saved state
  const [params, setParams] = useState(() => {
    return {
      page: 1,
      per_page: BLOGS_FIRST_PER_PAGE, // Start with default per_page
      sort: 'update_at desc',
    };
  });

  // Fetch popular blogs (current featured content)
  const { dataPopularBlogs, isLoadingBlogs: isLoadingPopular } = useGetPopularBlogs({
    params: { org_id: domain ?? '' },
  });

  // Fetch all publishable blogs
  const { dataListBlog: blogsData, isLoadingBlog } = useGetBlogsPublish('default', params, undefined);

  // Process and combine data
  const processedData = useMemo(() => {
    if (!(blogsData?.results && dataPopularBlogs?.results)) {
      return null;
    }

    return {
      blogs: blogsData.results,
      popularBlogs: dataPopularBlogs.results,
    };
  }, [blogsData, dataPopularBlogs]);

  // First effect: Check if we need to fetch all items
  useEffect(() => {
    // Check if we need to fetch the full dataset
    if (!hasLoadedFullDataset && blogsData?.pagination?.total_items && blogsData.pagination.total_items > totalItems) {
      const newTotalItems = blogsData.pagination.total_items;

      // Set the state to trigger a full data fetch
      setTotalItems(newTotalItems);
      setParams(prev => ({
        ...prev,
        per_page: newTotalItems,
      }));

      // Clear selected blogs so they can be rebuilt with complete data
      if (selectedBlogs.length > 0) {
        setSelectedBlogs([]);
      }
    }
  }, [blogsData, totalItems, hasLoadedFullDataset, selectedBlogs.length]);

  // Initialize available blogs when data becomes available
  useEffect(() => {
    if (blogsData?.results && Array.isArray(blogsData.results)) {
      const blogCount = blogsData.results.length;
      setAvailableBlogs(blogsData.results);

      // If we've loaded a large dataset (more than default page size), mark it as the full dataset
      if (blogCount > BLOGS_FIRST_PER_PAGE) {
        setHasLoadedFullDataset(true);
        setNeedToRebuildSelected(true);
      }
    }
  }, [blogsData]);

  // Initialize selected blogs from popular blogs data
  useEffect(() => {
    // If we have popular blogs data and available blogs, and we need to rebuild
    if (
      dataPopularBlogs?.results &&
      availableBlogs.length > 0 &&
      (selectedBlogs.length === 0 || needToRebuildSelected)
    ) {
      // Check if we have the full dataset or just initial data

      // Map featured content to actual blog objects
      const featuredBlogIds = dataPopularBlogs.results.map(item => item.entity_id);

      // Find the corresponding blog objects from available blogs
      const popularBlogObjects = availableBlogs.filter(blog => featuredBlogIds.includes(blog.cuid));

      // Sort the blogs based on the order from dataPopularBlogs
      const sortedBlogs = featuredBlogIds
        .map(id => {
          const blog = popularBlogObjects.find(blog => blog.cuid === id);
          if (blog) {
            // Add order property for position display
            const orderIndex = dataPopularBlogs.results.findIndex(item => item.entity_id === id);
            return { ...blog, order: orderIndex };
          }
          return null;
        })
        .filter(Boolean) as BlogWithOrder[];

      setSelectedBlogs(sortedBlogs);
      setFeaturedContent(dataPopularBlogs.results);
      setNeedToRebuildSelected(false);
      setHasChanges(false);
    }
  }, [dataPopularBlogs, availableBlogs, selectedBlogs.length, needToRebuildSelected]);

  // Handle reordering of selected blogs
  const handleSortSelected = useCallback((newItems: BlogWithOrder[]) => {
    // Update order property for each item
    const itemsWithUpdatedOrder = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    setSelectedBlogs(itemsWithUpdatedOrder);

    // Update featured content order based on new arrangement
    setFeaturedContent(prev =>
      itemsWithUpdatedOrder.map((blog, index) => {
        const existingContent = prev.find(item => item.entity_id === blog.cuid);
        if (existingContent) {
          return { ...existingContent, order: index };
        }
        return {
          id: '',
          org_id: '',
          entity_id: blog.cuid,
          entity_type: 'blog',
          enabled: true,
          order: index,
          type: 'blog',
          entity: undefined,
        };
      })
    );

    setHasChanges(true);
  }, []);

  // Handle blog selection/deselection
  const handleBlogSelection = useCallback(
    (checked: boolean, blog: IBlog) => {
      if (checked) {
        // Add blog to selected list
        if (selectedBlogs.length >= maxDisplay) {
          toast.error(`Maximum ${maxDisplay} items allowed`);
          return;
        }

        // Add order property for position display
        const blogWithOrder = {
          ...blog,
          order: selectedBlogs.length,
        };

        setSelectedBlogs(prev => [...prev, blogWithOrder]);

        // Add to featured content
        const newFeaturedContent: IFeaturedContent<undefined> = {
          id: '',
          org_id: '',
          entity_id: blog.cuid,
          entity_type: 'blog',
          enabled: true,
          order: selectedBlogs.length,
          type: 'blog',
          entity: undefined,
        };

        setFeaturedContent(prev => [...prev, newFeaturedContent]);
        setHasChanges(true);
      } else {
        // Remove blog from selected list
        setSelectedBlogs(prev => {
          const filtered = prev.filter(item => item.cuid !== blog.cuid);

          // Reorder remaining items
          return filtered.map((item, index) => ({
            ...item,
            order: index,
          }));
        });

        // Remove from featured content and update orders
        setFeaturedContent(prev => {
          const filtered = prev.filter(item => item.entity_id !== blog.cuid);
          return filtered.map((item, index) => ({
            ...item,
            order: index,
          }));
        });

        setHasChanges(true);
      }
    },
    [maxDisplay, selectedBlogs]
  );

  // Save changes to API
  const handleSave = useCallback(async () => {
    if (!domain) {
      toast.error('Missing domain');
      return;
    }

    setIsSaving(true);

    try {
      // Prepare data for API
      const entities = featuredContent.map((content, index) => ({
        entity_id: content.entity_id,
        order: index,
      }));

      const res = await triggerUpdateFeaturedContent({
        org_id: domain,
        type: 'popular',
        entity_type: 'blog',
        entities,
      });

      if (!res) {
        throw new Error('Update failed');
      }

      toast.success('Featured blogs updated successfully');
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to update featured contents:', error);
      toast.error('Failed to update featured contents');
    } finally {
      setIsSaving(false);
    }
  }, [featuredContent, triggerUpdateFeaturedContent, domain]);

  // Handle pagination
  const handlePageChange = useCallback((page: number) => {
    setParams(prev => ({ ...prev, page }));
  }, []);

  // Handle max display limit change
  const handleMaxDisplayChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Number(e.currentTarget.value);
      if (newMax < selectedBlogs.length) {
        toast.warning(`You currently have ${selectedBlogs.length} items selected. Reduce selections first.`);
        return;
      }
      setMaxDisplay(newMax);
    },
    [selectedBlogs.length]
  );

  // Check if a blog is in the selected list
  const isBlogSelected = useCallback(
    (blogId: string) => {
      return selectedBlogs.some(blog => blog.cuid === blogId);
    },
    [selectedBlogs]
  );

  // Show loading state if any data is still loading
  if (isLoadingBlog || isLoadingPopular) {
    return <div className="p-4">Loading...</div>;
  }

  if (!processedData) {
    return <div className="p-4">No data available</div>;
  }

  return (
    <div className="mx-auto w-full space-y-6 p-4">
      {/* Header controls */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="font-semibold text-xl">{t('featuredBlogs')}</h2>
            <p className="text-foreground/80 text-sm">{t('dragToReorder')}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-sm">{t('maxItems')}</span>
              <Input type="number" value={maxDisplay} onChange={handleMaxDisplayChange} className="w-20" min={1} />
            </div>
            <p className="text-sm">
              {t('showing')} {selectedBlogs.length}/{maxDisplay}
            </p>
            <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
              {isSaving ? t('saving') : t('saveChanges')}
            </Button>
          </div>
        </div>
      </div>

      {/* Selected blogs section (Drag and drop enabled) */}
      {selectedBlogs.length > 0 && (
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 font-medium">{t('selectedBlogs')}</h3>
          <DndSortable<BlogWithOrder, unknown>
            data={selectedBlogs}
            dataConfig={{
              idProp: 'cuid',
              type: 'array',
              direction: 'horizontal',
            }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
            renderConfig={{
              renderItem: ({ item }) => (
                <BlogItem
                  key={item.original.cuid}
                  blog={item.original}
                  isSelected={true}
                  onCheckboxChange={handleBlogSelection}
                  isDraggable={true}
                />
              ),
            }}
            onChange={handleSortSelected}
          />
        </div>
      )}

      {/* Available blogs section */}
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">
          {t('availableBlogs')} ({availableBlogs.length})
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {availableBlogs.map(blog => (
            <BlogItem
              key={blog.cuid}
              blog={blog}
              isSelected={isBlogSelected(blog.cuid)}
              onCheckboxChange={handleBlogSelection}
              isDraggable={false}
              disabled={!isBlogSelected(blog.cuid) && selectedBlogs.length >= maxDisplay}
            />
          ))}
        </div>

        <PaginationCustom
          currentPage={blogsData?.pagination?.page ?? 1}
          totalCount={blogsData?.pagination?.total_items ?? 0}
          onPageChange={handlePageChange}
          pageSize={totalItems}
          className="mt-6"
        />
      </div>
    </div>
  );
};

export { ListBlogs };
