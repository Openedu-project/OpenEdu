import { useCategories } from '@oe/api/hooks/useCategories';
import { Button } from '@oe/ui/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@oe/ui/shadcn/dropdown-menu';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui/shadcn/form';
import { ChevronDownIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface Option {
  id: string;
  name: string;
}

interface MultiSelectDropdownProps {
  placeholder: string;
  options: Option[];
  values: CategoryValue[];
  onChange: (newValue: CategoryValue[]) => void;
  isLoading?: boolean;
}

const MultiSelectDropdown = ({
  placeholder,
  options,
  values = [],
  onChange,
  isLoading = false,
}: MultiSelectDropdownProps) => {
  const selectedCount = values?.length || 0;
  const displayText = selectedCount > 0 ? `${selectedCount} selected` : placeholder;

  if (isLoading) {
    return (
      <Button variant="outline" className="w-full" disabled>
        Loading...
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex w-full justify-between">
          <p className="truncate text-left">{displayText}</p>
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[300px] w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto">
        {options.length === 0 ? (
          <div className="px-2 py-1 text-muted-foreground text-sm">No options available</div>
        ) : (
          options.map(option => (
            <DropdownMenuCheckboxItem
              key={option.id}
              checked={values?.some(item => item.id === option.id)}
              onCheckedChange={checked => {
                const newValue = checked
                  ? [...values, { id: option.id }]
                  : values.filter(item => item.id !== option.id);
                onChange(newValue);
              }}
            >
              {option.name}
            </DropdownMenuCheckboxItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type CategoryAndLevelProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
};

interface CategoryValue {
  id: string;
}

const CategoryAndLevel = <TFormValues extends FieldValues>({ form }: CategoryAndLevelProps<TFormValues>) => {
  const tLaunchpad = useTranslations('creatorSettingLaunchpad.generalInfo');
  const { categories, categoriesIsLoading } = useCategories({
    type: 'course',
    per_page: '1000',
  });
  const { categories: levels, categoriesIsLoading: levelsIsLoading } = useCategories({
    type: 'level',
    per_page: '1000',
  });

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div>
        <FormField
          control={form.control}
          name={'categories' as Path<TFormValues>}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="font-semibold text-base">{tLaunchpad('category')}</FormLabel>
              <FormControl>
                <MultiSelectDropdown
                  placeholder="Select Category"
                  options={categories?.results || []}
                  values={field.value || []}
                  onChange={field.onChange}
                  isLoading={categoriesIsLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name={'levels' as Path<TFormValues>}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="font-semibold text-base">{tLaunchpad('level')}</FormLabel>
              <FormControl>
                <MultiSelectDropdown
                  placeholder="Select Level"
                  options={levels?.results || []}
                  values={field.value || []}
                  onChange={field.onChange}
                  isLoading={levelsIsLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CategoryAndLevel;
