'use client';
import type { AIEduStatistics } from '@oe/api';
import { Card } from '@oe/ui';
import { BookmarkPlus, Sparkle, UserPen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { formatNumber } from '../_utils/functions';

const StatisticsBanner = ({ data }: { data?: AIEduStatistics }) => {
  const t = useTranslations('themePage.aiedu.homepage.aieduDashboard');

  return (
    <Card className="w-full overflow-hidden rounded-3xl border-none bg-primary">
      <div className="relative w-full p-8">
        {/* Background pattern with + signs */}
        <div className="absolute inset-0 grid grid-cols-8 gap-8 md:grid-cols-16">
          {Array.from({ length: 128 }, (_, i) => (
            <div key={i.toString()} className="flex items-center justify-center text-background/70 text-md">
              +
            </div>
          ))}
        </div>

        <div className="relative flex flex-col items-center justify-center gap-8 py-6 md:flex-row md:gap-2 lg:gap-16">
          {/* Left Circle - Registrations */}
          <div className="flex h-80 w-80 items-center justify-center rounded-full border-[1px] border-secondary bg-secondary/10">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-secondary/20">
              <div className="flex h-48 w-48 flex-col items-center justify-center rounded-full bg-primary text-center">
                <UserPen className="mb-2 h-8 w-8 text-background" />
                <div className="font-bold text-3xl text-secondary">{formatNumber(data?.register_count || 0)}</div>
                <div className="mt-1 text-background text-sm">{t('registerCount')}</div>
              </div>
              {/* Dashed circle border */}
              <div
                className="absolute inset-0 rounded-full border-4 border-secondary border-dashed"
                style={{
                  background: 'transparent',
                  animation: 'rotation 120s linear infinite',
                }}
              />
            </div>
          </div>

          {/* Center Star */}
          <Sparkle className="block h-16 w-16 text-background md:hidden lg:block" />

          {/* Right Circle - Certificates */}
          <div className="flex h-80 w-80 items-center justify-center rounded-full border-[1px] border-background bg-secondary/10">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-secondary/20">
              <div className="flex h-48 w-48 flex-col items-center justify-center rounded-full bg-primary text-center">
                <BookmarkPlus className="mb-2 h-8 w-8 text-background" />
                <div className="font-bold text-3xl text-warning">{formatNumber(data?.cert_count || 0)}</div>
                <div className="mt-1 text-background text-sm">{t('certCount')}</div>
              </div>
              {/* Dashed circle border */}
              <div
                className="absolute inset-0 rounded-full border-4 border-warning border-dashed"
                style={{
                  background: 'transparent',
                  animation: 'rotation 120s linear infinite',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CSS for the rotation animation */}
      <style jsx>{`
        @keyframes rotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Card>
  );
};

export default StatisticsBanner;
