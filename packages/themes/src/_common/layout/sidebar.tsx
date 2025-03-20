import { getThemeConfigServer } from '@oe/api/services/theme';
import OutlineThemeSidebar from './outline-theme-sidebar';

export default async function ThemeLayoutSidebar() {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);

  return <OutlineThemeSidebar themeSystem={themeSystem?.[0]?.value} />;
}
