import type { ICourseOutline } from '@oe/api';
import { useGetMe } from '@oe/api';
import { useGetUserAffiliateCampaignListWithoutAuth } from '@oe/api';
import { AFFILIATE_ROUTES } from '@oe/core';
import { buildUrl } from '@oe/core';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { cn } from '#utils/cn';

const ShareToEarn = ({ courseData }: { courseData: ICourseOutline }) => {
  const t = useTranslations('courseOutline');

  const { dataMe } = useGetMe();
  const { dataUserAffiliateCampaignList } = useGetUserAffiliateCampaignListWithoutAuth({
    isAuth: !!dataMe && Object.keys(courseData ?? {})?.length > 0,
    params: {
      search_categories: 'course_name',
      search_term: courseData?.name,
    },
  });

  const href = buildUrl({
    endpoint: AFFILIATE_ROUTES.campaigns,
    queryParams: {
      filter: 'course_name',
      value: courseData?.name,
    },
  });

  return dataUserAffiliateCampaignList && dataUserAffiliateCampaignList?.results?.length > 0 ? (
    <Link
      href={href}
      className={cn('mbutton-semibold16 gradient-bg-3 mt-4 h-fit w-full hover:text-primary hover:no-underline')}
    >
      {t('shareToEarn')}
    </Link>
  ) : null;
};

export { ShareToEarn };
