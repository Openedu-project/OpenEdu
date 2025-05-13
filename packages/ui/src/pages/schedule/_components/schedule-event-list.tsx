import { getSchedulesEventService } from '@oe/api';
import { MedalStar } from '@oe/assets';
import { formatDateSlash } from '@oe/core';
import { Clock, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '#common/navigation';
import { buttonVariants } from '#shadcn/button';
import ScheduleNoData from './schedule-no-data';
import { ScheduleEventListPagination } from './schedule-pagination';

export default async function ScheduleEventList({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const t = await getTranslations('schedule.website');
  const { search = '', page = 1, start_date = Date.now(), end_date = '' } = await searchParams;

  const eventParams = {
    page: Number(page),
    per_page: 10,
    search_term: search,
    search_categories: 'name',
    sort: 'create_at desc',
    end_at_lte: end_date ? Number(end_date) : undefined,
    start_at_gte: start_date ? Number(start_date) : undefined,
  };

  const eventsData = await getSchedulesEventService(null, {
    params: eventParams,
  });

  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <MedalStar color="#222222" width={24} height={24} />
        <h3 className="mcaption-semibold20 mb-0">{t('upcomingEvents')}</h3>
      </div>
      <div className="flex flex-col gap-4 text-left">
        {eventsData?.results && eventsData.results.length > 0 ? (
          eventsData.results.map(event => (
            <div
              key={event.id}
              className="flex flex-col justify-start rounded-[16px] border border-neutral-100 p-5 shadow-sm"
            >
              <h3 className="mcaption-semibold20 mb-4 text-primary">{event.name}</h3>
              <p className="mb-4">{event.description}</p>

              {event.start_at && (
                <div className="mb-2 flex items-center gap-2">
                  <Clock className="h-6 w-6 text-primary" />
                  <span className="mcaption-semibold16">{formatDateSlash(event.start_at)}</span>
                </div>
              )}

              {event.location && (
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span className="mcaption-semibold16">{event.location}</span>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <Link href={event.join_link} target="_blank" className={buttonVariants({ variant: 'default' })}>
                  {t('joinNow')}
                </Link>
              </div>
            </div>
          ))
        ) : (
          <ScheduleNoData />
        )}
      </div>
      <ScheduleEventListPagination events={eventsData} pageValue={Number(page)} />
    </>
  );
}
