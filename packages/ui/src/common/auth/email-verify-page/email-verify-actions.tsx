"use client";

import { logoutAction } from "@oe/api";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "#shadcn/button";

export function EmailVerifyActions({
  isError,
  nextPath,
  accessToken,
  refreshToken,
}: {
  isError: boolean;
  nextPath: string;
  accessToken: string;
  refreshToken: string;
}) {
  const tGeneral = useTranslations("general");
  const router = useRouter();

  const handleNavigate = async (path: string) => {
    if (!isError && accessToken && refreshToken) {
      await logoutAction();
      router.replace(path);
    }
  };

  return (
    <Button
      variant={isError ? "destructive" : "default"}
      className="w-full"
      onClick={() => handleNavigate(nextPath)}
    >
      {tGeneral("backToPreviousPage")}
    </Button>
  );
}
