import { getThemeConfigServer } from "@oe/api";
import { EmailVerifyPage } from "@oe/ui";
import type { Metadata } from "next";
import { getBannerByPageKey } from "../_utils/functions";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default async function EmailVerify() {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);
  const themeName = themeSystem?.[0]?.value?.activedTheme;

  if (!themeSystem?.[0]?.value) {
    return <EmailVerifyPage />;
  }
  return (
    <EmailVerifyPage
      themeName={themeName}
      banner={getBannerByPageKey("emailVerify", themeSystem?.[0]?.value)}
    />
  );
}
