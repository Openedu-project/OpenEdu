import { EmailVerifyPage } from '@oe/ui/common/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify Email',
};

export default function EmailVerify() {
  return <EmailVerifyPage />;
}
