import { AUTH_ROUTES, buildUrl, copyToClipboard } from "@oe/core";
import type { LanguageCode } from "@oe/i18n";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import { Modal } from "#components/modal";
import { Button } from "#shadcn/button";
import { Label } from "#shadcn/label";

const CopyButton = ({
  value,
  messageSuccess,
}: {
  value: string;
  messageSuccess: string;
}) => (
  <Button
    variant="ghost"
    className="rounded-full p-2 transition-colors hover:bg-neutral-100"
    aria-label="copy to clipboard"
    onClick={() => {
      copyToClipboard(value, messageSuccess);
    }}
  >
    <Copy className="h-5 w-5 text-gray-500" />
  </Button>
);

export async function InviteReferralModal({
  open,
  onClose,
  refCode,
}: {
  open: boolean;
  refCode: string;
  onClose: () => void;
}) {
  const savedLang = (await getLocale()) as LanguageCode;
  const t = useTranslations("referralProgram.inviteFriend.modal");
  const pathName = buildUrl({
    endpoint: `/${savedLang}${AUTH_ROUTES.signUp}`,
    queryParams: {
      next: "/",
      ref_code: refCode,
    },
  });
  const url = `${window.location.origin}${pathName}`;

  return (
    <Modal
      title={t("title")}
      open={open}
      onClose={onClose}
      hasCancelButton={false}
      className="pb-5"
      hasCloseIcon={true}
    >
      <div className="mb-4 mb-6 flex flex-col">
        <Label className="mb-3">{t("yourReferralCode")}</Label>
        <div className="mcaption-regular16 flex h-10 w-full items-center justify-between gap-3 rounded-md border border-input bg-background px-3 py-2 ring-offset-background">
          <p>{refCode}</p>
          <CopyButton value={refCode} messageSuccess={t("copied")} />
        </div>
      </div>
      <div className="mb-4 flex flex-col">
        <Label className="mb-3">{t("referralLink")}</Label>

        <div className="mcaption-regular16 flex h-10 w-full items-center justify-between gap-3 rounded-md border border-input bg-background px-3 py-2 ring-offset-background">
          <p className="line-clamp-1 text-ellipsis">{url}</p>
          <CopyButton value={url} messageSuccess={t("copied")} />
        </div>
      </div>
    </Modal>
  );
}
