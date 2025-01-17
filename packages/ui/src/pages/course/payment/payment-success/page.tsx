"use client";

import { useGetCourseOutline } from "@oe/api/hooks/useCourse";
import { buttonVariants } from "@oe/ui/shadcn/button";
import { Card, CardContent } from "@oe/ui/shadcn/card";
import { LifeBuoy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

import { createAPIUrl } from "@oe/api/utils/fetch";
import Icon from "@oe/assets/images/payment/icon-payment-success.svg";
import { PLATFORM_ROUTES } from "@oe/core/utils/routes";
import type React from "react";
import { Link } from "#common/navigation";
import { Image } from "#components/image";
import { cn } from "#utils/cn";

export default function PaymentSuccess() {
  const t = useTranslations("coursePayment.paymentSuccess");
  const tPaymentFailed = useTranslations("coursePayment.paymentFailed");

  const router = useRouter();
  const { slug } = useParams();
  const { course: courseOutlineData, mutateCourse: mutateCourseOutline } =
    useGetCourseOutline(slug as string);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    void mutateCourseOutline();
    router.replace(
      createAPIUrl({
        endpoint: PLATFORM_ROUTES.courseDetail,
        params: { slug },
      })
    );
  };

  const supportChannel =
    courseOutlineData?.props?.support_channel?.channels?.[0];

  return (
    <Card className="mx-auto my-12 w-full text-center md:w-[440px]">
      <CardContent className="pt-6">
        <div className="mx-auto mb-6 flex max-w-[200px] justify-center rounded-full p-4">
          <Image src={Icon.src} height={200} width={200} alt="success-icon" />
        </div>
        <h2 className="giant-iheading-semibold28 mb-6">{t("title")}</h2>
        <p className="mcaption-regular14 mb-6 text-[#2C2C2C]">{t("message")}</p>

        <div className="mt-6 flex justify-center space-x-4">
          {supportChannel && (
            <a
              href={supportChannel}
              target="_blank"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "flex max-w-[180px] gap-1 text-muted-foreground"
              )}
              rel="noreferrer"
            >
              <LifeBuoy />
              {tPaymentFailed("supportButton")}
            </a>
          )}
          <Link
            href={PLATFORM_ROUTES.homepage}
            onClick={(e) => handleClick(e)}
            className={cn(
              buttonVariants({ variant: "default" }),
              "max-w-[200px] text-primary-foreground"
            )}
          >
            {t("button")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
