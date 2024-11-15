'use client';
import type { ColumnFiltersState } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
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

interface FilterSearchProps {
  filterOptions: FilterOption[];
  className?: string;
  data?: FilterPayload;
  onChange?: (data: FilterPayload) => void;
  onSearch?: (data: FilterPayload) => void;
}

export const FilterSearch = ({ filterOptions = [], className = '', data, onChange, onSearch }: FilterSearchProps) => {
  const t = useTranslations('general');
  const [selectedFilter, setSelectedFilter] = useState<string | boolean | number>(
    data?.filter?.value ?? filterOptions?.[0]?.value ?? ''
  );
  const [searchValue, setSearchValue] = useState<string | boolean | number>(data?.value ?? '');
  const [selectValue, setSelectValue] = useState<string | boolean | number>(data?.value ?? '');

  useEffect(() => {
    if (data?.filter) {
      setSelectedFilter(data.filter.value);
    }
    if (data?.value !== undefined) {
      setSearchValue(data.value);
      setSelectValue(data.value);
    }
  }, [data]);

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    setSearchValue('');
    setSelectValue('');
    const filterOption = filterOptions.find(opt => opt.value === value);
    if (filterOption) {
      onChange?.({ filter: filterOption, value: '' });
      onSearch?.({ filter: filterOption, value: '' });
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const filterOption = filterOptions.find(opt => opt.value === selectedFilter);
    if (filterOption) {
      onChange?.({ filter: filterOption, value: e.target.value });
    }
  };

  const handleSelectChange = (value: string) => {
    setSelectValue(value);
    const filterOption = filterOptions.find(opt => opt.value === selectedFilter);
    if (filterOption) {
      onChange?.({ filter: filterOption, value });
      onSearch?.({ filter: filterOption, value });
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filterOption = filterOptions.find(opt => opt.value === selectedFilter);
    if (filterOption) {
      onSearch?.({ filter: filterOption, value: searchValue });
    }
  };

  const selectedFilterType = filterOptions.find(opt => opt.value === selectedFilter)?.type;
  const selectedFilterOptions = filterOptions.find(opt => opt.value === selectedFilter)?.options;

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
            placeholder={`${t('searchBy')} ${filterOptions.find(opt => opt.value === selectedFilter)?.label.toLowerCase()}...`}
            value={searchValue as string}
            onChange={handleSearchChange}
            className="h-full rounded-l-none pr-10 focus-visible:ring-offset-0"
            name={selectedFilter as string}
          />
          {onSearch ? (
            <Button
              variant="ghost"
              type="submit"
              className="absolute top-[3px] right-[3px] h-[calc(100%-6px)] w-10 p-0 text-muted-foreground"
            >
              <Search className="pointer-events-none h-4 w-4" />
            </Button>
          ) : (
            <Search className="pointer-events-none absolute top-3 right-3 h-4 w-4 text-muted-foreground" />
          )}
        </form>
      ) : (
        <Select value={selectValue as string} onValueChange={handleSelectChange} name={selectedFilter as string}>
          <SelectTrigger className="min-w-[180px] rounded-l-none focus:ring-offset-0">
            <SelectValue
              placeholder={`${t('select')} ${filterOptions.find(opt => opt.value === selectedFilter)?.label.toLowerCase()}...`}
            />
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
