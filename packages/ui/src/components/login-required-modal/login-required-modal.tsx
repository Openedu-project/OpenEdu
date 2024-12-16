"use client";

import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import type React from "react";

import { AUTH_ROUTES } from "@oe/core/utils/routes";
import { getCurrentRouter } from "@oe/core/utils/utils";
import { Link } from "#common/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "#shadcn/alert-dialog";
import { useLoginRequiredStore } from "./_store";

export const LoginWarningModal = () => {
  const t = useTranslations("loginRequiredModal");
  const { isOpen, hasCancel, setLoginRequiredModal } = useLoginRequiredStore();
  const router = useRouter();

  const handleRedirectLogin = () => {
    router.push(`${AUTH_ROUTES.login}?next=${getCurrentRouter()}`);
    setLoginRequiredModal(false);
  };

  const handleRedirectSignUp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(`${AUTH_ROUTES.signUp}?next=${getCurrentRouter()}`);

    setLoginRequiredModal(false);
  };

  const handleOpenChange = (open: boolean) => {
    setLoginRequiredModal(open);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col items-center">
          <AlertTriangle className="mb-4 h-12 w-12 animate-pulse text-yellow-500" />
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("desc")}
            <Link
              href={`${AUTH_ROUTES.signUp}?next=${getCurrentRouter()}`}
              onClick={handleRedirectSignUp}
              className="ml-1 p-0 text-primary hover:underline"
            >
              {t("signupLinkText")}
            </Link>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {hasCancel && (
            <AlertDialogCancel onClick={() => setLoginRequiredModal(false)}>
              {t("cancel")}
            </AlertDialogCancel>
          )}
          <AlertDialogAction onClick={handleRedirectLogin}>
            {t("button")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
