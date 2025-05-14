import { getCoursesPublishService } from '@oe/api';
import WhaleNoData from '@oe/assets/images/whale-no-data.png';
import { getTranslations } from 'next-intl/server';
import { Image } from '#components/image';
import { CourseList } from './_components/course-list';
import { CourseListHeader } from './_components/course-list-header';
import { CourseListSearch } from './_components/course-list-search';

export async function CoursesListPage({
  isOpenEdu = true,
  searchParams,
}: {
  isOpenEdu?: boolean;
  searchParams: { [key: string]: string | undefined };
}) {
  const t = await getTranslations('courseList');

  const {
    search = '',
    sort = 'desc',
    page = '1',
    category_id_in = '',
    org_id_in = '',
    complete_status_in = '',
    level_id_in = '',
  } = await searchParams;

  const params = {
    enable_root: isOpenEdu,
    page: Number(page),
    per_page: 12,
    search_term: search,
    search_categories: 'name',
    sort: `create_at ${sort}`,
    preloads: ['Categories', 'Owner', 'Levels'],
    category_id_in: category_id_in ? category_id_in.split(',') : '',
    level_id_in: level_id_in ? level_id_in.split(',') : '',
    org_id_in: org_id_in ? org_id_in.split(',') : '',
    complete_status_in: complete_status_in ? complete_status_in.split(',') : '',
  };

  const courses = await getCoursesPublishService(undefined, { params });

  return (
    <div>
      <CourseListSearch searchValue={search} />
      <CourseListHeader
        isOpenEdu={isOpenEdu}
        totalResult={courses?.pagination?.total_items ?? 0}
        sortValue={sort}
        categoryIdsSelected={category_id_in.split(',') ?? []}
        levelIdsSelected={level_id_in.split(',') ?? []}
        orgIdsSelected={org_id_in.split(',') ?? []}
        completeCourseSelected={complete_status_in.split(',') ?? []}
      />
      {courses?.results?.length === 0 ? (
        <div className="p-10">
          <Image
            src={WhaleNoData.src}
            alt="no user data"
            priority
            aspectRatio="1:1"
            quality={100}
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
          />
          <p className="giant-iheading-semibold16 md:giant-iheading-semibold20 lg:giant-iheading-semibold28 mt-4 mb-1 w-full text-center">
            {t('noData.title')}
          </p>
          <p className="mcaption-regular16 lg:mcaption-regular20 w-full text-center">{t('noData.description')}</p>
        </div>
      ) : (
        <CourseList page={Number(page)} courses={courses} fallback={courses} params={params} />
      )}
    </div>
  );
}
