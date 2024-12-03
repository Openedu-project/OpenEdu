import { LoginPage } from '@oe/ui/common/auth/login-page';
import type { FileType } from '@oe/ui/components/uploader';
import type { SectionComponent } from '../../_types/theme-page';

export interface AcademiaAuthLayoutLoginProps {
  title?: string;
  seperate?: string;
  slogan?: string;
  banner?: FileType;
}

const AcademiaAuthLayoutLogin: SectionComponent<'auth', 'login'> = ({ props }) => {
  return <LoginPage banner={props?.banner} />;
};

export default AcademiaAuthLayoutLogin;
