'use client';
import type { HTTPErrorMetadata } from '@oe/api';
import type { ILaunchpad } from '@oe/api';
import { CREATE_LAUNCHPAD_TABS, LAUNCHPAD_STATUS } from '@oe/api';
import { CREATOR_ROUTES, LAUNCHPAD_ROUTES, buildUrl } from '@oe/core';
import { toast } from '@oe/ui';
import { useRouter } from '@oe/ui';
import { Breadcrumb } from '@oe/ui';
import type { INestedFormsValues } from '@oe/ui';
import { Spinner } from '@oe/ui';
import { ScrollArea, ScrollBar } from '@oe/ui';
import { Tabs, TabsContent } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { useChangeLaunchpadTab } from './_hooks/useChangeLaunchpadTab';
import { useLaunchpadDetail } from './_hooks/useLaunchpadDetail';
import { BasicInfoBlock } from './basic-info-block/basic-info-block';
import { FundingGoalBlock } from './funding-goal-form/funding-goal-form';
import { GeneralInfoBlock } from './general-info-form/general-info-form';
import { LaunchpadNavMenu } from './nav-menu/nav-menu';
import { OwnerAndCollaboratorsBlock } from './owner-and-collabs-form/owner-and-collabs-form';
import { PaymentMethodBlock } from './payment-method-form/payment-method-form';
import { VotingPlanBlock } from './voting-plan-form/voting-plan-block';

export function CreateLaunchpadLayout() {
  const { launchpadId: id } = useParams();
  const t = useTranslations('creatorSettingLaunchpad');
  const tBreadcrumb = useTranslations('creatorSettingLaunchpad.breadcrumb');
  const tError = useTranslations('errors');

  const router = useRouter();
  const pathName = usePathname();
  const { launchpad, isLoadingAdminLaunchpadDetail, triggerPatchLaunchpadDetail, mutateAdminLaunchpadDetail } =
    useLaunchpadDetail();

  const { currentTab, handleTabChange } = useChangeLaunchpadTab();

  useEffect(() => {
    if (!launchpad) {
      return;
    }
    const isLaunchpadDraft = launchpad.status === LAUNCHPAD_STATUS.DRAFT;

    if (!isLaunchpadDraft) {
      router.push('/');
    }
  }, [launchpad, router]);

  const menuBreadcrumbs = useMemo(() => {
    const breadcrumbs = [
      {
        href: LAUNCHPAD_ROUTES.launchpad as string,
        label: tBreadcrumb('launchpads'),
      },
    ];
    const pathParts = pathName.split('/');
    const finalItem = pathParts.at(-1);

    if (id) {
      if (finalItem) {
        breadcrumbs.push({
          href: buildUrl({
            endpoint: `${CREATOR_ROUTES.creatorCreateLaunchpadDetail}/${finalItem}`,
            params: { id },
          }),
          label: tBreadcrumb('detail'),
        });
      }
    }

    return breadcrumbs;
  }, [tBreadcrumb, pathName, id]);

  const handleOnSubmit = useCallback(
    async (data: INestedFormsValues, nextTab: string | undefined) => {
      const updateData = {
        ...data[CREATE_LAUNCHPAD_TABS.generalInfo],
        ...data[CREATE_LAUNCHPAD_TABS.fundingGoal],
        ...data[CREATE_LAUNCHPAD_TABS.votingPlan],
      };
      if (Object.keys(updateData).length === 0) {
        return;
      }

      try {
        const response = await triggerPatchLaunchpadDetail(updateData);

        if (response) {
          toast.success(t('saved'));
          await mutateAdminLaunchpadDetail();
        }
        if (nextTab) {
          handleTabChange(nextTab);
        }
      } catch (error) {
        console.error('Update Launchpad Block error', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [triggerPatchLaunchpadDetail, t, tError, handleTabChange, mutateAdminLaunchpadDetail]
  );

  return (
    <div className="block w-full">
      <Tabs defaultValue="general-information" value={currentTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex h-[calc(100vh-var(--header-small-height))] flex-col md:h-[calc(100vh-var(--header-height))]">
          <div className="mb-3 flex flex-none flex-col gap-1 rounded-b-4 rounded-b-radius-m bg-white px-6 pb-0 shadow-shadow-5">
            <div className="flex justify-between">
              <Breadcrumb items={menuBreadcrumbs} />
            </div>
            {!launchpad || isLoadingAdminLaunchpadDetail ? (
              <Spinner />
            ) : (
              <BasicInfoBlock launchpad={launchpad as unknown as ILaunchpad} />
            )}
            <LaunchpadNavMenu />
          </div>
          <ScrollArea>
            <div className="pb-10">
              <TabsContent value={CREATE_LAUNCHPAD_TABS.generalInfo}>
                <GeneralInfoBlock onSubmit={handleOnSubmit} />
              </TabsContent>
              <TabsContent value={CREATE_LAUNCHPAD_TABS.fundingGoal}>
                <FundingGoalBlock onSubmit={handleOnSubmit} />
              </TabsContent>
              <TabsContent value={CREATE_LAUNCHPAD_TABS.votingPlan}>
                <VotingPlanBlock onSubmit={handleOnSubmit} />
              </TabsContent>
              <TabsContent value={CREATE_LAUNCHPAD_TABS.ownerAndCollaborators}>
                <OwnerAndCollaboratorsBlock />
              </TabsContent>
              <TabsContent value={CREATE_LAUNCHPAD_TABS.paymentMethod}>
                <PaymentMethodBlock />
              </TabsContent>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
}
