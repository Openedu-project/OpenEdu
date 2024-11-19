'use client';

import { GoogleIcon } from '@oe/assets/icons/google-icon';
import { AUTH_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';

export default function AuthSocial() {
  return (
    <div className="mt-6 grid gap-3">
      {/* <Button variant="outline" onClick={() => console.log('Facebook login')}>
        Facebook
      </Button> */}
      <Link
        href={`http://localhost:3000${AUTH_ROUTES.socialLogin}?provider=${'google'}&redirect_url=${encodeURIComponent(window.location.origin)}&referrer=${encodeURIComponent(
          window.location.host
        )}`}
        className="p-0"
      >
        {/* <Button
              leftSection={<Google />}
              variant="outline"
              className="w-full"
              type="button"
              // onClick={e => {
              //   e.preventDefault();
              //   handleSocialLogin('google');
              // }}
            >
              {t('google')}
            </Button> */}
        <Button
          variant="outline"
          onClick={() => console.log('Google login')}
          className="flex h-12 w-full justify-start gap-2 p-[5px] text-[#5D5A6F]"
        >
          <GoogleIcon width={36} height={36} /> <span className="giant-iheading-regular16">Signin with google</span>
        </Button>
      </Link>
    </div>
  );
}
