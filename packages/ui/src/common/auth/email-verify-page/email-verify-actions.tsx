"use client";

import { API_ENDPOINT, logoutAction } from "@oe/api";
import { resetAllStores } from "@oe/core";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
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
      await Promise.all([
        mutate(API_ENDPOINT.USERS_ME),
        mutate(() => true, undefined, { revalidate: false }),
      ]);
      resetAllStores();
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
