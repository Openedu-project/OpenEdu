import { cn } from "@oe/ui/utils/cn";
import { useTranslations } from "next-intl";
import type { SectionComponent } from "../../../_types/theme-page";
import {
  InfoSection,
  type InfoSectionProps,
} from "../../_components/info-section";

export interface VbiPartnersListProps extends InfoSectionProps {}

const VbiPartnersList: SectionComponent<"partners", "vbiPartnerList"> = ({
  className,
}) => {
  const t = useTranslations("themePage.vbi.partners.vbiPartnerList");

  return (
    <div
      className={cn(
        "min-h-screen space-y-4 bg-muted p-4 md:space-y-8 md:p-8 lg:p-12",
        className
      )}
    >
      <InfoSection
        title={t("title")}
        titleSub={t("titleSub")}
        button={undefined}
        className="flex flex-col items-center text-center"
      />
    </div>
  );
};

export default VbiPartnersList;
