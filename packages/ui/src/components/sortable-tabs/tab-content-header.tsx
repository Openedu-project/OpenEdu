import { Trash2Icon } from 'lucide-react';
import { Button } from '#shadcn/button';
import { Selectbox } from '../selectbox/selectbox';
import type { TabContentHeaderProps } from './types';

export function TabContentHeader({ tab, options, onOptionSelect, onRemove }: TabContentHeaderProps) {
  return (
    <div className="flex items-center justify-between border border-primary bg-muted p-2">
      <div className="flex items-center gap-2">
        <Selectbox
          options={options}
          value={tab.value}
          onChange={value => {
            const selectedOption = options.find(opt => opt.value === value);
            if (selectedOption) {
              onOptionSelect(tab.id, selectedOption);
            }
          }}
          displayValue={value => {
            const option = options.find(opt => opt.value === value);
            return (
              <div className="flex items-center gap-2">
                {option?.icon}
                <span>{option?.label}</span>
              </div>
            );
          }}
          className="h-8 min-w-[200px]"
        />
      </div>
      <Button
        variant="ghost"
        size="xs"
        onClick={() => onRemove(tab.id)}
        className="text-muted-foreground hover:text-foreground"
      >
        <Trash2Icon className="h-4 w-4" />
      </Button>
    </div>
  );
}
