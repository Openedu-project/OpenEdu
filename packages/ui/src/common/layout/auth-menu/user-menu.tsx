import { ChevronDown, Settings, User } from 'lucide-react';
import { Button } from '#shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '#shadcn/dropdown-menu';

import type { IUser } from '@oe/api/types/user';
import { LogoutButton } from '#common/auth/logout-button';
import { UserAvatar } from '#components/user-avatar';

export function UserMenu({ me }: { me: IUser }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 text-primary-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <UserAvatar src={me?.avatar ?? ''} name={me?.display_name?.length > 0 ? me?.display_name : me?.username} />
          <span>{me?.display_name?.length > 0 ? me?.display_name : me?.username}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
