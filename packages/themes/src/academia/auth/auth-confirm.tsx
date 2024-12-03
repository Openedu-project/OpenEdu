import { AuthConfirmPage } from "@oe/ui/common/auth/auth-confirm-page";
import type { FileType } from "@oe/ui/components/uploader";
import type { SectionComponent } from "../../_types/theme-page";

export interface AcademiaAuthLayoutAuthConfirmProps {
  title?: string;
  seperateText?: string;
  slogan?: string;
  banner?: FileType;
}

const AcademiaAuthLayoutAuthConfirm: SectionComponent<
  "auth",
  "authConfirm"
> = ({ props }) => {
  return <AuthConfirmPage banner={props?.banner} />;
};

export default AcademiaAuthLayoutAuthConfirm;
