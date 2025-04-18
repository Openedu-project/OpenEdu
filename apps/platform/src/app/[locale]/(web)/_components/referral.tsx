import { isLogin } from "@oe/api";
import Ref1 from "@oe/assets/images/openedu-homepage/referral/ref-1.png";
import Ref2 from "@oe/assets/images/openedu-homepage/referral/ref-2.png";
import Ref3 from "@oe/assets/images/openedu-homepage/referral/ref-3.png";
import { PROTECTED_ROUTES } from "@oe/core";

import { Link } from "@oe/ui";
import { Image } from "@oe/ui";
import { MoveRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function ReferralProgramSection() {
  const t = await getTranslations("homePageLayout.referralSection");
  const login = await isLogin();
  return (
    <section className="container relative mx-auto px-0 py-5 md:px-4 md:py-10">
      <div className="flex flex-col items-center justify-center">
        <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-3 text-center">
          {t("title")}
        </h2>
        <div className="mcaption-regular16 lg:mcaption-regular24 flex items-center gap-1 text-center">
          <p>
            {t("description")}
            <Link
              href={PROTECTED_ROUTES.referralProgram}
              className="mcaption-regular16 lg:mcaption-regular24 mb-6 ml-1 inline-flex gap-1 p-0 lg:mb-10"
              disabled={!login}
            >
              {t("discoverReferralProgram")}
              <MoveRight />
            </Link>
          </p>
        </div>
        <div className="mt-4 flex w-full flex-col gap-8 lg:mt-10 lg:flex-row">
          <div className="relative w-full md:min-w-[500px] md:basis-1/2">
            <Image
              src={Ref1.src}
              alt="referral"
              width={554}
              height={582}
              priority
              className="relative z-10 object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"
            />
          </div>
          <div className="flex flex-col gap-8 md:basis-1/2">
            <div>
              <h3 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold28 mb-4 text-center md:mb-8">
                {t.rich("reward", {
                  span: (chunks) => (
                    <span className="bg-gradient-to-br from-[#2CDEE9] via-[#7B5AFF] to-[#7B5AFF] bg-clip-text text-transparent">
                      {chunks}
                    </span>
                  ),
                })}
              </h3>
              <div className="relative w-full">
                <Image
                  src={Ref2.src}
                  alt="referral"
                  width={554}
                  height={582}
                  priority
                  className="relative z-10 object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"
                />
              </div>
            </div>
            <div>
              <h3 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold28 mb-4 text-center md:mb-8">
                {t.rich("easy", {
                  span: (chunks) => (
                    <span className="bg-gradient-to-br from-[#2CDEE9] via-[#7B5AFF] to-[#7B5AFF] bg-clip-text text-transparent">
                      {chunks}
                    </span>
                  ),
                })}
              </h3>
              <div className="relative w-full">
                <Image
                  src={Ref3.src}
                  alt="referral"
                  width={554}
                  height={582}
                  priority
                  className="relative z-10 object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
