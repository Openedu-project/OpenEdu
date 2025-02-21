'use client';

import type { ILaunchpad } from '@oe/api/types/launchpad';
import { VOTING_STATUS } from '@oe/api/utils/launchpad';
import { formatDate } from '@oe/core/utils/datetime';
import { Check, type LucideIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Separator } from '#shadcn/separator';
import { cn } from '#utils/cn';
import VotingDialog from './voting-dialog';

const VotingCard = ({ campaign }: { campaign: ILaunchpad | null }) => {
  const t = useTranslations('launchpadDetailPage');

  const currentVoting = campaign?.voting_milestones?.find(milestone => milestone.status === VOTING_STATUS.RUNNING);

  const [selectedVote, setSelectedVote] = useState<'approve' | 'reject' | null>(null);

  if (!currentVoting) {
    return null;
  }

  const isVoted = currentVoting.voting_process?.is_voted;

  const handleVoteSelect = (vote: 'approve' | 'reject') => {
    if (isVoted) {
      return;
    }
    setSelectedVote(vote);
  };

  return (
    <aside className="h-full w-full rounded-2xl bg-white p-6 text-center shadow-[0px_4px_30px_0px_#F4F5F6] lg:w-[40%]">
      <p className="font-semibold text-sm">Voting End At</p>
      <p className="font-semibold text-lg">{formatDate(currentVoting.end_vote_date)}</p>
      <div className="flex items-center justify-around pt-6">
        <VoteButton
          icon={Check}
          text={t('votePage.approve')}
          type="approve"
          isSelected={selectedVote === 'approve'}
          onClick={() => handleVoteSelect('approve')}
        />
        <VoteButton
          icon={X}
          text={t('votePage.reject')}
          type="reject"
          isSelected={selectedVote === 'reject'}
          onClick={() => handleVoteSelect('reject')}
        />
      </div>
      <Separator className="my-3" />
      <p>{t('votePage.voteNotice')}</p>
      <div className="flex items-center justify-center">
        <p className="py-4">
          <span className="font-semibold text-2xl">{campaign?.total_backers}</span>
          {t('common.backers')}
        </p>
        <Separator orientation="vertical" className="mx-4 h-4" />
        <p className="py-4">
          <span className="font-semibold text-2xl">{currentVoting.voting_process?.total_vote}</span>
          {t('common.vote')}
        </p>
      </div>
      <VotingDialog currentVoting={currentVoting} selectedVote={selectedVote} />
      {isVoted && <p className="mt-2 font-semibold text-sm">{t('common.youVoted')}</p>}
    </aside>
  );
};

const VoteButton = ({
  icon: Icon,
  text,
  type,
  isSelected,
  onClick,
  className,
}: {
  icon: LucideIcon;
  text: string;
  type: 'approve' | 'reject';
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      type="button"
      className="space-y-2"
      onClick={onClick}
      tabIndex={0}
      onKeyUp={e => e.key === 'Enter' && onClick?.()}
    >
      <div
        className={cn(
          className,
          'cursor-pointer rounded-full p-3 transition-colors',
          isSelected
            ? type === 'approve'
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
            : 'bg-gray-100 hover:bg-gray-200'
        )}
      >
        <Icon className="size-10" />
      </div>
      <p className={cn(isSelected && (type === 'approve' ? 'text-green-600' : 'text-red-600'))}>{text}</p>
    </button>
  );
};

export default VotingCard;
