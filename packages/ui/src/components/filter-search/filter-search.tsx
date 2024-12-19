'use client';
import type { ColumnFiltersState } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type ChangeEvent, type FormEvent, useCallback, useEffect, useState } from 'react';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';
import { cn } from '#utils/cn';

export interface SelectOption {
  value: string | boolean | number;
  label: string;
}

export interface CustomFilterPayload extends FilterPayload {
  prev?: ColumnFiltersState;
}

export interface FilterOption {
  id: string | number;
  value: string | boolean | number;
  label: string;
  type: 'search' | 'select';
  options?: SelectOption[];
  global?: boolean;
  customFilter?: (payload: CustomFilterPayload) => void;
}

export interface FilterPayload {
  filter: FilterOption;
  value: string | boolean | number;
}

export interface FilterSearchProps {
  filterOptions: FilterOption[];
  className?: string;
  data?: FilterPayload;
  onSearch?: (data: FilterPayload) => void;
  useQueryParams?: boolean;
}

export const FilterSearch = ({
  filterOptions = [],
  className = '',
  data,
  onSearch,
  useQueryParams = false,
}: FilterSearchProps) => {
  const t = useTranslations('general');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedFilter, setSelectedFilter] = useState<string | boolean | number>('');
  const [searchValue, setSearchValue] = useState<string | boolean | number>('');
  const [selectValue, setSelectValue] = useState<string | boolean | number>('');

  const updateQueryParams = useCallback(
    (filter?: string | null, value?: string | null) => {
      if (!useQueryParams) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());

      if (filter) {
        params.set('filter', filter.toString());
      } else {
        params.delete('filter');
      }

      if (value) {
        params.set('value', value.toString());
      } else {
        params.delete('value');
      }

      const queryString = params.toString();
      router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`);
    },
    [useQueryParams, router, pathname, searchParams]
  );

  useEffect(() => {
    const queryFilter = searchParams.get('filter');
    const queryValue = searchParams.get('value');
    const filterOption = filterOptions.find(opt => opt.value.toString() === queryFilter);

    if (queryFilter && filterOption) {
      setSelectedFilter(queryFilter);
    } else {
      setSelectedFilter(data?.filter?.value ?? filterOptions?.[0]?.value ?? '');
    }

    if (queryFilter && filterOption && queryValue) {
      let convertedValue: string | boolean | number = queryValue;

      if (queryValue === 'true' || queryValue === 'false') {
        convertedValue = queryValue === 'true';
      } else if (!Number.isNaN(Number(queryValue))) {
        convertedValue = Number(queryValue);
      }

      if (filterOption.type === 'search') {
        setSearchValue(convertedValue);
        handleEmitSearch(filterOption, convertedValue);
      } else {
        setSelectValue(convertedValue);
      }
    } else {
      setSearchValue(data?.value ?? '');
      setSelectValue(data?.value ?? '');
    }
  }, [searchParams, filterOptions, data]);

  useEffect(() => {
    const filterOption = filterOptions.find(opt => opt.value === selectedFilter);
    if (selectedFilter && selectValue !== '' && selectedFilter !== undefined && selectValue !== null && filterOption) {
      handleEmitSearch(filterOption, selectValue);
      if (useQueryParams) {
        updateQueryParams(selectedFilter.toString(), selectValue.toString());
      }
    }
  }, [selectedFilter, selectValue, filterOptions, useQueryParams, updateQueryParams]);

  const handleEmitSearch = useCallback(
    (filterOption: FilterOption, value: string | boolean | number) => {
      onSearch?.({ filter: filterOption, value: typeof value === 'string' ? value.trim() : value });
    },
    [onSearch]
  );

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    setSelectValue('');
    setSearchValue('');
    if (useQueryParams) {
      updateQueryParams(value, null);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelectChange = (value: string) => {
    setSelectValue(value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filterOption = filterOptions.find(opt => opt.value === selectedFilter);
    if (filterOption) {
      handleEmitSearch(filterOption, searchValue);
      if (useQueryParams) {
        updateQueryParams(selectedFilter.toString(), searchValue.toString());
      }
    }
  };

  const selectedFilterType = filterOptions.find(opt => opt.value === selectedFilter)?.type;
  const selectedFilterOptions = filterOptions.find(opt => opt.value === selectedFilter)?.options;
  const selectedFilterLabel = filterOptions.find(opt => opt.value === selectedFilter)?.label.toLowerCase() ?? '';

  return (
    <div className={cn('flex', className)}>
      <Select value={selectedFilter as string} onValueChange={handleFilterChange} name="filter">
        <SelectTrigger className="w-[120px] rounded-r-none border-r-0 focus:ring-offset-0">
          <SelectValue placeholder={`${t('filterBy')}...`} />
        </SelectTrigger>
        <SelectContent>
          {filterOptions.map(option => (
            <SelectItem key={option.id ?? option.value} value={option.value as string}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedFilterType === 'search' ? (
        <form onSubmit={handleSearch} className="relative min-w-[180px] flex-1">
          <Input
            placeholder={`${t('searchBy')} ${selectedFilterLabel}...`}
            value={searchValue as string}
            onChange={handleSearchChange}
            className="h-10 rounded-l-none pr-10 focus-visible:ring-offset-0"
            name={selectedFilter as string}
          />
          <Button
            variant="ghost"
            type="submit"
            className="absolute top-[3px] right-[3px] h-[calc(100%-6px)] w-10 p-0 text-muted-foreground"
          >
            <Search className="pointer-events-none h-4 w-4" />
          </Button>
        </form>
      ) : (
        <Select value={selectValue as string} onValueChange={handleSelectChange} name={selectedFilter as string}>
          <SelectTrigger className="min-w-[180px] rounded-l-none focus:ring-offset-0">
            <SelectValue placeholder={`${t('select')} ${selectedFilterLabel}...`} />
          </SelectTrigger>
          <SelectContent>
            {selectedFilterOptions?.map(option => (
              <SelectItem key={option.value.toString()} value={option.value as string}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
