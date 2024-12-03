'use client';

import { ADMIN_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';
import { CircleArrowLeft } from 'lucide-react';

import { useRouter } from 'next/navigation';
import type { ThemeConfigKey } from '../../_types';
import { MenuToggleGroup } from './menu-toggle-group';

export default function ThemeHeaderContent({ configKey }: { configKey: ThemeConfigKey }) {
  const router = useRouter();

  const handleSelectedThemeConfigKey = (configKey: ThemeConfigKey) => {
    router.push(`createAPIUrl({ endpoint: ADMIN_ROUTES.themeDetail, params: { themeName: name } })/${configKey}`);
  };

  return (
    <>
      <Button title="Back to Dashboard" size="sm" variant="ghost">
        <Link href={ADMIN_ROUTES.themesSettings} className="border-none hover:bg-transparent">
          <CircleArrowLeft focusable="false" size={20} />
        </Link>
      </Button>

      {/* <PageSelector selectedPage={selectedPage} onPageChange={handlePageChange} /> */}

      <MenuToggleGroup selectedThemeConfigKey={configKey} onMenuChange={handleSelectedThemeConfigKey} />
    </>
  );
}
