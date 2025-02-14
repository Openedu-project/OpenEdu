'use client';
import type { ILaunchpad } from '@oe/api/types/launchpad';
import { CREATE_LAUNCHPAD_TABS_ORDER } from '@oe/api/utils/launchpad';
import PublishLaunchpadButton from '../_components/publish-launchpad-button';
import { useChangeLaunchpadTab } from '../_hooks/useChangeLaunchpadTab';
import useLaunchpadDetail from '../_hooks/useLaunchpadDetail';
import NameInput from './name-input';

const BasicInfoBlock = ({ launchpad }: { launchpad: ILaunchpad }) => {
  const { mutateAdminLaunchpadDetail } = useLaunchpadDetail();
  const { currentTab: activeTab } = useChangeLaunchpadTab();

  const currentTab = CREATE_LAUNCHPAD_TABS_ORDER.find(tab => tab.value === activeTab);
  const currentIndex = currentTab ? CREATE_LAUNCHPAD_TABS_ORDER.indexOf(currentTab) : -1;
  const isLastTab = currentIndex === CREATE_LAUNCHPAD_TABS_ORDER.length - 1;

  return (
    launchpad && (
      <div className="flex w-full items-center justify-between gap-spacing-sm md:gap-spacing-2xl">
        <NameInput launchpad={launchpad} mutateLaunchpad={mutateAdminLaunchpadDetail} />
        {isLastTab && <PublishLaunchpadButton />}
      </div>
    )
  );
};

export default BasicInfoBlock;
