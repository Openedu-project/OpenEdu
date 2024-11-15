import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { cn } from '@oe/ui/utils/cn';
import type React from 'react';
import { DevicesProvider, WithEditor } from '../grapesjs';

import TopbarButtons from './topbar-buttons';

export default function Topbar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('gjs-top-sidebar flex items-center p-1', className)}>
      <DevicesProvider>
        {({ selected, select, devices }) => (
          <Select value={selected} onValueChange={select}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a device" />
            </SelectTrigger>
            <SelectContent>
              {devices.map(device => (
                <SelectItem value={device.id as string} key={device.id}>
                  {device.getName()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </DevicesProvider>
      <WithEditor>
        <TopbarButtons className="ml-auto px-2" />
      </WithEditor>
    </div>
  );
}
