import type { FileType } from '@oe/ui';
import { ForgotPasswordPage } from '@oe/ui';
import type { SectionComponent } from '../_types/theme-page';

export interface AuthLayoutForgotPasswordProps {
  title?: string;
  seperateText?: string;
  slogan?: string;
  banner?: FileType;
}

const AuthLayoutForgotPassword: SectionComponent<'auth', 'forgotPassword'> = ({ props }) => {
  return <ForgotPasswordPage banner={props?.banner} />;
};

export { AuthLayoutForgotPassword };
