import { IconQuestion } from '@oe/assets';
import { getTranslations } from 'next-intl/server';

export default async function ScheduleNoData() {
  const t = await getTranslations('schedule.website');

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <IconQuestion />

      <h3 className="mcaption-semibold20 mb-0">{t('noEvent')}</h3>
    </div>
  );
}
