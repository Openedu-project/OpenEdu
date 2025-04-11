import AIBotImage from "@oe/assets/images/openedu-homepage/ai-assistant.png";
import AIBackground from "@oe/assets/images/openedu-homepage/bg-ai-assistant.png";
import { Button } from "@oe/ui";
import { Image } from "@oe/ui";
import { useTranslations } from "next-intl";

export function AIAssistantSection() {
  const t = useTranslations("homePageLayout.aiAssistantSection");

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 hidden h-full w-full lg:flex">
        <Image
          src={AIBackground.src}
          alt="logo"
          containerHeight={450}
          fill
          className="w-full object-contain"
          priority
        />
      </div>

      <div className="container relative mx-auto px-0 py-5 md:px-4 md:py-10">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 font-bold leading-tight">
              {t("title")}
            </h2>

            <p className="mcaption-regular16 lg:mcaption-regular24">
              {t("description")}
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button className="px-8 py-3">{t("buttons.explore")}</Button>
              <Button variant="secondary">{t("buttons.invite")}</Button>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative mx-auto flex w-full">
              <Image
                src={AIBotImage.src}
                alt="AI Assistant Bot"
                height={368}
                width={564}
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
