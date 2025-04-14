'use client';

import { useEffect, useState } from 'react';

const DescriptionCard = ({
  text,
  maxLength = 150,
}: {
  text: string;
  maxLength?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);

  useEffect(() => {
    // Chỉ hiện button khi text dài hơn maxLength ít nhất 10 ký tự
    setShouldShowButton(text.length > maxLength);
  }, [text, maxLength]);

  // Get the display text
  const getDisplayText = () => {
    if (!shouldShowButton || isExpanded) {
      return text;
    }

    // Tìm khoảng trắng cuối cùng trong phạm vi maxLength
    const lastSpace = text.substring(0, maxLength).lastIndexOf(' ');
    return text.substring(0, lastSpace > 0 ? lastSpace : maxLength);
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative space-y-3 rounded-2xl bg-white p-6 shadow-[0px_4px_30px_0px_#F4F5F6]">
      <p className="whitespace-pre-wrap">
        {getDisplayText()}
        {!isExpanded && shouldShowButton && '...'}
      </p>

      {shouldShowButton && (
        <button onClick={handleToggle} className="font-medium text-primary hover:underline" type="button">
          {isExpanded ? 'See less' : 'See more'}
        </button>
      )}
    </div>
  );
};

export { DescriptionCard };
