import { getThemeConfigServer } from "@oe/api";
import { AuthConfirmPage } from "@oe/ui";
import { getBannerByPageKey } from "../_utils/functions";

export default async function AuthConfirm() {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);
  const themeName = themeSystem?.[0]?.value?.activedTheme;

  if (!themeSystem?.[0]?.value) {
    return <AuthConfirmPage />;
  }

  return (
    <AuthConfirmPage
      themeName={themeName}
      banner={getBannerByPageKey("authConfirm", themeSystem?.[0]?.value)}
    />
  );
}
