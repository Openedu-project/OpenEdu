export function getSearchParamsData(searchParams: URLSearchParams) {
  const { course_name, organization, category_id_in, ...baseParams } = Object.fromEntries(searchParams);
  const categoryIds = category_id_in?.split(',');

  return {
    ...baseParams,
    search_term: course_name ?? '',
    search_categories: 'name',
    org_id: organization,
    category_id_in: categoryIds,
  };
}
