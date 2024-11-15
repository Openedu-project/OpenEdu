import { getMeServiceWithoutError } from '@oe/api/services/auth';
import { Bell } from 'lucide-react';
import { Button } from '#shadcn/button';
import { AuthButtons } from './auth-buttons';
import { UserMenu } from './user-menu';

export async function AuthMenu() {
  const start = performance.now();
  const me = await getMeServiceWithoutError();
  const end = performance.now();
  console.info(`==========getMeServiceWithoutError took ${end - start}ms==========`);

  return (
    <div className="ml-auto flex items-center space-x-2">
      {me ? (
        <>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <UserMenu me={me} />
        </>
      ) : (
        <AuthButtons />
      )}
    </div>
  );
}
