import { getThemeConfigServer } from '@oe/api/services/theme';
import { ForgotPasswordPage } from '@oe/ui/common/auth/forgot-password-page';
import { getBannerByPageKey } from '../_utils/functions';

export default async function ForgotPassword() {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);
  const themeName = themeSystem?.[0]?.value?.activedTheme;

  if (!themeSystem?.[0]?.value) {
    return null;
  }
  return (
    <ForgotPasswordPage themeName={themeName} banner={getBannerByPageKey('forgotPassword', themeSystem?.[0]?.value)} />
  );
}
