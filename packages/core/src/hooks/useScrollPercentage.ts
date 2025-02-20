import { useEffect, useState } from 'react';

interface UseScrollPercentageOptions {
  startElementId?: string;
  endElementId?: string;
  rootMargin?: string;
  threshold?: number | number[];
}

interface UseScrollPercentageReturn {
  percentage: number;
  isVisible: boolean;
  elementRef: (element: HTMLElement | null) => void;
}

// const { percentage, isVisible, elementRef } = useScrollPercentage({
//   startElementId: 'custom-start',
//   endElementId: 'custom-end'
// });

export const useScrollPercentage = ({
  startElementId,
  endElementId,
  rootMargin = '0px',
  threshold = 0,
}: UseScrollPercentageOptions = {}): UseScrollPercentageReturn => {
  const [percentage, setPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element) {
      return;
    }

    const calculateScrollPercentage = () => {
      const startElement = startElementId ? document.getElementById(startElementId) : null;

      const endElement = endElementId ? document.getElementById(endElementId) : null;

      const containerTop = element.getBoundingClientRect().top;
      const scrollTop = element.scrollTop;

      // Tính điểm bắt đầu
      let startPosition = 0;
      if (startElement) {
        const startRect = startElement.getBoundingClientRect();
        startPosition = startRect.top - containerTop + scrollTop;
      }

      // Tính điểm kết thúc
      let endPosition = element.scrollHeight - element.clientHeight;
      if (endElement) {
        const endRect = endElement.getBoundingClientRect();
        endPosition = endRect.bottom - containerTop + scrollTop;
      }

      // Tính phần trăm scroll trong khoảng chỉ định
      const currentScroll = Math.max(0, scrollTop - startPosition);
      const maxScroll = endPosition - startPosition;
      const calculatedPercentage = (currentScroll / maxScroll) * 100;

      setPercentage(Math.min(Math.round(calculatedPercentage), 100));
    };

    // Theo dõi khi element xuất hiện trong viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry?.isIntersecting ?? false);
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    // Theo dõi sự kiện scroll
    element.addEventListener('scroll', calculateScrollPercentage);
    window.addEventListener('resize', calculateScrollPercentage);

    // Tính toán ban đầu
    calculateScrollPercentage();

    return () => {
      observer.disconnect();
      element.removeEventListener('scroll', calculateScrollPercentage);
      window.removeEventListener('resize', calculateScrollPercentage);
    };
  }, [element, startElementId, endElementId, rootMargin, threshold]);

  return {
    percentage,
    isVisible,
    elementRef: setElement,
  };
};
