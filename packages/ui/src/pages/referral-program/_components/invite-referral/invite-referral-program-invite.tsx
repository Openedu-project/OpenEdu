import { IconInfoCircle } from '@oe/assets';
import StarBgImage from '@oe/assets/images/star-background.png';
import { getTranslations } from 'next-intl/server';
import { InviteReferralButton } from './invite-referral-button';
import { InviteReferralProgramInviteForm } from './invite-referral-invite-friend-form';

export async function InviteReferralProgramInvite({
  points,
  refCode,
}: {
  points: string;
  refCode: string;
}) {
  const t = await getTranslations('referralProgram.invite');

  return (
    <section className="mb-6 flex flex-col gap-4 rounded-[16px] bg-white p-2 md:p-6 lg:flex-row">
      <div className="relative flex w-full flex-col justify-center rounded-xl bg-gradient-1 p-6 lg:w-1/2">
        <div
          className="absolute top-0 left-0 h-full w-full bg-repeat-y"
          style={{
            backgroundImage: `url(${StarBgImage.src})`,
          }}
        />
        <div className="relative z-10 block">
          <h3 className="giant-iheading-bold24 md:giant-iheading-bold40 mb-2">{t('getPoints', { points })}</h3>
          <p className="mcaption-regular16 mb-4">{t('dropEmailMessage')}</p>

          <InviteReferralProgramInviteForm />
        </div>
      </div>

      {/* Requirements Section */}
      <div className="w-full rounded-xl p-2 md:p-6 lg:w-1/2">
        <div className="mb-4 flex flex-col items-center justify-between lg:flex-row">
          <h3 className="mcaption-semibold16 md:mcaption-semibold20">{t('requirementsTitle')}</h3>
          <InviteReferralButton refCode={refCode} />
        </div>
        <div className="mb-4 space-y-3">
          <div className="flex items-center">
            <div className="mr-2 rounded-full bg-positive-600 p-1">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-label={t('checkmarkAriaLabel')}
              >
                <title>{t('checkmarkAriaLabel')}</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="mbutton-regular16">{t('requirementRegistration')}</span>
          </div>

          <div className="flex items-center">
            <div className="mr-2 rounded-full bg-positive-600 p-1">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>{t('checkmarkAriaLabel')}</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="mbutton-regular16">{t('requirementCourse')}</span>
          </div>
        </div>
        <div className="mbutton-regular16 mb-6">
          {t('eachRefereeReceives')}&nbsp;
          <span className="mcaption-semibold20 text-primary">{t('pointsAmount', { count: points })}</span>
          &nbsp;
          {t('whenCompleteRequirements')}
        </div>

        <div className="mcaption-regular14 rounded-[12px] bg-base-cool px-8 py-3">
          <div className="flex items-start gap-2 md:items-center">
            <IconInfoCircle />
            <p>{t('referralCodeUsageWarning')}</p>
          </div>
          <div className="flex items-start gap-2 md:items-center">
            <IconInfoCircle />
            <p>{t('bothReceiveReward')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
