import { Button } from '@oe/ui/shadcn/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { cn } from '@oe/ui/utils/cn';
import { Plus, X } from 'lucide-react';

import type { SelectorsResultProps } from '../grapesjs';

import { MAIN_BORDER_COLOR } from '../utils';

export default function CustomSelectorManager({
  selectors,
  selectedState,
  states,
  targets,
  setState,
  addSelector,
  removeSelector,
}: Omit<SelectorsResultProps, 'Container'>) {
  const addNewSelector = () => {
    const next = selectors.length + 1;

    addSelector({ name: `new-${next}`, label: `New ${next}` });
  };

  const targetStr = targets.join(', ');

  return (
    <div className="gjs-custom-selector-manager flex flex-col gap-2 p-2 text-left">
      <div className="flex items-center">
        <div className="flex-grow">Selectors</div>
        <Select value={selectedState} onValueChange={setState}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">- State -</SelectItem>
            {states.map(state => (
              <SelectItem value={state.id as string} key={state.id}>
                {state.getName()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div
        className={cn(
          'flex min-h-[45px] flex-wrap items-center gap-2 rounded border bg-black/30 p-2',
          MAIN_BORDER_COLOR
        )}
      >
        {targetStr ? (
          <Button variant="outline" size="icon" onClick={addNewSelector}>
            <Plus className="h-4 w-4" />
          </Button>
        ) : (
          <div className="opacity-70">Select a component</div>
        )}
        {selectors.map(selector => (
          <div
            key={selector.toString()}
            className="flex items-center gap-1 whitespace-nowrap rounded bg-sky-500 px-2 py-1"
          >
            <div>{selector.getLabel()}</div>
            <Button variant="ghost" size="icon" onClick={() => removeSelector(selector)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div>
        Selected: <span className="opacity-70">{targetStr || 'None'}</span>
      </div>
    </div>
  );
}
