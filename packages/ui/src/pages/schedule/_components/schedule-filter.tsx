'use client';

import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from 'date-fns';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { buildQueryParam, convertToTimeStamp } from '@oe/core';
import { TabsTrigger } from '@radix-ui/react-tabs';
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as dateFnsLocales from 'date-fns/locale';
import { CalendarDays } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '#common/navigation';
import { Tabs, TabsList } from '#shadcn/tabs';

export default function ScheduleDateRangeFilter() {
  const t = useTranslations('schedule.website');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [activeTab, setActiveTab] = useState('today');

  const handleRouter = useCallback(
    (startDate: string, endDate: string) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      router.push(
        `${pathname}?${buildQueryParam({
          currentParams: searchParams,
          params: [
            {
              name: 'start_date',
              value: startDate
                ? convertToTimeStamp(startDate).toString()
                : convertToTimeStamp(today.toString()).toString(),
            },
            {
              name: 'end_date',
              value: endDate ? convertToTimeStamp(endDate).toString() : '',
            },
          ],
        })}`,
        {
          scroll: false,
        }
      );
    },
    [pathname, router, searchParams]
  );
  const handleTabChange = useCallback(
    (value: string) => {
      setActiveTab(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (value === 'today') {
        setState([
          {
            startDate: today,
            endDate: today,
            key: 'selection',
          },
        ]);
      } else if (value === 'week') {
        setState([
          {
            startDate: startOfWeek(today, { weekStartsOn: 1 }),
            endDate: endOfWeek(today, { weekStartsOn: 1 }),
            key: 'selection',
          },
        ]);
      } else if (value === 'month') {
        setState([
          {
            startDate: startOfMonth(today),
            endDate: endOfMonth(today),
            key: 'selection',
          },
        ]);
      }

      handleRouter(
        value === 'today'
          ? ''
          : value === 'week'
            ? startOfWeek(today, { weekStartsOn: 1 }).toString()
            : startOfMonth(today).toString(),
        value === 'today'
          ? ''
          : value === 'week'
            ? endOfWeek(today, { weekStartsOn: 1 }).toString()
            : endOfMonth(today).toString()
      );
    },
    [handleRouter]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    handleTabChange('today');
  }, []);

  return (
    <div className="w-full lg:max-w-[304px]">
      <div className="mb-4 flex items-center">
        <CalendarDays className="mr-2 h-6 w-6" />
        <h3 className="mcaption-semibold20 mb-0">{t('filterByDate')}</h3>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="today" className="text-base">
            {t('today')}
          </TabsTrigger>
          <TabsTrigger value="week" className="text-base">
            {t('week')}
          </TabsTrigger>
          <TabsTrigger value="month" className="text-base">
            {t('month')}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Suspense>
        <DateRangePicker
          onChange={item => {
            if (!item.selection) {
              return;
            }

            const { startDate, endDate } = item.selection;

            setState([
              {
                startDate: startDate || new Date(),
                endDate: endDate || new Date(),
                key: 'selection',
              },
            ]);

            // Update tab based on selected date range
            if (startDate && endDate) {
              if (
                format(startDate, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd') &&
                format(startDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
              ) {
                setActiveTab('today');
              } else if (
                format(startDate, 'yyyy-MM-dd') ===
                  format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd') &&
                format(endDate, 'yyyy-MM-dd') === format(endOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd')
              ) {
                setActiveTab('week');
              } else if (
                format(startDate, 'yyyy-MM-dd') === format(startOfMonth(new Date()), 'yyyy-MM-dd') &&
                format(endDate, 'yyyy-MM-dd') === format(endOfMonth(new Date()), 'yyyy-MM-dd')
              ) {
                setActiveTab('month');
              }
              if (startDate !== endDate) {
                handleRouter(startDate.toString(), endDate.toString());
              }
            }
          }}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          direction="vertical"
          locale={dateFnsLocales[locale as keyof typeof dateFnsLocales]}
          weekStartsOn={1}
          className="max-w-[296px]"
        />
      </Suspense>
    </div>
  );
}
