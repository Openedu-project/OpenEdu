import type { ILaunchpad } from '@oe/api/types/launchpad';
import DefaultImg from '@oe/assets/images/defaultimage.png';
import { formatDate } from '@oe/core/utils/datetime';
import { getTranslations } from 'next-intl/server';
import { Image } from '#components/image';

const CourseCardHorizontal = async ({
  campaign,
}: {
  campaign: ILaunchpad | undefined;
}) => {
  const t = await getTranslations('launchpadDetailPage');
  const course = campaign?.courses?.[0];

  if (!course) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white p-3 shadow-[0px_4px_30px_0px_#F4F5F6] sm:gap-3 sm:p-4">
      <div className="relative h-24 min-h-[96px] w-[30%] cursor-pointer overflow-hidden rounded-xl sm:h-full sm:min-h-[120px] sm:rounded-2xl">
        <Image
          className="h-full w-full object-cover"
          alt="campaign full card image"
          src={course.thumbnail?.thumbnail_url || DefaultImg.src}
          fill
          containerHeight={120}
        />
      </div>
      <div className="w-[70%] space-y-1.5 sm:space-y-2">
        <h4 className="font-semibold text-lg sm:text-xl">{course.name}</h4>
        <p className="text-sm sm:text-base">
          {t('common.createBy')}
          <span className="font-semibold">{campaign.owner?.display_name}</span>
        </p>
        <p className="text-sm sm:text-base">
          {t('common.createAt')}
          <span className="font-semibold">{course.create_at ? formatDate(course.create_at) : ''}</span>
        </p>
      </div>
    </div>
  );
};

export default CourseCardHorizontal;
