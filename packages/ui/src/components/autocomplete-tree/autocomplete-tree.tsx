import { Check, ChevronsUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '#shadcn/button';
import { CommandItem } from '#shadcn/command';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';
import { cn } from '#utils/cn';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, ITEM_HEIGHT } from '../autocomplete/constants';
import { VirtualizedCommandBase } from '../autocomplete/virtualized-command-base';
import type { FlattenedItem, TreeItem } from '../sortable-tree/types';
import { flattenTree } from '../sortable-tree/utilities';
import type { AutocompleteTreeProps } from './types';

export function AutocompleteTree({
  options,
  searchPlaceholder,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  showSearch = true,
  value,
  onChange,
  getOptionLabel = option => option.title,
  getOptionValue = option => option.id,
  filterOption = (option, searchValue) => option.title.toLowerCase().includes(searchValue.toLowerCase()),
  renderOption,
}: AutocompleteTreeProps) {
  const t = useTranslations('general');
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TreeItem | null>(null);
  const [searchValue, setSearchValue] = useState('');

  const flattenedItems = useMemo(() => flattenTree(options), [options]);

  const filteredOptions = useMemo(() => {
    if (!searchValue) {
      return flattenedItems;
    }
    return flattenedItems.filter(option => filterOption(option, searchValue));
  }, [flattenedItems, filterOption, searchValue]);

  useEffect(() => {
    setSelectedOption(value || null);
  }, [value]);

  const handleSelectOption = useCallback(
    (option: TreeItem) => {
      const newValue = selectedOption && getOptionValue(selectedOption) === getOptionValue(option) ? null : option;
      setSelectedOption(newValue);
      setSearchValue('');
      setOpen(false);
      onChange?.(newValue);
    },
    [selectedOption, getOptionValue, onChange]
  );

  const renderCommandItem = useCallback(
    (option: FlattenedItem) => (
      <CommandItem
        key={getOptionValue(option)}
        value={String(getOptionValue(option))}
        onSelect={() => handleSelectOption(option)}
        style={{
          height: `${ITEM_HEIGHT}px`,
          paddingLeft: `${(option.depth || 0) * 20 + 12}px`,
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
        <Button variant="outline" aria-expanded={open} className="justify-between" style={{ width }}>
          {selectedOption ? getOptionLabel(selectedOption) : (searchPlaceholder ?? `${t('search')}...`)}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
        <VirtualizedCommandBase
          height={height}
          options={filteredOptions}
          showSearch={showSearch}
          searchValue={searchValue}
          placeholder={searchPlaceholder}
          onSearch={setSearchValue}
          renderItem={renderCommandItem}
        />
      </PopoverContent>
    </Popover>
  );
}
