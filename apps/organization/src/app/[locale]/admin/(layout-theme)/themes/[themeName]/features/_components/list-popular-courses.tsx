'use client';
import { useGetCoursesPublish } from '@oe/api/hooks/useCourse';
import { useGetPopularCourses, useUpdateFeaturedContent } from '@oe/api/hooks/useFeaturedContent';
import type { ICourse } from '@oe/api/types/course/course';
import type { IFeaturedContent } from '@oe/api/types/featured-contents';
import { CourseCard } from '@oe/ui/components/course-card';
import { DndSortable, DndSortableDragButton } from '@oe/ui/components/dnd-sortable';
import { PaginationCustom } from '@oe/ui/components/pagination-custom';
import { Button } from '@oe/ui/shadcn/button';
import { Checkbox } from '@oe/ui/shadcn/checkbox';
import { Input } from '@oe/ui/shadcn/input';
import { toast } from '@oe/ui/shadcn/sonner';
import { useEffect, useState } from 'react';

const PER_PAGE = 4;

const ListPopularCourses = () => {
  const { dataPopularCourses } = useGetPopularCourses({
    params: { org_id: '' },
  });

  const { triggerUpdateFeaturedContent } = useUpdateFeaturedContent();
  const [items, setItems] = useState<ICourse[]>([]);
  const [selectedDisplay, setSelectedDisplay] = useState<IFeaturedContent<undefined>[]>([]);
  const [maxDisplay, setMaxDisplay] = useState<number>(4);

  const isOpenEdu = false;
  const [params, setParams] = useState(() => {
    return {
      page: 1,
      per_page: PER_PAGE,
      enable_root: isOpenEdu,
      sort: 'create_at desc',
      preloads: ['Categories', 'Owner', 'Levels'],
    };
  });

  const { dataListCourses: dataCoursesPublish, isLoadingCourses } = useGetCoursesPublish(params);

  const handlePageChange = (page: number) => {
    setParams(prev => ({ ...prev, page }));
  };

  useEffect(() => {
    if (dataCoursesPublish?.results && dataPopularCourses?.results) {
      setItems(dataCoursesPublish?.results);
      setSelectedDisplay(dataPopularCourses?.results);
    }
  }, [dataCoursesPublish, dataPopularCourses]);

  if (isLoadingCourses) {
    return <p>...loading</p>;
  }

  const handleSort = (newItems: ICourse[]) => {
    setItems(newItems);
    setSelectedDisplay(prev =>
      prev.map((item, index) => ({
        ...item,
        order: index,
      }))
    );
  };

  const handleSave = async () => {
    const featuredContents = selectedDisplay.map((content, index) => ({
      entity_id: content.entity_id,
      order: index,
    }));

    try {
      const res = await triggerUpdateFeaturedContent({
        org_id: 'apI3DY5K8EphHA2Z',
        type: 'popular',
        entity_type: 'course',
        entities: featuredContents,
      });

      if (!res) {
        throw new Error('Fail');
      }
      toast.success('Featured contents updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to updated featured contents');
    }
  };

  const handleCheckboxChange = (checked: boolean, course: ICourse) => {
    if (checked) {
      if (selectedDisplay.length >= maxDisplay) {
        toast.error(`Maximum ${maxDisplay} items allowed`);
        return;
      }
      const newFeaturedContent: IFeaturedContent<undefined> = {
        id: '', // Will be assigned by backend
        org_id: '', // Will be assigned by backend
        entity_id: course.cuid,
        entity_type: 'COURSE',
        enabled: true,
        order: selectedDisplay.length,
        type: 'COURSE',
        entity: undefined,
      };
      setSelectedDisplay(prev => [...prev, newFeaturedContent]);
    } else {
      setSelectedDisplay(prev => prev.filter(item => item.entity_id !== course.cuid));
    }
  };

  return (
    <div className="mx-auto w-full space-y-6 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-foreground/80 text-sm">Select and arrange featured content items</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-sm">Max items:</span>
              <Input
                type="number"
                value={maxDisplay}
                onChange={e => setMaxDisplay(Number(e.currentTarget.value))}
                className="w-20"
              />
            </div>
            <p className="text-sm">
              Showing {selectedDisplay.length}/{maxDisplay}
            </p>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </div>
      {items && items.length > 0 && (
        <DndSortable<ICourse, unknown>
          data={items}
          dataConfig={{
            idProp: 'cuid',
            type: 'array',
            direction: 'horizontal',
          }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          renderConfig={{
            renderItem: ({ item }) => (
              <div className="group relative">
                <Checkbox
                  checked={!!selectedDisplay?.find(c => c.entity_id === item.original.cuid)}
                  onCheckedChange={checked => handleCheckboxChange(!!checked, item.original)}
                  className="absolute top-4 left-4 z-10 bg-background"
                />
                <DndSortableDragButton className="absolute top-4 right-4 z-10 rounded-md bg-background p-1 opacity-0 transition-opacity group-hover:opacity-100" />
                <CourseCard courseData={item.original} showHover={false} contentClassName="bg-foreground/10" />
              </div>
            ),
          }}
          onChange={handleSort}
        />
      )}
      <PaginationCustom
        currentPage={dataCoursesPublish?.pagination?.page ?? 1}
        totalCount={dataCoursesPublish?.pagination?.total_items ?? 0}
        onPageChange={handlePageChange}
        pageSize={PER_PAGE}
        className="p-8"
      />
    </div>
  );
};

export { ListPopularCourses };
