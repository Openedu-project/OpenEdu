'use client';

import { postLaunchpadVote } from '@oe/api/services/launchpad';
import { useRouter } from '#common/navigation';
import { Button } from '#shadcn/button';
import { Checkbox } from '#shadcn/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '#shadcn/dialog';

import type { ILaunchpadVotingMilestone } from '@oe/api/types/launchpad';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

const VotingDialog = ({
  currentVoting,
  selectedVote,
}: {
  currentVoting: ILaunchpadVotingMilestone;
  selectedVote: 'approve' | 'reject' | null;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTermsAccept, setIsTermsAccept] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations('launchpadDetailPage');

  const handlePostLaunchpadVoting = async () => {
    setIsLoading(true);
    try {
      if (selectedVote) {
        await postLaunchpadVote(null, {
          milestone_id: currentVoting.id,
          payload: {
            status: selectedVote,
          },
        });
      }
      router.refresh();
      setIsOpen(false);
    } catch (_error) {
      toast.error(t('votePage.voteNotice'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-fit w-full rounded-xl px-6 py-4 font-semibold text-base"
          disabled={currentVoting?.voting_process?.is_voted || selectedVote === null}
        >
          {t('buttons.submit')}
        </Button>
      </DialogTrigger>
      <DialogContent className="!rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle>{t('votePage.submitModal.title')}</DialogTitle>
          <ul className="mt-2 list-disc bg-slate-200 p-2 pl-5">
            <li>{t('votePage.submitModal.desc1')}</li>
            <li>{t('votePage.submitModal.desc2')}</li>
            <li>{t('votePage.submitModal.desc3')}</li>
          </ul>
          <div className="mt-2 flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={isTermsAccept}
                onCheckedChange={(checked: boolean) => setIsTermsAccept(checked)}
                id="terms"
              />
              <label htmlFor="terms" className="cursor-pointer">
                {t('votePage.submitModal.terms')}
              </label>
            </div>
            {!isTermsAccept && <p className="text-red-500 text-xs">{t('votePage.submitModal.termsNotice')}</p>}
          </div>
        </DialogHeader>

        <DialogFooter>
          <Button className="w-full" onClick={handlePostLaunchpadVoting} loading={isLoading} disabled={!isTermsAccept}>
            {t('buttons.vote')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VotingDialog;
