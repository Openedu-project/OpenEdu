import type { ThemePageKey } from '@oe/themes/types/theme-page';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';

// TODO: config type ThemePageKey
const PAGE_OPTIONS = [
  { value: 'homepage', label: 'Homepage' },
  { value: 'about-us', label: 'About Us' },
] as const;

interface PageSelectorProps {
  selectedPage?: ThemePageKey;
  onPageChange: (page: ThemePageKey) => void;
}

const PageSelector = ({ selectedPage, onPageChange }: PageSelectorProps) => {
  return (
    <Select value={selectedPage} onValueChange={onPageChange}>
      <SelectTrigger className="w-[200px] border-none">
        <SelectValue placeholder="Page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {PAGE_OPTIONS.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

PageSelector.displayName = 'PageSelector';
export { PageSelector, type PageSelectorProps };
