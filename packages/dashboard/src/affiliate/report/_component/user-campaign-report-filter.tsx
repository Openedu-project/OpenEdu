'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@oe/ui';
import { useUserAffiliateReport } from './user-campaign-report-provider';

const options = [
  { value: 'USD', label: 'USD' },
  { value: 'VND', label: 'VND' },
];

export function UserAffiliateReportFilter() {
  const { selectedOption, setSelectedOption } = useUserAffiliateReport();

  return (
    <Select value={selectedOption} onValueChange={setSelectedOption}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
