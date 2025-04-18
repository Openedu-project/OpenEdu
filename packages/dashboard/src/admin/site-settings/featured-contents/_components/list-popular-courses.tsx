'use client';
import type { ICourse } from '@oe/api';
import { useGetPopularCourses, useUpdateFeaturedContent } from '@oe/api';
import type { IFeaturedContent } from '@oe/api';
import { useGetCoursesPublish } from '@oe/api';
import { toast } from '@oe/ui';
import { Button } from '@oe/ui';
import { DndSortable } from '@oe/ui';
import { PaginationCustom } from '@oe/ui';
import { Input } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type React from 'react';
import { COURSES_FIRST_PER_PAGE, COURSES_MAX_DISPLAY } from '../_constants';
import { useFeaturedContentsStore } from '../_store';
import { CourseItem } from './course-item';

interface CourseWithOrder extends ICourse {
  order?: number;
}

const ListPopularCourses = ({ domain }: { domain?: string }) => {
  const t = useTranslations('themeFeaturedContent');
  const { triggerUpdateFeaturedContent } = useUpdateFeaturedContent();
  const { totalCourses, setTotalCourses } = useFeaturedContentsStore();

  // All available courses
  const [availableCourses, setAvailableCourses] = useState<CourseWithOrder[]>([]);

  // Selected courses for display (these are the ones that will be shown as featured)
  const [selectedCourses, setSelectedCourses] = useState<CourseWithOrder[]>([]);

  // Keep track of featured content for API submission
  const [featuredContent, setFeaturedContent] = useState<IFeaturedContent<undefined>[]>([]);

  const [maxDisplay, setMaxDisplay] = useState<number>(COURSES_MAX_DISPLAY);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const [params, setParams] = useState({
    page: 1,
    per_page: totalCourses, // Start with default per_page
    sort: 'create_at desc',
    preloads: ['Categories', 'Owner', 'Levels'],
  });

  // Fetch popular courses (current featured content)
  const { dataPopularCourses, isLoadingCourses: isLoadingPopular } = useGetPopularCourses({
    params: { org_id: domain ?? '' },
  });

  // Fetch all publishable courses
  const { dataListCourses: dataCoursesPublish, isLoadingCourses } = useGetCoursesPublish(params);

  // Process and combine data
  const processedData = useMemo(() => {
    if (!(dataCoursesPublish?.results && dataPopularCourses?.results)) {
      return null;
    }

    return {
      courses: dataCoursesPublish.results,
      popularCourses: dataPopularCourses.results,
    };
  }, [dataCoursesPublish, dataPopularCourses]);

  // First effect: Check if we need to fetch all items
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // Only run this once after the initial data load
    if (
      !initialLoadComplete &&
      dataCoursesPublish?.pagination?.total_items &&
      totalCourses &&
      dataCoursesPublish.pagination.total_items > totalCourses
    ) {
      const newTotalItems = dataCoursesPublish.pagination.total_items;

      setTotalCourses(newTotalItems);
      setParams(prev => ({
        ...prev,
        per_page: newTotalItems,
      }));
      setInitialLoadComplete(true);

      // Clear selected courses so they can be rebuilt with complete data
      if (selectedCourses.length > 0) {
        // console.log('Clearing selected courses to rebuild with complete data');
        setSelectedCourses([]);
      }
    }
  }, [dataCoursesPublish, totalCourses, initialLoadComplete, selectedCourses.length]);

  // Initialize available courses when data becomes available
  useEffect(() => {
    if (dataCoursesPublish?.results && Array.isArray(dataCoursesPublish.results)) {
      setAvailableCourses(dataCoursesPublish.results);

      // If we've loaded the full dataset, we should rebuild selected courses
      if (initialLoadComplete && dataCoursesPublish.pagination.total_items > COURSES_FIRST_PER_PAGE) {
        setNeedToRebuildSelected(true);
      }
    }
  }, [dataCoursesPublish, initialLoadComplete]);

  // Initialize selected courses from popular courses data
  // Track when we need to rebuild selected courses
  const [needToRebuildSelected, setNeedToRebuildSelected] = useState(true);

  useEffect(() => {
    // If we have popular courses data and available courses, and either we haven't set selected courses yet
    // or we need to rebuild them (after a full data load)
    if (
      dataPopularCourses?.results &&
      availableCourses.length > 0 &&
      (selectedCourses.length === 0 || needToRebuildSelected)
    ) {
      // Map featured content to actual course objects
      const featuredCourseIds = dataPopularCourses.results.map(item => item.entity_id);

      // Find the corresponding course objects from available courses
      const popularCourseObjects = availableCourses.filter(course => featuredCourseIds.includes(course.cuid));

      // Sort the courses based on the order from dataPopularCourses
      const sortedCourses = featuredCourseIds
        .map(id => {
          const course = popularCourseObjects.find(course => course.cuid === id);
          if (course) {
            // Add order property for position display
            const orderIndex = dataPopularCourses.results.findIndex(item => item.entity_id === id);
            return { ...course, order: orderIndex };
          }
          return null;
        })
        .filter(Boolean) as CourseWithOrder[];

      setSelectedCourses(sortedCourses);
      setFeaturedContent(dataPopularCourses.results);
      setNeedToRebuildSelected(false);
      setHasChanges(false);
    }
  }, [dataPopularCourses, availableCourses, selectedCourses.length, needToRebuildSelected]);

  // Handle reordering of selected courses
  const handleSortSelected = useCallback((newItems: CourseWithOrder[]) => {
    // Update order property for each item
    const itemsWithUpdatedOrder = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    setSelectedCourses(itemsWithUpdatedOrder);

    // Update featured content order based on new arrangement
    setFeaturedContent(prev =>
      itemsWithUpdatedOrder.map((course, index) => {
        const existingContent = prev.find(item => item.entity_id === course.cuid);
        if (existingContent) {
          return { ...existingContent, order: index };
        }
        return {
          id: '',
          org_id: '',
          entity_id: course.cuid,
          entity_type: 'course',
          enabled: true,
          order: index,
          type: 'course',
          entity: undefined,
        };
      })
    );

    setHasChanges(true);
  }, []);

  // Handle course selection/deselection
  const handleCourseSelection = useCallback(
    (checked: boolean, course: ICourse) => {
      if (checked) {
        // Add course to selected list
        if (selectedCourses.length >= maxDisplay) {
          toast.error(`Maximum ${maxDisplay} items allowed`);
          return;
        }

        // Add order property for position display
        const courseWithOrder = {
          ...course,
          order: selectedCourses.length,
        };

        setSelectedCourses(prev => [...prev, courseWithOrder]);

        // Add to featured content
        const newFeaturedContent: IFeaturedContent<undefined> = {
          id: '',
          org_id: '',
          entity_id: course.cuid,
          entity_type: 'course',
          enabled: true,
          order: selectedCourses.length,
          type: 'course',
          entity: undefined,
        };

        setFeaturedContent(prev => [...prev, newFeaturedContent]);
        setHasChanges(true);
      } else {
        // Remove course from selected list
        setSelectedCourses(prev => {
          const filtered = prev.filter(item => item.cuid !== course.cuid);

          // Reorder remaining items
          return filtered.map((item, index) => ({
            ...item,
            order: index,
          }));
        });

        // Remove from featured content and update orders
        setFeaturedContent(prev => {
          const filtered = prev.filter(item => item.entity_id !== course.cuid);
          return filtered.map((item, index) => ({
            ...item,
            order: index,
          }));
        });

        setHasChanges(true);
      }
    },
    [maxDisplay, selectedCourses]
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
        entity_type: 'course',
        entities,
      });

      if (!res) {
        throw new Error('Update failed');
      }

      toast.success('Featured courses updated successfully');
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
      if (newMax < selectedCourses.length) {
        toast.warning(`You currently have ${selectedCourses.length} items selected. Reduce selections first.`);
        return;
      }
      setMaxDisplay(newMax);
    },
    [selectedCourses.length]
  );

  // Check if a course is in the selected list
  const isCourseSelected = useCallback(
    (courseId: string) => {
      return selectedCourses.some(course => course.cuid === courseId);
    },
    [selectedCourses]
  );

  // Show loading state if any data is still loading
  if (isLoadingCourses || isLoadingPopular) {
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
          <p className="text-foreground/80 text-sm">{t('dragToReorder')}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-sm">{t('maxItems')}</span>
              <Input type="number" value={maxDisplay} onChange={handleMaxDisplayChange} className="w-20" min={1} />
            </div>
            <p className="text-sm">
              {t('showing')} {selectedCourses.length}/{maxDisplay}
            </p>
            <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
              {isSaving ? t('saving') : t('saveChanges')}
            </Button>
          </div>
        </div>
      </div>

      {/* Selected courses section (Drag and drop enabled) */}
      {selectedCourses.length > 0 && (
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 font-medium">{t('selectedCourses')}</h3>
          <DndSortable<CourseWithOrder, unknown>
            data={selectedCourses}
            dataConfig={{
              idProp: 'cuid',
              type: 'array',
              direction: 'horizontal',
            }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
            renderConfig={{
              renderItem: ({ item }) => (
                <CourseItem
                  key={item.original.cuid}
                  course={item.original}
                  isSelected={true}
                  onCheckboxChange={handleCourseSelection}
                  isDraggable={true}
                />
              ),
            }}
            onChange={handleSortSelected}
          />
        </div>
      )}

      {/* Available courses section */}
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">
          {t('availableCourses')} ({availableCourses.length})
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {availableCourses.map(course => (
            <CourseItem
              key={course.cuid}
              course={course}
              isSelected={isCourseSelected(course.cuid)}
              onCheckboxChange={handleCourseSelection}
              isDraggable={false}
              disabled={!isCourseSelected(course.cuid) && selectedCourses.length >= maxDisplay}
            />
          ))}
        </div>

        <PaginationCustom
          currentPage={dataCoursesPublish?.pagination?.page ?? 1}
          totalCount={dataCoursesPublish?.pagination?.total_items ?? 0}
          onPageChange={handlePageChange}
          pageSize={totalCourses}
          className="mt-6"
        />
      </div>
    </div>
  );
};

export { ListPopularCourses };
