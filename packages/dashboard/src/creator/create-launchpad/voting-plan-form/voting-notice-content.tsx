import { useGetLaunchpadMinApprovalPercentage, useGetLaunchpadVotingPhaseRule } from '@oe/api';
import { useTranslations } from 'next-intl';

export const VotingNoticeContent = () => {
  const t = useTranslations('creatorSettingLaunchpad.votingPlan.notice');
  const { dataLaunchpadVotingPhaseRule } = useGetLaunchpadVotingPhaseRule();
  const { dataLaunchpadMinApprovalPercentage } = useGetLaunchpadMinApprovalPercentage();

  return (
    <div>
      <p>
        {t.rich('fundingGoalLessThan', {
          amount: dataLaunchpadVotingPhaseRule?.value[0]?.funding_goal_lt ?? 0,
          phases: dataLaunchpadVotingPhaseRule?.value[0]?.max_phases ?? 0,
          strong: chunks => <span className="font-bold">{chunks}</span>,
        })}
      </p>
      <p>
        {t.rich('fundingGoalBetween', {
          min: dataLaunchpadVotingPhaseRule?.value[1]?.funding_goal_gte ?? 0,
          max: dataLaunchpadVotingPhaseRule?.value[1]?.funding_goal_lt ?? 0,
          phases: dataLaunchpadVotingPhaseRule?.value[1]?.max_phases ?? 0,
          strong: chunks => <span className="font-bold">{chunks}</span>,
        })}
      </p>
      <p>
        {t.rich('fundingGoalBetween', {
          min: dataLaunchpadVotingPhaseRule?.value[2]?.funding_goal_gte ?? 0,
          max: dataLaunchpadVotingPhaseRule?.value[2]?.funding_goal_lt ?? 0,
          phases: dataLaunchpadVotingPhaseRule?.value[2]?.max_phases ?? 0,
          strong: chunks => <span className="font-bold">{chunks}</span>,
        })}
      </p>
      <p>
        {t.rich('fundingGoalGreaterThan', {
          amount: dataLaunchpadVotingPhaseRule?.value[3]?.funding_goal_gte ?? 0,
          phases: dataLaunchpadVotingPhaseRule?.value[3]?.max_phases ?? 0,
          strong: chunks => <span className="font-bold">{chunks}</span>,
        })}
      </p>
      <br />
      <p>
        {t.rich('approvalPercentageOver', {
          percentage: 100 - (dataLaunchpadMinApprovalPercentage?.value ?? 0),
          strong: chunks => <span className="font-bold">{chunks}</span>,
        })}
      </p>
      <p>
        {t.rich('approvalPercentageUnder', {
          percentage: 100 - (dataLaunchpadMinApprovalPercentage?.value ?? 0),
          strong: chunks => <span className="font-bold">{chunks}</span>,
        })}
      </p>
      <br />
      <b className="text-negative-500">{t('votingEndDateWarning')}</b>
    </div>
  );
};
