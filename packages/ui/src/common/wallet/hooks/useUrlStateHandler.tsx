import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from '#common/navigation';

type StateHandler = {
  type: string;
  handler: () => void;
};

interface UseUrlStateHandlerProps {
  handlers: StateHandler[];
  clearUrlAfterHandle?: boolean;
}

const useUrlStateHandler = ({ handlers, clearUrlAfterHandle = true }: UseUrlStateHandlerProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) {
      return;
    }

    const type = searchParams.get('type');
    const matchedHandler = handlers.find(h => h.type === type);

    if (matchedHandler) {
      matchedHandler.handler();

      if (clearUrlAfterHandle) {
        const newSearchParams = new URLSearchParams();
        searchParams.forEach((value, key) => {
          if (key !== 'type') {
            newSearchParams.append(key, value);
          }
        });

        const queryString = newSearchParams.toString();
        router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`, {
          scroll: false,
        });
      }
    }

    isInitialized.current = true;
  }, []);
};

export default useUrlStateHandler;
