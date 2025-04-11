import { getThemeConfigServer } from '@oe/api';
import { OutlineThemeSidebar } from './outline-theme-sidebar';

export async function ThemeLayoutSidebar() {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);

  return <OutlineThemeSidebar themeSystem={themeSystem?.[0]?.value} />;
}
