import { X } from 'lucide-react';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '#shadcn/button';
import { CommandItem } from '#shadcn/command';
import { Input } from '#shadcn/input';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';
import { cn } from '#utils/cn';
import { DEFAULT_HEIGHT, DEFAULT_SEARCH_DELAY, DEFAULT_WIDTH, ITEM_HEIGHT } from './constants';
import { OptionBadge } from './option-badge';
import type { BaseAutocompleteProps, OptionType, OptionValue } from './types';
import { useOptionFiltering } from './use-option-filtering';
import { VirtualizedCommandBase } from './virtualized-command-base';

export type AutocompleteMultipleProps<T extends OptionType | string> = BaseAutocompleteProps<T> & {
  onChange?: (selectedOptions: T[]) => void;
  value?: T[];
  maxSelected?: number;
  onSearch?: (value: string) => void;
  delay?: number;
  fixedValue?: OptionValue[];
};

export function AutocompeteMultiple<T extends OptionType | string>({
  options,
  placeholder,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  disabled = false,
  getOptionLabel = (option: T) => (typeof option === 'object' ? option.label : option),
  getOptionValue = (option: T) => (typeof option === 'object' ? option.value : option),
  filterOption = (option: T, searchValue: string) =>
    getOptionLabel(option).toLowerCase().includes(searchValue.toLowerCase()),
  renderOption,
  onChange,
  value = [],
  maxSelected,
  onSearch,
  delay = DEFAULT_SEARCH_DELAY,
  fixedValue = [],
}: AutocompleteMultipleProps<T>) {
  const t = useTranslations('general');
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  // const [selectedOptions, setSelectedOptions] = useState<T[]>(value || []);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const { filteredOptions } = useOptionFiltering({
    options,
    searchValue,
    filterOption,
    fixedValue,
    getOptionValue,
  });

  // useEffect(() => {
  //   if (value) {
  //     setSelectedOptions(value);
  //   }
  // }, [value]);

  const handleSelectOptions = useCallback(
    (currentValue: T) => {
      if (maxSelected && value?.length >= maxSelected) {
        return;
      }

      const isFixed = fixedValue?.includes(getOptionValue(currentValue));
      if (isFixed) {
        return;
      }

      const isSelected = value?.some(selected => getOptionValue(selected) === getOptionValue(currentValue));

      let newOptions: T[];
      if (isSelected) {
        newOptions = value?.filter(selected => getOptionValue(selected) !== getOptionValue(currentValue));
      } else {
        if (maxSelected && value?.length >= maxSelected) {
          return;
        }
        newOptions = [...value, currentValue];
      }

      onChange?.(newOptions);
      setSearchValue('');
      inputRef.current?.focus();
    },
    [maxSelected, value, fixedValue, getOptionValue, onChange]
  );

  const handleClearOption = useCallback(
    (option: T) => {
      if (fixedValue.includes(getOptionValue(option))) {
        return;
      }

      const newSelected = value.filter(item => getOptionValue(item) !== getOptionValue(option));
      onChange?.(newSelected);
      inputRef.current?.focus();
    },
    [onChange, value, fixedValue, getOptionValue]
  );

  const handleClearAll = useCallback(() => {
    const remainingOptions = value.filter(option => fixedValue.includes(getOptionValue(option)));
    onChange?.(remainingOptions);
    inputRef.current?.focus();
  }, [onChange, value, fixedValue, getOptionValue]);

  const debouncedSearch = useDebouncedCallback(
    useCallback(
      (value: string) => {
        setLoading(true);
        onSearch?.(value);
        setLoading(false);
      },
      [onSearch]
    ),
    delay
  );

  const handleSearch = useCallback(
    (value: string) => {
      setOpen(true);
      setSearchValue(value);
      if (onSearch) {
        debouncedSearch(value);
      }
    },
    [onSearch, debouncedSearch]
  );

  const renderCommandItem = useCallback(
    (option: T) => {
      const isFixed = fixedValue.includes(getOptionValue(option));

      return (
        <CommandItem
          key={getOptionValue(option)}
          value={String(getOptionValue(option))}
          onSelect={() => handleSelectOptions(option)}
          disabled={disabled || isFixed}
          className={cn(isFixed && 'bg-muted opacity-70')}
          style={{
            height: `${ITEM_HEIGHT}px`,
          }}
        >
          <Check
            className={cn(
              'mr-2 h-4 w-4',
              value.some(s => getOptionValue(s) === getOptionValue(option)) ? 'opacity-100' : 'opacity-0'
            )}
          />
          {renderOption ? renderOption(option) : getOptionLabel(option)}
        </CommandItem>
      );
    },
    [value, disabled, fixedValue, getOptionValue, getOptionLabel, handleSelectOptions, renderOption]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'flex min-h-11 items-center rounded-md border border-input text-sm',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          onClick={() => !disabled && inputRef.current?.focus()}
          style={{ width }}
          onKeyDown={() => {
            void 0;
          }}
        >
          <div className="flex flex-grow flex-wrap items-center gap-1 p-2">
            {value
              .sort((a, b) => {
                const aIsFixed = fixedValue.includes(getOptionValue(a));
                const bIsFixed = fixedValue.includes(getOptionValue(b));
                if (aIsFixed && !bIsFixed) {
                  return -1;
                }
                if (!aIsFixed && bIsFixed) {
                  return 1;
                }
                return 0;
              })
              .map(option => (
                <OptionBadge
                  key={getOptionValue(option)}
                  label={getOptionLabel(option)}
                  disabled={disabled}
                  isFixed={fixedValue.includes(getOptionValue(option))}
                  onRemove={() => handleClearOption(option)}
                />
              ))}
            <Input
              ref={inputRef}
              className="h-auto min-w-20 flex-1 border-none p-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder={placeholder ?? `${t('search')}...`}
              onChange={e => handleSearch(e.target.value)}
              value={searchValue}
              disabled={disabled}
              name="search"
            />
          </div>
          {!disabled && value.length > 0 && (
            <Button
              type="button"
              onClick={e => {
                e.stopPropagation();
                handleClearAll();
              }}
              variant="ghost"
              className="h-10 w-10 shrink-0 p-0"
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={e => e.preventDefault()}
        className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0"
      >
        <VirtualizedCommandBase
          height={height}
          options={filteredOptions}
          loading={loading}
          renderItem={renderCommandItem}
        />
      </PopoverContent>
    </Popover>
  );
}
