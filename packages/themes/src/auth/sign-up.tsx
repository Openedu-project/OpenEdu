import type { FileType } from '@oe/ui';
import { SignUpPage } from '@oe/ui';
import type { SectionComponent } from '../_types/theme-page';

export interface AuthLayoutSignUpProps {
  title?: string;
  seperateText?: string;
  slogan?: string;
  banner?: FileType;
}

const AuthLayoutSignUp: SectionComponent<'auth', 'signUp'> = ({ props }) => {
  return <SignUpPage banner={props?.banner} />;
};

export { AuthLayoutSignUp };
