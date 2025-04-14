import type { ICourse } from '@oe/api';
import type { ILaunchpad } from '@oe/api';
import { formatDate } from '@oe/core';
import { Image } from '@oe/ui';
import { useTranslations } from 'next-intl';

const CourseContent = ({ launchpadData }: { launchpadData: ILaunchpad }) => {
  const t = useTranslations('creatorSettingLaunchpad.generalInfo');

  return (
    <div>
      <h2 className="font-semibold text-base">{t('courseContent')} *</h2>
      <p className="text-gray-500 text-xs">{t('courseContentDesc')}</p>
      {launchpadData.courses?.map((course: ICourse) => (
        <div className="mt-4 flex gap-x-4 rounded-xl border p-4" key={course.id}>
          <div className="relative aspect-video h-32">
            <Image
              src={course.thumbnail?.url || ''}
              alt={course.name || ''}
              fill
              rounded="lg"
              aspectRatio="16:9"
              className="!h-full w-full object-cover"
            />
          </div>
          <div className="flex h-32 flex-col justify-between">
            <h3 className="font-semibold text-xl">{course.name}</h3>
            <div className="flex flex-col gap-y-2">
              <p className="text-sm">
                {t('createdBy')} <b>{launchpadData.owner?.display_name}</b>
              </p>
              <p className="text-sm">
                {t('createdAt')} <b>{formatDate(course.create_at)}</b>
              </p>
            </div>
            <p className="font-bold text-xl">
              {course.price_settings.fiat_price}&nbsp;
              {course.price_settings.fiat_currency} -&nbsp;
              {course.price_settings.crypto_price}&nbsp;
              {course.price_settings.crypto_currency}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export { CourseContent };
