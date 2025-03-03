'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '#shadcn/button';
import { Separator } from '#shadcn/separator';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '#shadcn/sheet';

import { useCategoriesTree } from '@oe/api/hooks/useCategories';
import { useGetOrganization, useGetOrganizationByDomain } from '@oe/api/hooks/useOrganization';
import type { ICategoryTree } from '@oe/api/types/categories';
import type { IOrganization } from '@oe/api/types/organizations';
import { buildQueryParam } from '@oe/core/utils/url';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '#common/navigation';
import CourseListFilterCategories from './course-list-filter-categories';
import CourseListFilterCompletedCourses from './course-list-filter-completed-courses';
import CourseListFilterLevel from './course-list-filter-level';
import CourseListFilterOrganizations from './course-list-filter-organizations';

interface ICourseListFilter {
  categoryIdsSelected: string[];
  levelIdsSelected: string[];
  orgIdsSelected: string[];
  completeCourseSelected: string[];
}

export default function CourseListFilter({
  categoryIdsSelected,
  levelIdsSelected,
  orgIdsSelected,
  completeCourseSelected,
}: ICourseListFilter) {
  const t = useTranslations('courseList');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<ICategoryTree[]>([]);
  const [levels, setLevels] = useState<ICategoryTree[]>([]);
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({});
  const [checkedCategoryIds, setCheckedCategoryIds] = useState<string[]>(categoryIdsSelected ?? []);
  const [checkedLevelIds, setCheckedLevelIds] = useState<string[]>(levelIdsSelected ?? []);
  const [checkedOrgIds, setCheckedOrgIds] = useState<string[]>(orgIdsSelected ?? []);
  const [checkedCompletedCourse, setCheckedCompletedCourse] = useState<string[]>(completeCourseSelected ?? []);

  const [openSections, setOpenSections] = useState({
    categories: true,
    level: true,
    organizations: true,
    completedCourse: true,
  });

  const { dataListOrganization } = useGetOrganization({
    params: { page: 1, per_page: 9999 },
  });

  const { organizationByDomain } = useGetOrganizationByDomain();
  const { categoriesTree: courseCategories } = useCategoriesTree(
    {
      type: 'course',
      org_id: organizationByDomain?.id ?? '',
    },
    undefined,
    !!organizationByDomain?.id
  );
  const { categoriesTree: levelCategories } = useCategoriesTree(
    {
      type: 'level',
      org_id: organizationByDomain?.id ?? '',
    },
    undefined,
    !!organizationByDomain?.id
  );

  useEffect(() => {
    if (courseCategories && levelCategories && dataListOrganization?.results) {
      setCategories(courseCategories ?? []);
      setLevels(levelCategories ?? []);
      setOrganizations(dataListOrganization?.results ?? []);

      const levelCheckboxes: Record<string, boolean> = {};
      for (const level of levelCategories) {
        const id = `level-${level.id}`;
        if (checkedLevelIds.includes(level.id)) {
          levelCheckboxes[id] = true;
        } else {
          levelCheckboxes[id] = false;
        }
      }

      const orgCheckboxes: Record<string, boolean> = {};
      for (const org of dataListOrganization?.results ?? []) {
        if (org.active) {
          const id = `org-${org.id}`;
          if (checkedOrgIds.includes(org.id)) {
            orgCheckboxes[id] = true;
          } else {
            orgCheckboxes[id] = false;
          }
        }
      }
      const checkedCourseStatus = ['completed', 'in-progress'];
      const checkedCourseCheckboxes: Record<string, boolean> = {};
      for (const item of checkedCourseStatus ?? []) {
        if (item) {
          const id = `status-${item}`;
          if (checkedCompletedCourse.includes(item)) {
            checkedCourseCheckboxes[id] = true;
          } else {
            checkedCourseCheckboxes[id] = false;
          }
        }
      }

      setCheckboxes(prev => ({
        ...prev,
        ...levelCheckboxes,
        ...orgCheckboxes,
        ...checkedCourseCheckboxes,
      }));
    }
  }, [courseCategories, levelCategories, dataListOrganization, checkedLevelIds, checkedOrgIds, checkedCompletedCourse]);

  const updateCheckedLevelIds = useCallback((updatedCheckboxes: Record<string, boolean>) => {
    const checkedIds = Object.entries(updatedCheckboxes)
      .filter(([key, value]) => value && key.startsWith('level-'))
      .map(([key]) => key.replace('level-', ''));

    setCheckedLevelIds(checkedIds);
  }, []);
  const updateCheckedCompletedCourse = useCallback((updatedCheckboxes: Record<string, boolean>) => {
    const checkedIds = Object.entries(updatedCheckboxes)
      .filter(([key, value]) => value && key.startsWith('status-'))
      .map(([key]) => key.replace('status-', ''));

    setCheckedCompletedCourse(checkedIds);
  }, []);

  const updateCheckedOrgIds = useCallback((updatedCheckboxes: Record<string, boolean>) => {
    const checkedIds = Object.entries(updatedCheckboxes)
      .filter(([key, value]) => value && key.startsWith('org-'))
      .map(([key]) => key.replace('org-', ''));

    setCheckedOrgIds(checkedIds);
  }, []);

  const handleCheckboxChange = useCallback(
    (id: string) => {
      const newValue = !checkboxes[id];
      const updatedCheckboxes = { ...checkboxes };

      updatedCheckboxes[id] = newValue;
      setCheckboxes(updatedCheckboxes);

      if (id.startsWith('level-')) {
        updateCheckedLevelIds(updatedCheckboxes);
      } else if (id.startsWith('org-')) {
        updateCheckedOrgIds(updatedCheckboxes);
      } else if (id.startsWith('status-')) {
        updateCheckedCompletedCourse(updatedCheckboxes);
      }
    },
    [checkboxes, updateCheckedLevelIds, updateCheckedOrgIds, updateCheckedCompletedCourse]
  );

  const toggleSection = useCallback((section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

  const resetSection = useCallback(
    (section: string) => {
      if (section === 'cat') {
        setCheckedCategoryIds([]);
      } else {
        const updatedCheckboxes = { ...checkboxes };
        for (const key of Object.keys(checkboxes)) {
          if (key.startsWith(section)) {
            updatedCheckboxes[key] = false;
          }
        }
        setCheckboxes(updatedCheckboxes);

        if (section === 'level') {
          setCheckedLevelIds([]);
        } else if (section === 'org') {
          setCheckedOrgIds([]);
        } else if (section === 'status') {
          setCheckedCompletedCourse([]);
        }
      }
    },
    [checkboxes]
  );

  const handleCategoryChange = useCallback((checkedIds: string[]) => {
    setCheckedCategoryIds(checkedIds);
  }, []);

  const handleResetAll = useCallback(() => {
    setCheckedCategoryIds([]);
    setCheckedOrgIds([]);
    setCheckedLevelIds([]);
    setCheckedCompletedCourse([]);
    const updatedCheckboxes = { ...checkboxes };
    for (const key of Object.keys(checkboxes)) {
      updatedCheckboxes[key] = false;
    }
    setCheckboxes(updatedCheckboxes);
    router.push(pathname);
  }, [router, pathname, checkboxes]);

  const handleApplyFilter = useCallback(() => {
    router.push(
      `${pathname}?${buildQueryParam({
        currentParams: searchParams,
        params: [
          {
            name: 'category_id_in',
            value: checkedCategoryIds.join(','),
          },
          {
            name: 'level_id_in',
            value: checkedLevelIds.join(','),
          },
          {
            name: 'org_id_in',
            value: checkedOrgIds.join(','),
          },
          {
            name: 'complete_status_in',
            value: checkedCompletedCourse.join(','),
          },
        ],
        resetPage: true,
      })}`,
      {
        scroll: true,
      }
    );
  }, [checkedCategoryIds, checkedLevelIds, checkedOrgIds, checkedCompletedCourse, router, pathname, searchParams]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal />
          <span>{t('filter')}</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-md overflow-y-auto rounded-l-lg bg-white p-0">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
          <div className="flex items-center text-primary">
            <span className="mr-2">|</span>
            <SheetTitle className="giant-iheading-semibold16 md:giant-iheading-semibold20 m-0 text-primary">
              {t('filter')}
            </SheetTitle>
          </div>
          <SheetClose asChild>
            <X className="h-5 w-5 cursor-pointer text-gray-500" />
          </SheetClose>
        </div>

        <div className="block">
          <div className="px-4 py-3">
            {/* Categories Section - Now using the updated component */}
            <CourseListFilterCategories
              title={t('categories')}
              isOpen={openSections.categories}
              toggleSection={() => toggleSection('categories')}
              resetSection={() => resetSection('cat')}
              resetLabel={t('resetAll')}
              categories={categories}
              checkedCategoryIds={checkedCategoryIds}
              onCategoryChange={handleCategoryChange}
            />

            <Separator className="my-4" />

            {/* Level Section */}
            <CourseListFilterLevel
              title={t('level')}
              isOpen={openSections.level}
              toggleSection={() => toggleSection('level')}
              resetSection={() => resetSection('level')}
              resetLabel={t('resetAll')}
              checkboxes={checkboxes}
              handleCheckboxChange={handleCheckboxChange}
              levels={levels}
            />

            <Separator className="my-4" />

            {/* Organizations Section */}
            <CourseListFilterOrganizations
              title={t('organizations')}
              isOpen={openSections.organizations}
              toggleSection={() => toggleSection('organizations')}
              resetSection={() => resetSection('org')}
              resetLabel={t('resetAll')}
              checkboxes={checkboxes}
              handleCheckboxChange={handleCheckboxChange}
              organizations={organizations}
            />

            <Separator className="my-4" />

            {/* Completed Course Section */}
            <CourseListFilterCompletedCourses
              title={t('completedCourses')}
              isOpen={openSections.completedCourse}
              toggleSection={() => toggleSection('completedCourse')}
              resetSection={() => resetSection('status')}
              resetLabel={t('resetAll')}
              checkboxes={checkboxes}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          <div className="sticky bottom-0 flex w-full gap-4 border-t bg-white p-4">
            <Button variant="outline" className="flex-1" onClick={handleResetAll}>
              {t('resetAll')}
            </Button>
            <Button className="flex-1" onClick={handleApplyFilter}>
              {t('apply')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
