import { Button } from '@oe/ui/shadcn/button';
import { cn } from '@oe/ui/utils/cn';
import { Trash } from 'lucide-react';

import type { PagesResultProps } from '../grapesjs';

import { MAIN_BORDER_COLOR } from '../utils';

export default function CustomPageManager({ pages, selected, add, select, remove }: PagesResultProps) {
  const addNewPage = () => {
    const nextIndex = pages.length + 1;

    add({
      name: `New page ${nextIndex}`,
      component: `<h1>Page content ${nextIndex}</h1>`,
    });
  };

  return (
    <div className="gjs-custom-page-manager">
      <div className="p-2">
        <Button onClick={addNewPage} className="w-full">
          Add new page
        </Button>
      </div>
      {pages.map((page, index) => (
        <div
          key={page.getId()}
          className={cn('flex items-center border-b px-4 py-2', index === 0 && 'border-t', MAIN_BORDER_COLOR)}
        >
          <button type="button" className="flex-grow text-left" onClick={() => select(page)}>
            {page.getName() || 'Untitled page'}
          </button>
          {selected !== page && (
            <Button variant="ghost" size="icon" onClick={() => remove(page)}>
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
