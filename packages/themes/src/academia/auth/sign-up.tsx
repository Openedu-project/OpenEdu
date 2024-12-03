import { SignUpPage } from '@oe/ui/common/auth/signup';
import type { FileType } from '@oe/ui/components/uploader';
import type { SectionComponent } from '../../_types/theme-page';

export interface AcademiaAuthLayoutSignUpProps {
  title?: string;
  seperateText?: string;
  slogan?: string;
  banner?: FileType;
}

const AcademiaAuthLayoutSignUp: SectionComponent<'auth', 'signUp'> = ({ props }) => {
  return <SignUpPage banner={props?.banner} />;
};

export default AcademiaAuthLayoutSignUp;
