'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import React, { useEffect } from 'react';
import type { DateRange, Matcher } from 'react-day-picker';

import { useLocale, useTranslations } from 'next-intl';
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as locales from 'react-day-picker/locale';
import { Button } from '#shadcn/button';
import { Calendar, type CalendarProps } from '#shadcn/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';
import { cn } from '#utils/cn';

export type IDate = Date | DateRange;

type DateTimePickerProps = CalendarProps & {
  isRange?: boolean;
  hasTime?: boolean;
  className?: string;
  value?: IDate;
  disabled?: Matcher | Matcher[] | undefined;
  onChange?: (date: IDate) => void;
};

const TimeSelect = ({
  max,
  label,
  value,
  onChange,
}: {
  max: number;
  label: string;
  value?: number;
  onChange: (value: string) => void;
}) => (
  <div className="flex flex-col items-center">
    <span className="mb-1 text-muted-foreground text-xs">{label}</span>
    <Select onValueChange={onChange} value={value?.toString().padStart(2, '0')}>
      <SelectTrigger className="h-10 w-16 px-2 text-center">
        <SelectValue placeholder={value?.toString().padStart(2, '0') ?? '--'} />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: max }, (_, i) => (
          <SelectItem
            key={`index${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              i
            }`}
            value={i.toString().padStart(2, '0')}
          >
            {i.toString().padStart(2, '0')}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export function DateTimePicker({
  isRange = false,
  hasTime = true,
  className,
  onChange,
  value,
  disabled,
  ...props
}: DateTimePickerProps) {
  const t = useTranslations('dateTimePicker');
  const locale = useLocale();
  const [date, setDate] = React.useState<Date | undefined>(
    (isRange ? undefined : (value as Date | undefined)) ?? new Date()
  );
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    isRange ? (value as DateRange | undefined) : undefined
  );

  useEffect(() => {
    if (isRange) {
      setDateRange(value as DateRange | undefined);
    } else {
      setDate(value as Date | undefined);
    }
  }, [value, isRange]);

  const handleSelect = (selectedDate: Date | DateRange | undefined) => {
    if (isRange) {
      setDateRange(selectedDate as DateRange);
      onChange?.(selectedDate as DateRange);
    } else {
      const newDate = selectedDate as Date;
      if (newDate && date) {
        // Preserve the time when selecting a new date
        newDate.setHours(date.getHours());
        newDate.setMinutes(date.getMinutes());
        newDate.setSeconds(date.getSeconds());
      }
      setDate(newDate);
      onChange?.(newDate);
    }
  };

  const handleTimeChange = (value: string, type: 'hour' | 'minute' | 'second') => {
    if (!date) {
      return;
    }

    const newDate = new Date(date);
    switch (type) {
      case 'hour':
        newDate.setHours(Number.parseInt(value, 10));
        break;
      case 'minute':
        newDate.setMinutes(Number.parseInt(value, 10));
        break;
      case 'second':
        newDate.setSeconds(Number.parseInt(value, 10));
        break;
      default:
        return '';
    }

    setDate(newDate);
    onChange?.(newDate);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !(date || dateRange) && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {isRange ? (
              dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, 'LLL dd, y HH:mm:ss')} - {format(dateRange.to, 'LLL dd, y HH:mm:ss')}
                  </>
                ) : (
                  format(dateRange.from, 'LLL dd, y HH:mm:ss')
                )
              ) : (
                <span>{t('pickDateAndTimeRange')}</span>
              )
            ) : date ? (
              format(date, 'PPP HH:mm:ss')
            ) : (
              <span>{t('pickDateAndTime')}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {isRange ? (
            <Calendar
              {...props}
              mode="range"
              selected={dateRange}
              defaultMonth={dateRange?.from ?? new Date()}
              onSelect={handleSelect}
              numberOfMonths={2}
              disabled={disabled}
              locale={locales[locale as keyof typeof locales]}
            />
          ) : (
            <>
              <Calendar
                {...props}
                mode="single"
                selected={date}
                defaultMonth={date ?? new Date()}
                onSelect={handleSelect}
                disabled={disabled}
                locale={locales[locale as keyof typeof locales]}
              />
              {hasTime && (
                <div className="flex items-end justify-between gap-2 border-t p-4">
                  <div className="flex space-x-4">
                    <TimeSelect
                      max={24}
                      label="HH"
                      value={date?.getHours()}
                      onChange={value => handleTimeChange(value, 'hour')}
                    />
                    <TimeSelect
                      max={60}
                      label="MM"
                      value={date?.getMinutes()}
                      onChange={value => handleTimeChange(value, 'minute')}
                    />
                    <TimeSelect
                      max={60}
                      label="SS"
                      value={date?.getSeconds()}
                      onChange={value => handleTimeChange(value, 'second')}
                    />
                  </div>
                  <Clock className="mb-2 h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
export type DateTimePickerType = typeof DateTimePicker;
