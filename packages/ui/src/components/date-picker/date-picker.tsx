import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import type { DateRange } from 'react-day-picker';

import { Button } from '#shadcn/button';
import { Calendar, type CalendarProps } from '#shadcn/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';
import { cn } from '#utils/cn';

export type IDate = Date | DateRange;

type DatePickerProps = Omit<CalendarProps, 'selected' | 'mode'> & {
  isRange?: boolean;
  className?: string;
  onChange?: (date: IDate) => void;
  value?: IDate;
};

export function DatePicker({ isRange = false, className, onChange, value, ...props }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(isRange ? undefined : (value as Date | undefined));
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
      setDate(selectedDate as Date);
      onChange?.(selectedDate as Date);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !(date || dateRange) && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {isRange ? (
              dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(dateRange.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date range</span>
              )
            ) : date ? (
              format(date, 'PPP')
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {isRange ? (
            <Calendar
              mode="range"
              selected={dateRange}
              defaultMonth={dateRange?.from ?? new Date()}
              onSelect={handleSelect}
              numberOfMonths={isRange ? 2 : 1}
              {...props}
            />
          ) : (
            <Calendar
              mode="single"
              selected={date}
              defaultMonth={date ?? dateRange?.from ?? new Date()}
              onSelect={handleSelect}
              numberOfMonths={isRange ? 2 : 1}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export type DatePickerType = typeof DatePicker;
