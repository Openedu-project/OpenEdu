'use client';

import type { ILaunchpadVotingMilestone } from '@oe/api/types/launchpad';
import { Check, MinusCircle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

const VotingResultCard = ({
  votingProcess,
}: {
  votingProcess: ILaunchpadVotingMilestone;
}) => {
  const t = useTranslations('launchpadDetailPage.votePage');

  if (!votingProcess.voting_process) {
    return null;
  }

  const approved = Number((votingProcess.voting_process?.approve_percentage ?? 0).toFixed(1));
  const rejected = Number((votingProcess.voting_process?.reject_percentage ?? 0).toFixed(1));
  const notVoted = Number((100 - (approved + rejected)).toFixed(1));

  return (
    <div className="space-y-4 rounded-2xl bg-white p-2 shadow-[0px_4px_30px_0px_#F4F5F6] md:p-6">
      {/* Combined progress bar */}
      <div className="h-8 w-full overflow-hidden rounded-full bg-gray-200">
        {approved > 0 && (
          <div
            className="flex float-left h-full items-center justify-center bg-green-500 font-medium text-white"
            style={{ width: `${approved}%` }}
          >
            <div className="flex items-center space-x-1">
              <Check size={16} />
              <span>{approved}%</span>
            </div>
          </div>
        )}
        {rejected > 0 && (
          <div
            className="flex float-left h-full items-center justify-center bg-red-500 font-medium text-white"
            style={{ width: `${rejected}%` }}
          >
            <div className="flex items-center space-x-1">
              <X size={16} />
              <span>{rejected}%</span>
            </div>
          </div>
        )}
        {notVoted > 0 && (
          <div
            className="flex float-left h-full items-center justify-center bg-gray-400 font-medium text-white"
            style={{ width: `${notVoted}%` }}
          >
            <div className="flex items-center space-x-1">
              <MinusCircle size={16} />
              <span>{notVoted}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span>{t('approved')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span>{t('rejected')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-400 rounded-full" />
          <span>{t('notVoted')}</span>
        </div>
      </div>
    </div>
  );
};

export default VotingResultCard;
