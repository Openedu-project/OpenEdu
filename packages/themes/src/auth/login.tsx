import type { FileType } from '@oe/ui';
import { LoginPage } from '@oe/ui';
import type { SectionComponent } from '../_types/theme-page';

export interface AuthLayoutLoginProps {
  title?: string;
  seperate?: string;
  slogan?: string;
  banner?: FileType;
}

const AuthLayoutLogin: SectionComponent<'auth', 'login'> = ({ props }) => {
  return <LoginPage banner={props?.banner} />;
};

export { AuthLayoutLogin };
