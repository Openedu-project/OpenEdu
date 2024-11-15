'use client';

import { Button } from '@oe/ui/shadcn/button';

export default function AuthSocial() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      <Button variant="outline" onClick={() => console.log('Facebook login')}>
        Facebook
      </Button>
      <Button variant="outline" onClick={() => console.log('Google login')}>
        Google
      </Button>
    </div>
  );
}
