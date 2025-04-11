import { IconGift, IconSend2, IconSmsEdit, IconUser2 } from "@oe/assets";
import { getTranslations } from "next-intl/server";
import type { ElementType } from "react";
import type { JSX } from "react";

interface IconProps {
  className?: string;
}

interface StepProps {
  icon: ElementType<IconProps>;
  title: string;
  description: string;
}

const Step = ({ icon: Icon, title, description }: StepProps): JSX.Element => (
  <div className="flex flex-col items-center text-center">
    <div className="mb-2 rounded-full sm:mb-4">
      <Icon className="h-10 w-10" />
    </div>
    <h3 className="mcaption-semibold16 md:mcaption-semibold20 mb-1 sm:mb-2">
      {title}
    </h3>
    <p className="mcaption-regular14 md:mbutton-regular16 leading-tight">
      {description}
    </p>
  </div>
);

export async function InviteReferralProgramHowItWork(): Promise<JSX.Element> {
  const t = await getTranslations("referralProgram.howItWorks");

  const steps: StepProps[] = [
    {
      icon: IconSend2,
      title: t("step1.title"),
      description: t("step1.description"),
    },
    {
      icon: IconUser2,
      title: t("step2.title"),
      description: t("step2.description"),
    },
    {
      icon: IconSmsEdit,
      title: t("step3.title"),
      description: t("step3.description"),
    },
    {
      icon: IconGift,
      title: t("step4.title"),
      description: t("step4.description"),
    },
  ];

  return (
    <section className="mb-6 block rounded-[16px] bg-white p-2 md:p-6">
      {/* How It Works Section */}
      <div className="mb-8 sm:mb-12">
        <h2 className="mcaption-semibold18 md:mcaption-semibold24 mb-1 text-center md:text-left">
          {t("title")}
        </h2>
        <p className="mbutton-regular16 mb-4 text-center sm:mb-6 md:text-left">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 md:grid-cols-4">
          {steps.map((step) => (
            <Step
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
