import type { FileType } from '@oe/ui';
import { EmailVerifyPage } from '@oe/ui';
import type { SectionComponent } from '../_types/theme-page';

export interface AuthLayoutEmailVerifyProps {
  title?: string;
  seperateText?: string;
  slogan?: string;
  banner?: FileType;
}

const AuthLayoutEmailVerify: SectionComponent<'auth', 'emailVerify'> = ({ props }) => {
  return <EmailVerifyPage banner={props?.banner} />;
};

export { AuthLayoutEmailVerify };
