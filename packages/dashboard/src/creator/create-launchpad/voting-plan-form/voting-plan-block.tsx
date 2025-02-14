import { useGetLaunchpadVotingPhaseRule } from '@oe/api/hooks/useLaunchpad';
import { type IVotingPlanLaunchpadSchemaType, votingPlanLaunchpadSchema } from '@oe/api/schemas/launchpadSchema';
import { CREATE_LAUNCHPAD_FORM_ID } from '@oe/core/utils/constants';
import { FormNestedProvider, FormNestedWrapper, type INestedFormsValues } from '@oe/ui/components/form-wrapper';
import { TabsList, TabsTrigger } from '@oe/ui/shadcn/tabs';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { LaunchpadNavigationButtons } from '../_components/launchpad-navigation-buttons';
import { useChangeLaunchpadTab } from '../_hooks/useChangeLaunchpadTab';
import useLaunchpadDetail from '../_hooks/useLaunchpadDetail';
import useTargetAmountStore from '../_store/useTargetAmountStore';
import NoticeBlock from '../notice-block';
import VotingMilestones from './voting-milestones';
import { VotingNoticeContent } from './voting-notice-content';

interface IVotingPlanBlockProps {
  onSubmit: (data: INestedFormsValues, nextTab: string | undefined) => void;
}

const VotingPlanBlock = ({ onSubmit }: IVotingPlanBlockProps) => {
  const tLaunchpad = useTranslations('creatorSettingLaunchpad.votingPlan');
  const [votingPhase, setVotingPhase] = useState<number>(0);
  const [isFinishFundingGoal, setIsFinishFundingGoal] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<IVotingPlanLaunchpadSchemaType>({
    clp_voting_milestones: [],
  });
  const { nextTab, handleGoToPrevTab } = useChangeLaunchpadTab();

  const { targetAmount, setTargetAmount } = useTargetAmountStore();
  const { dataLaunchpadVotingPhaseRule } = useGetLaunchpadVotingPhaseRule();
  const { launchpad } = useLaunchpadDetail();

  useEffect(() => {
    setTargetAmount(Number(launchpad?.funding_goal?.target_funding) || 0);
  }, [launchpad, setTargetAmount]);

  //find voting phase
  useEffect(() => {
    setIsFinishFundingGoal(targetAmount !== 0);

    setVotingPhase(
      Number(
        dataLaunchpadVotingPhaseRule?.value.find(rule => {
          return (
            Number(rule.funding_goal_gte) <= targetAmount &&
            (Number(rule.funding_goal_lt) === -1 || Number(rule.funding_goal_lt) > targetAmount)
          );
        })?.max_phases ?? 0
      )
    );
  }, [dataLaunchpadVotingPhaseRule, targetAmount]);

  useEffect(() => {
    if (launchpad) {
      //get default voting milestones
      const votingMilestones =
        launchpad.voting_milestones?.map(milestone => ({
          id: milestone.id,
          order: milestone.order,
          estimated_open_vote_date: milestone.estimated_open_vote_date,
          target_section: milestone.target_section,
        })) || [];

      //check if voting milestones is less than voting phase and add more milestones
      if (votingMilestones.length < votingPhase) {
        for (let i = votingMilestones.length; i < votingPhase; i++) {
          votingMilestones.push({
            id: '',
            order: i + 1,
            estimated_open_vote_date: 0,
            target_section: 0,
          });
        }
      }

      setDefaultValues({ clp_voting_milestones: votingMilestones });
    }
  }, [votingPhase, launchpad]);

  const handleOnSubmit = useCallback(
    async (data: INestedFormsValues) => {
      await onSubmit(data, nextTab);
    },
    [onSubmit, nextTab]
  );

  if (launchpad && !isFinishFundingGoal) {
    return (
      <div className="mx-auto max-w-5xl gap-spacing-m rounded-lg bg-white px-6 py-5">
        <h1 className="font-semibold text-xl">{tLaunchpad('title')}</h1>
        <NoticeBlock
          title=""
          content={
            <div className="flex items-center justify-center">
              {tLaunchpad('noFundingGoal.desc1')}
              <TabsList asChild>
                <TabsTrigger
                  value={CREATE_LAUNCHPAD_FORM_ID.fundingGoal as string}
                  className="cursor-pointer bg-transparent"
                >
                  <span className="text-base text-primary underline">{tLaunchpad('noFundingGoal.fundingGoal')}</span>
                </TabsTrigger>
              </TabsList>
              {tLaunchpad('noFundingGoal.desc2')}
            </div>
          }
        />
      </div>
    );
  }

  return launchpad ? (
    <FormNestedProvider onSubmit={handleOnSubmit}>
      <div className="mx-auto flex max-w-5xl gap-5 rounded-lg bg-white px-6 py-5">
        <FormNestedWrapper
          id={CREATE_LAUNCHPAD_FORM_ID.votingPlan ?? ''}
          schema={votingPlanLaunchpadSchema}
          tabId="voting-plan"
          useFormProps={{ defaultValues: defaultValues }}
        >
          {({ form }) => (
            <div className="grid w-full gap-[20px]">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold text-xl">{tLaunchpad('title')}</h1>

                <p className="font-semibold text-xl">
                  {tLaunchpad('subTitle')}
                  <b className="font-semibold text-primary">
                    {` ${votingPhase}`} {tLaunchpad('votingTimes')}
                  </b>
                </p>
                <p className="font-normal text-sm">{tLaunchpad('description')}</p>
              </div>

              <VotingMilestones form={form} votingPhase={votingPhase} />

              <h1 className="font-semibold text-xl">
                {tLaunchpad('totalTargetSection')}:
                <b className="font-semibold text-primary">
                  {` ${form
                    .watch()
                    .clp_voting_milestones.reduce((acc, milestone) => acc + milestone.target_section, 0)} sections`}
                </b>
              </h1>
              <NoticeBlock title="Voting Notice*" content={<VotingNoticeContent />} />
              <div className="flex justify-end">
                <LaunchpadNavigationButtons onNextClick={handleOnSubmit} onPrevClick={handleGoToPrevTab} />
              </div>
            </div>
          )}
        </FormNestedWrapper>
      </div>
    </FormNestedProvider>
  ) : null;
};

VotingPlanBlock.displayName = 'VotingPlanBlock';

export default VotingPlanBlock;
