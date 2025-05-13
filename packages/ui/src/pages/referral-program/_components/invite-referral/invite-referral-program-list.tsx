import { API_ENDPOINT, getAllReferralProgramListService, getMyPointProfileService } from '@oe/api';
import { InviteReferralProgramAdvanceReward } from './invite-referral-program-advance-reward';
import { InviteReferralProgramAvailableReward } from './invite-referral-program-available-reward';
import { InviteReferralProgramHeader } from './invite-referral-program-header';
import { InviteReferralProgramHowItWork } from './invite-referral-program-how-it-work';
import { InviteReferralProgramInvite } from './invite-referral-program-invite';

export default async function InviteReferralProgramList() {
  const allReferralProgramListRes = await getAllReferralProgramListService(API_ENDPOINT.POINT_CAMPAIGNS, {
    queryParams: {
      progam: 'ref-user',
      scope: 'global',
    },
  });
  const data = allReferralProgramListRes?.results?.[0];
  const myPointProfileRes = await getMyPointProfileService(API_ENDPOINT.USER_ME_POINT, { id: data?.id ?? '' });

  return (
    <main className="container mx-auto max-w-[1440px] px-4 py-6">
      <InviteReferralProgramHeader
        id={data?.id ?? ''}
        data={data?.setting?.ref_count_bonus ?? []}
        milestones={myPointProfileRes?.new_points?.milestone?.milestones ?? []}
        totalReferrals={myPointProfileRes?.total_reward ?? 0}
        totalEarnedPoints={Number(myPointProfileRes?.point?.amount) ?? 0}
        totalBalance={myPointProfileRes?.point_wallets?.[0]?.available_balance ?? '0'}
        startDate={data?.start_date ?? 0}
        endDate={data?.end_date ?? 0}
      />
      <InviteReferralProgramInvite
        points={data?.setting?.referrer_reward?.amount ?? '0'}
        refCode={myPointProfileRes?.ref_code?.code ?? ''}
      />
      <InviteReferralProgramAvailableReward data={myPointProfileRes?.new_points} />
      <InviteReferralProgramHowItWork />
      <InviteReferralProgramAdvanceReward dataSetting={data?.setting} dateNewPoint={myPointProfileRes.new_points} />
    </main>
  );
}
