'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ...args: Parameters<T['addEventListener']> | [string, (...args: any[]) => void, ...any]
): void {
  if (obj?.addEventListener) {
    obj.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>));
  }
}

function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ...args: Parameters<T['removeEventListener']> | [string, (...args: any[]) => void, ...any]
): void {
  if (obj?.removeEventListener) {
    obj.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>));
  }
}

export interface NavigationOptions {
  isEnabled?: boolean;
  hasUnsavedChanges?: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export const useNavigationGuard = ({
  isEnabled = true,
  hasUnsavedChanges = false,
  title,
  description,
  confirmText,
  cancelText,
}: NavigationOptions = {}) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pendingNavigation = useRef<null | (() => void)>(null);

  const handleBeforeUnload = useCallback(
    (event: BeforeUnloadEvent) => {
      if (!isEnabled) {
        return;
      }

      event.preventDefault();
      return '';
    },
    [isEnabled]
  );

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    if (hasUnsavedChanges) {
      on(window, 'beforeunload', handleBeforeUnload);
      return () => off(window, 'beforeunload', handleBeforeUnload);
    }
  }, [isEnabled, handleBeforeUnload, hasUnsavedChanges]);

  const handleNavigation = useCallback(
    (navigate: () => void) => {
      if (!isEnabled) {
        navigate();
        return;
      }

      pendingNavigation.current = () => {
        const temp = isEnabled;
        isEnabled = false;
        navigate();
        isEnabled = temp;
      };
      setIsDialogOpen(true);
    },
    [isEnabled]
  );

  const handleConfirm = useCallback(() => {
    const navigationFn = pendingNavigation.current;

    setIsDialogOpen(false);
    pendingNavigation.current = null;

    if (navigationFn) {
      navigationFn();
    }
  }, []);

  const handleCancel = useCallback(() => {
    setIsDialogOpen(false);
    pendingNavigation.current = null;
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    function isAnchorOfCurrentUrl(currentUrl: string, newUrl: string) {
      const currentUrlObj = new URL(currentUrl);
      const newUrlObj = new URL(newUrl);

      if (
        currentUrlObj.hostname === newUrlObj.hostname &&
        currentUrlObj.pathname === newUrlObj.pathname &&
        currentUrlObj.search === newUrlObj.search
      ) {
        const currentHash = currentUrlObj.hash;
        const newHash = newUrlObj.hash;
        return (
          currentHash !== newHash && currentUrlObj.href.replace(currentHash, '') === newUrlObj.href.replace(newHash, '')
        );
      }
      return false;
    }

    function findClosestAnchor(element: HTMLElement | null): HTMLAnchorElement | null {
      let currentElement = element;
      while (currentElement && currentElement.tagName.toLowerCase() !== 'a') {
        currentElement = currentElement.parentElement;
      }
      return currentElement as HTMLAnchorElement;
    }

    function handleClick(event: MouseEvent) {
      try {
        const target = event.target as HTMLElement;
        const anchor = findClosestAnchor(target);

        if (anchor) {
          const currentUrl = window.location.href;
          const newUrl = anchor.href;
          const isAnchor = isAnchorOfCurrentUrl(currentUrl, newUrl);
          const isDownloadLink = anchor.download !== '';
          const isPageLeaving = !(newUrl === currentUrl || isAnchor || isDownloadLink);

          if (isPageLeaving) {
            event.preventDefault();
            event.stopPropagation();

            try {
              const url = new URL(newUrl);
              const targetPathname = url.pathname;
              const targetSearch = url.search;

              handleNavigation(() => {
                router.push(targetPathname + targetSearch + url.hash);
              });
            } catch (error) {
              console.error('Failed to parse URL:', error);
            }
          }
        }
      } catch (err) {
        console.error('Navigation guard error:', err);
      }
    }

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [isEnabled, handleNavigation, router]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const originalPush = router.push;
    const originalReplace = router.replace;
    const originalBack = router.back;
    const originalForward = router.forward;

    router.push = (...args: Parameters<typeof router.push>) => {
      handleNavigation(() => {
        originalPush.apply(router, args);
      });
    };

    router.replace = (...args: Parameters<typeof router.replace>) => {
      handleNavigation(() => {
        originalReplace.apply(router, args);
      });
    };

    router.back = () => {
      handleNavigation(() => {
        originalBack.apply(router);
      });
    };

    router.forward = () => {
      handleNavigation(() => {
        originalForward.apply(router);
      });
    };

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
      router.back = originalBack;
      router.forward = originalForward;
    };
  }, [router, isEnabled, handleNavigation]);

  return {
    isDialogOpen,
    handleConfirm,
    handleCancel,
    dialogProps: {
      title,
      description,
      confirmText,
      cancelText,
    },
  };
};
