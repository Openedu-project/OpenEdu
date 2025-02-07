// import { CommandInput } from 'cmdk';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Spinner } from '#components/spinner';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from '#shadcn/command';
import { ITEM_HEIGHT } from './constants';

export interface VirtualizedCommandBaseProps<T> {
  height: string;
  options: T[];
  loading?: boolean;
  showSearch?: boolean;
  searchValue?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
  renderItem: (option: T) => ReactNode;
}

export function VirtualizedCommandBase<T>({
  height,
  options,
  loading = false,
  showSearch = false,
  searchValue = '',
  placeholder,
  onSearch,
  renderItem,
}: VirtualizedCommandBaseProps<T>) {
  const t = useTranslations('general');
  const listHeight = Math.min(Number.parseInt(height, 10), options.length * ITEM_HEIGHT);

  return (
    <Command shouldFilter={false}>
      {showSearch ? (
        <CommandInput
          name="search"
          value={searchValue}
          onValueChange={onSearch}
          placeholder={placeholder ?? `${t('search')}...`}
        />
      ) : (
        <CommandInput name="search" className="hidden" wrapperClassName="hidden" />
      )}
      <CommandList>
        <CommandEmpty>{loading ? <Spinner backdrop={false} /> : t('noItemFound')}</CommandEmpty>
        <CommandGroup
          style={{
            height: `${listHeight}px`,
            width: '100%',
            overflow: 'auto',
          }}
          className="p-0"
        >
          <Virtuoso
            style={{ height: `${listHeight}px` }}
            totalCount={options.length}
            itemSize={() => ITEM_HEIGHT}
            overscan={5}
            data={options}
            itemContent={(_, option) => renderItem(option)}
            className="scrollbar"
          />
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
