import { getTranslations } from "next-intl/server";
import type { SectionComponent } from "../../../_types/theme-page";
import VbiPartnersFeaturesBase from "./vbi-features";

const VbiHomepageFeaturesServer: SectionComponent<
  "partners",
  "vbiPartnerFeatures"
> = async (props) => {
  const t = await getTranslations("themePage.vbi.partners.vbiPartnerFeatures");
  return <VbiPartnersFeaturesBase {...props} t={t} />;
};

export default VbiHomepageFeaturesServer;
