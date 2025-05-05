'use client';

import { DateTimePicker, type IDate } from '@oe/ui'; // Hoặc import từ đường dẫn chính xác của bạn
import type { ComponentPropsWithoutRef } from 'react';

interface ScheduleSettingTimestampDatePickerProps {
  value?: number;
  onChange?: (timestamp: number | undefined) => void;
  className?: string;
  isRange?: boolean;
  hasTime?: boolean;
  disabled?: ComponentPropsWithoutRef<typeof DateTimePicker>['disabled'];
}

export function ScheduleSettingTimestampDatePicker({
  value,
  onChange,
  className,
  isRange,
  hasTime,
  disabled,
}: ScheduleSettingTimestampDatePickerProps) {
  const dateValue = value ? new Date(value) : undefined;

  const handleChange = (date: IDate) => {
    if (!date) {
      onChange?.(undefined);
      return;
    }

    if ('from' in date) {
      const fromDate = date.from;
      if (fromDate) {
        onChange?.(fromDate.getTime());
      }
      return;
    }

    onChange?.(date.getTime());
  };

  return (
    <DateTimePicker
      value={dateValue}
      onChange={handleChange}
      className={className}
      isRange={isRange}
      hasTime={hasTime}
      disabled={disabled}
    />
  );
}
