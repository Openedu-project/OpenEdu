import { StatusBadge } from '@oe/ui/components/status-badge';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { CopyIcon, Trash2 } from 'lucide-react';
import { MenuIcon } from 'lucide-react';
import { useOutlineStore } from '../_store/useOutlineStore';

export default function SectionHeader() {
  const { openSectionDrawer, activeSegment, setOpenSectionDrawer } = useOutlineStore();

  return (
    <div className="flex items-center gap-4 rounded-md border bg-background p-2">
      <div className="flex flex-1 items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setOpenSectionDrawer(!openSectionDrawer)}>
          <MenuIcon className="h-4 w-4" />
        </Button>
        <FormFieldWithLabel name="title" formMessageClassName="hidden" className="w-full">
          <Input type="text" className="h-8" />
        </FormFieldWithLabel>
      </div>
      <div className="flex items-center gap-2">
        {activeSegment?.status && <StatusBadge status={activeSegment?.status} />}
        <Button variant="outline" size="xs">
          <CopyIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="xs">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
