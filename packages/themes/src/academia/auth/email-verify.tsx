import { EmailVerifyPage } from "@oe/ui/common/auth/email-verify-page";
import type { FileType } from "@oe/ui/components/uploader";
import type { SectionComponent } from "../../_types/theme-page";

export interface AcademiaAuthLayoutEmailVerifyProps {
  title?: string;
  seperateText?: string;
  slogan?: string;
  banner?: FileType;
}

const AcademiaAuthLayoutEmailVerify: SectionComponent<
  "auth",
  "emailVerify"
> = ({ props }) => {
  return <EmailVerifyPage banner={props?.banner} />;
};

export default AcademiaAuthLayoutEmailVerify;
