import { getThemeConfigServer } from '@oe/api/services/theme';
import ThemeListPage from '@oe/dashboard/admin/site-settings/themes/page';

export default async function ThemePage() {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);

  if (!themeSystem?.[0]?.value) {
    return null;
  }
  return (
    <>
      <ThemeListPage themeSystem={themeSystem?.[0]?.value} />
    </>
  );
}
