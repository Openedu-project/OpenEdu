import { InviteReferralProgramAdvanceReward } from './invite-referral-program-advance-reward';
import { InviteReferralProgramAvailableReward } from './invite-referral-program-available-reward';
import { InviteReferralProgramHeader } from './invite-referral-program-header';
import { InviteReferralProgramHowItWork } from './invite-referral-program-how-it-work';
import { InviteReferralProgramInvite } from './invite-referral-program-invite';

export default function InviteReferralProgramList() {
  return (
    <main className="container mx-auto max-w-[1440px] px-4 py-6">
      <InviteReferralProgramHeader />
      <InviteReferralProgramInvite />
      <InviteReferralProgramAvailableReward />
      <InviteReferralProgramHowItWork />
      <InviteReferralProgramAdvanceReward />
    </main>
  );
}
