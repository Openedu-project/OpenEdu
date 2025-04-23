'use client';

import { useEffect, useState } from 'react';

function useHeaderHeight(selector = 'header') {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    // Hàm để đo chiều cao của header
    const measureHeaderHeight = () => {
      const headerElement = document.querySelector(selector);
      if (headerElement) {
        setHeaderHeight(headerElement.getBoundingClientRect().height);
      }
    };

    // Đo lần đầu sau khi component mount
    measureHeaderHeight();

    // Thiết lập ResizeObserver để theo dõi thay đổi kích thước
    const resizeObserver = new ResizeObserver(() => {
      measureHeaderHeight();
    });

    // Tìm và quan sát header element
    const headerElement = document.querySelector(selector);
    if (headerElement) {
      resizeObserver.observe(headerElement);
    }

    // Lắng nghe sự kiện resize của window như một biện pháp dự phòng
    window.addEventListener('resize', measureHeaderHeight);

    // Dọn dẹp
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureHeaderHeight);
    };
  }, [selector]);

  return headerHeight;
}

export { useHeaderHeight };
