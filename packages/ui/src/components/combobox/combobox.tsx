'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '#shadcn/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '#shadcn/command';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';
import { cn } from '#utils/cn';

export function Combobox({
  options,
  placeholder,
  searchPlaceholder,
  notFoundText,
  className,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  placeholder?: string;
  searchPlaceholder?: string;
  notFoundText?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const tGeneral = useTranslations('general');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" aria-expanded={open} className={cn('justify-between', className)}>
          {value ? options.find(option => option.value === value)?.label : (placeholder ?? `${tGeneral('select')}...`)}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder ?? `${tGeneral('search')}...`} />
          <CommandList>
            <CommandEmpty>{notFoundText}</CommandEmpty>
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={currentValue => {
                    onChange?.(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  {option.label}
                  <Check className={cn('ml-auto h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
