import { getMeServiceWithoutError } from '@oe/api/services/auth';
import { AuthButtons } from './auth-buttons';
import { NotificationButton } from './notifications/notification-button';
import { UserMenu } from './user-menu';

export async function AuthMenu() {
  const start = performance.now();
  const me = await getMeServiceWithoutError();
  const end = performance.now();
  console.info(`==========getMeServiceWithoutError took ${end - start}ms==========`);

  return (
    <div className="itxems-center ml-auto flex space-x-2">
      {me ? (
        <>
          <NotificationButton />
          <UserMenu me={me} />
        </>
      ) : (
        <AuthButtons />
      )}
    </div>
  );
}
