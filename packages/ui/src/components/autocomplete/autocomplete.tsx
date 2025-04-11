'use client';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '#shadcn/button';
import { CommandItem } from '#shadcn/command';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';
import { cn } from '#utils/cn';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, ITEM_HEIGHT } from './constants';
import type { BaseAutocompleteProps, OptionType } from './types';
import { useOptionFiltering } from './use-option-filtering';
import { VirtualizedCommandBase } from './virtualized-command-base';

export type AutocompleteProps<T extends OptionType | string> = BaseAutocompleteProps<T> & {
  searchPlaceholder?: string;
  showSearch?: boolean;
  value?: T | null;
  onChange?: (option: T | null) => void;
  isGetCustomValue?: boolean;
  onSearch?: (value: string) => void;
};

export function Autocomplete<T extends OptionType | string>({
  options,
  searchPlaceholder,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  showSearch,
  className,
  triggerProps,
  value,
  onChange,
  getOptionLabel = (option: T) => (typeof option === 'string' ? option : option.label),
  getOptionValue = (option: T) => (typeof option === 'string' ? option : option.value),
  filterOption = (option: T, searchValue: string) =>
    getOptionLabel(option)?.toLowerCase().includes(searchValue.toLowerCase()),
  renderOption,
  renderTrigger,
  isGetCustomValue = false,
  onSearch,
}: AutocompleteProps<T>) {
  const t = useTranslations('general');
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T | null>(null);
  const [searchValue, setSearchValue] = useState('');

  const { filteredOptions } = useOptionFiltering({
    options,
    searchValue,
    filterOption,
    getOptionValue,
  });

  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
  }, [value]);

  const handleSelectOption = useCallback(
    (option: T) => {
      setSelectedOption(option);
      setSearchValue('');
      setOpen(false);
      onChange?.(isGetCustomValue ? (getOptionValue(option) as T) : option);
    },
    [onChange, isGetCustomValue, getOptionValue]
  );

  const renderCommandItem = useCallback(
    (option: T) => (
      <CommandItem
        key={getOptionValue(option)}
        value={String(getOptionValue(option))}
        onSelect={() => handleSelectOption(option)}
        style={{
          height: `${ITEM_HEIGHT}px`,
        }}
      >
        <Check
          className={cn(
            'mr-2 h-4 w-4',
            selectedOption && getOptionValue(selectedOption) === getOptionValue(option) ? 'opacity-100' : 'opacity-0'
          )}
        />
        {renderOption ? renderOption(option) : getOptionLabel(option)}
      </CommandItem>
    ),
    [selectedOption, getOptionValue, getOptionLabel, handleSelectOption, renderOption]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          {...triggerProps}
          variant="outline"
          aria-expanded={open}
          className={cn('justify-between', triggerProps?.className)}
          style={{ width }}
        >
          {renderTrigger ? (
            renderTrigger(selectedOption)
          ) : (
            <>
              {selectedOption ? getOptionLabel(selectedOption) : (searchPlaceholder ?? `${t('search')}...`)}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'max-h-[var(--radix-popover-content-available-height)] w-[var(--radix-popover-trigger-width)] p-0',
          className
        )}
      >
        <VirtualizedCommandBase
          height={height}
          options={filteredOptions}
          showSearch={showSearch}
          searchValue={searchValue}
          placeholder={searchPlaceholder}
          onSearch={val => {
            setSearchValue(val);
            onSearch?.(val);
          }}
          renderItem={renderCommandItem}
        />
      </PopoverContent>
    </Popover>
  );
}
