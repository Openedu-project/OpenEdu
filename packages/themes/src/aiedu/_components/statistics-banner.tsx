'use client';

import { Card } from '@oe/ui';
import { BookmarkPlus, Sparkle, UserPen } from 'lucide-react';
import { formatNumber } from '../_utils/functions';

// Sample data structure for statistics
const sampleData = {
  registrations: {
    count: 1000000,
    label: 'Số lượng đăng ký',
  },
  certificates: {
    count: 5000000,
    label: 'Số lượng nhận chứng chỉ',
  },
};

const StatisticsBanner = ({ data = sampleData }) => {
  return (
    <Card className="w-full overflow-hidden border-none bg-primary">
      <div className="relative w-full p-8">
        {/* Background pattern with + signs */}
        <div className="absolute inset-0 grid grid-cols-8 gap-8 md:grid-cols-16">
          {Array.from({ length: 128 }, (_, i) => (
            <div key={i.toString()} className="flex items-center justify-center text-background/70 text-md">
              +
            </div>
          ))}
        </div>

        <div className="relative flex flex-col items-center justify-center gap-8 py-6 md:flex-row md:gap-16">
          {/* Left Circle - Registrations */}
          <div className="flex h-80 w-80 items-center justify-center rounded-full border-[1px] border-background bg-secondary/10">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-secondary/20">
              <div className="flex h-48 w-48 flex-col items-center justify-center rounded-full bg-primary text-center">
                <UserPen className="mb-2 h-8 w-8 text-background" />
                <div className="font-bold text-3xl text-background">{formatNumber(data.registrations.count)}</div>
                <div className="mt-1 text-background text-sm">{data.registrations.label}</div>
              </div>
              {/* Dashed circle border */}
              <div
                className="absolute inset-0 rounded-full border-4 border-background border-dashed"
                style={{
                  background: 'transparent',
                  animation: 'rotation 120s linear infinite',
                }}
              />
            </div>
          </div>

          {/* Center Star */}
          <Sparkle className="h-16 w-16 text-background" />

          {/* Right Circle - Certificates */}
          <div className="flex h-80 w-80 items-center justify-center rounded-full border-[1px] border-background bg-secondary/10">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-secondary/20">
              <div className="flex h-48 w-48 flex-col items-center justify-center rounded-full bg-primary text-center">
                <BookmarkPlus className="mb-2 h-8 w-8 text-background" />
                <div className="font-bold text-3xl text-warning">{formatNumber(data.certificates.count)}</div>
                <div className="mt-1 text-background text-sm">{data.certificates.label}</div>
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
