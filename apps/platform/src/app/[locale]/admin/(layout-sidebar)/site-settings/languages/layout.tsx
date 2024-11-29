import type { ReactNode } from 'react';

import LanguagesSettingsLayout from '@oe/dashboard/admin/site-settings/languages/layout';

export default function LanguagesLayout({ children }: { children: ReactNode }) {
  return <LanguagesSettingsLayout>{children}</LanguagesSettingsLayout>;
}
