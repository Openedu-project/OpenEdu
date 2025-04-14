import { fundingGoalLaunchpadSchema } from '@oe/api';
import { CREATE_LAUNCHPAD_FORM_ID } from '@oe/core';
import { FormNestedProvider, FormNestedWrapper, type INestedFormsValues } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { LaunchpadNavigationButtons } from '../_components/launchpad-navigation-buttons';
import { useChangeLaunchpadTab } from '../_hooks/useChangeLaunchpadTab';
import { useLaunchpadDetail } from '../_hooks/useLaunchpadDetail';
import { CurrencySelection } from './currency-selection';
import { MinPledge } from './min-pledge';
import { NumberDayRunFunding } from './number-day-run-funding';
import { SharePercentage } from './share-percentage';
import { TargetFundingAmount } from './target-funding-amount';

interface IFundingGoalBlockProps {
  onSubmit: (data: INestedFormsValues, nextTab: string | undefined) => void;
}

const FundingGoalBlock = ({ onSubmit }: IFundingGoalBlockProps) => {
  const tLaunchpad = useTranslations('creatorSettingLaunchpad.fundingGoal');
  const { nextTab, handleGoToPrevTab } = useChangeLaunchpadTab();
  const { launchpad } = useLaunchpadDetail();

  const handleOnSubmit = useCallback(
    async (data: INestedFormsValues) => {
      await onSubmit(data, nextTab);
    },
    [onSubmit, nextTab]
  );

  return launchpad ? (
    <div className="mx-auto flex max-w-5xl gap-spacing-m rounded-lg bg-white px-6 py-5">
      <FormNestedProvider onSubmit={handleOnSubmit}>
        <FormNestedWrapper
          id={CREATE_LAUNCHPAD_FORM_ID.fundingGoal ?? ''}
          tabId="funding-goal"
          className="grid w-full gap-[10px]"
          schema={fundingGoalLaunchpadSchema}
          useFormProps={{
            defaultValues: {
              target_funding: Number(launchpad.funding_goal.target_funding),
              min_pledge: Number(launchpad.funding_goal.min_pledge),
              profit_percentage: launchpad.funding_goal.profit_percentage,
              currency: launchpad.funding_goal.currency,
              estimate_funding_days: launchpad.estimate_funding_days,
            },
          }}
        >
          {({ form }) => (
            <>
              <div className="grid w-full gap-[20px] lg:grid-cols-2">
                <div className="flex items-center justify-between lg:col-span-2">
                  <h1 className="font-semibold text-xl">{tLaunchpad('title')}</h1>
                  <CurrencySelection form={form} />
                </div>

                <div className="col-span-2">
                  <TargetFundingAmount form={form} launchpad={launchpad} />
                </div>

                <div className="col-span-2">
                  <MinPledge form={form} />
                </div>
                <div className="col-span-2">
                  <SharePercentage form={form} />
                </div>
                <div className="col-span-2">
                  <NumberDayRunFunding form={form} />
                </div>
              </div>
              <div className="flex justify-end">
                <LaunchpadNavigationButtons onNextClick={handleOnSubmit} onPrevClick={handleGoToPrevTab} />
              </div>
            </>
          )}
        </FormNestedWrapper>
      </FormNestedProvider>
    </div>
  ) : null;
};

FundingGoalBlock.displayName = 'FundingGoalBlock';

export { FundingGoalBlock };
