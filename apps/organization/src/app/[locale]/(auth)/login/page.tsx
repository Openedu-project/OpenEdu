import { getThemeConfigServer } from "@oe/api";
import { LoginPage } from "@oe/ui";
import { getBannerByPageKey } from "../_utils/functions";

export default async function Login() {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);
  const themeName = themeSystem?.[0]?.value?.activedTheme;

  if (!themeSystem?.[0]?.value) {
    return <LoginPage />;
  }

  return (
    <LoginPage
      themeName={themeName}
      banner={getBannerByPageKey("login", themeSystem?.[0]?.value)}
    />
  );
}
