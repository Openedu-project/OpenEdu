import { getThemeConfigServer } from '@oe/api/services/theme';
import { SignUpPage } from '@oe/ui/common/auth/signup';
import { getBannerByPageKey } from '../_utils/functions';

export default async function SignUp() {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);
  const themeName = themeSystem?.[0]?.value?.activedTheme;

  if (!themeSystem?.[0]?.value) {
    return <SignUpPage />;
  }

  return <SignUpPage themeName={themeName} banner={getBannerByPageKey('signUp', themeSystem?.[0]?.value)} />;
}
