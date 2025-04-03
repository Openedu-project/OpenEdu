import { useGetUserAffiliateCampaignListWithoutAuth } from '@oe/api/hooks/useAffiliateCampaign';
import { useGetMe } from '@oe/api/hooks/useMe';
import type { ICourseOutline } from '@oe/api/types/course/course';
import { AFFILIATE_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { buttonVariants } from '#shadcn/button';
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
      className={cn(
        buttonVariants({ variant: 'outline' }),
        'mbutton-semibold16 mt-4 w-full border-primary hover:text-primary hover:no-underline'
      )}
    >
      {t('shareToEarn')}
    </Link>
  ) : null;
};

export default ShareToEarn;
