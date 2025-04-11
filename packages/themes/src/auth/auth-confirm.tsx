import type { FileType } from '@oe/ui';
import { AuthConfirmPage } from '@oe/ui';
import type { SectionComponent } from '../_types/theme-page';

export interface AuthLayoutAuthConfirmProps {
  title?: string;
  seperateText?: string;
  slogan?: string;
  banner?: FileType;
}

const AuthLayoutAuthConfirm: SectionComponent<'auth', 'authConfirm'> = ({ props }) => {
  return <AuthConfirmPage banner={props?.banner} />;
};

export { AuthLayoutAuthConfirm };
