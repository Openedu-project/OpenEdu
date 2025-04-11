import { CREATE_LAUNCHPAD_TABS, CREATE_LAUNCHPAD_TABS_ORDER } from '@oe/api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

type TabType = (typeof CREATE_LAUNCHPAD_TABS)[keyof typeof CREATE_LAUNCHPAD_TABS];

interface TabChangeState {
  currentTab: string;
  nextTab?: string;
  prevTab?: string;
  isLatestTab: boolean;
  handleTabChange: (value: string) => void;
  handleGoToNextTab: () => void;
  handleGoToPrevTab: () => void;
}

const DEFAULT_TAB = CREATE_LAUNCHPAD_TABS.generalInfo;

const isValidTab = (tab: string | null): tab is TabType => {
  return !!tab && Object.values(CREATE_LAUNCHPAD_TABS).includes(tab as TabType);
};

export function useChangeLaunchpadTab(): TabChangeState {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current tab with validation
  const currentTab = useMemo((): string => {
    const tabParam = searchParams.get('tab');
    return isValidTab(tabParam) ? tabParam : DEFAULT_TAB;
  }, [searchParams]);

  // Initialize tab on first load or handle invalid tab
  useEffect(() => {
    const tabParam = searchParams.get('tab');

    if (!isValidTab(tabParam)) {
      const params = new URLSearchParams(searchParams);
      params.set('tab', DEFAULT_TAB);

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, router, pathname]);

  // Calculate tab navigation state
  const { nextTab, prevTab, isLatestTab } = useMemo(() => {
    const currentTabIndex = CREATE_LAUNCHPAD_TABS_ORDER.findIndex(tab => tab.value === currentTab);

    return {
      nextTab:
        currentTabIndex < CREATE_LAUNCHPAD_TABS_ORDER.length - 1
          ? CREATE_LAUNCHPAD_TABS_ORDER[currentTabIndex + 1]?.value
          : undefined,
      prevTab: currentTabIndex > 0 ? CREATE_LAUNCHPAD_TABS_ORDER[currentTabIndex - 1]?.value : undefined,
      isLatestTab: currentTabIndex === CREATE_LAUNCHPAD_TABS_ORDER.length - 1,
    };
  }, [currentTab]);

  // Handler with string value support for Tabs component
  const handleTabChange = useCallback(
    (value: string) => {
      if (isValidTab(value)) {
        const params = new URLSearchParams(searchParams);
        params.set('tab', value);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    },
    [router, pathname, searchParams]
  );

  // Navigation handlers
  const handleGoToNextTab = useCallback(() => {
    if (nextTab) {
      handleTabChange(nextTab);
    }
  }, [nextTab, handleTabChange]);

  const handleGoToPrevTab = useCallback(() => {
    if (prevTab) {
      handleTabChange(prevTab);
    }
  }, [prevTab, handleTabChange]);

  return {
    currentTab,
    nextTab,
    prevTab,
    isLatestTab,
    handleTabChange,
    handleGoToNextTab,
    handleGoToPrevTab,
  };
}
