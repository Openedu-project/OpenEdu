"use client";
import { useTranslations } from "next-intl";
import type { SectionComponent } from "../../../_types/theme-page";
import VbiPartnerFeaturesBase from "./vbi-features";

const VbiPartnerFeaturesClient: SectionComponent<
  "partners",
  "vbiPartnerFeatures"
> = (props) => {
  const t = useTranslations("themePage.vbi.partners.vbiPartnerFeatures");
  return <VbiPartnerFeaturesBase {...props} t={t} />;
};

export default VbiPartnerFeaturesClient;
