import { ChevronRight, CircleDollarSign } from "lucide-react";
import { memo, useCallback } from "react";

import usdLogo from "@oe/assets/images/icons/usd-icon.png";
import vndLogo from "@oe/assets/images/icons/vnd-icon.png";

import { cn } from "@oe/ui/utils/cn";
import { useTranslations } from "next-intl";
// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import Image from "next/image";
import { useWalletVisibilityStore } from "../stores/wallet-visibility-store";
import MoreComboboxMenu from "./more-combobox-menu";

const CurrencyToggle = () => {
  const setIsVNDCurrency = useWalletVisibilityStore(
    (state) => state.setIsVNDCurrency
  );
  const isVNDCurrency = useWalletVisibilityStore(
    (state) => state.isVNDCurrency
  );

  const handleSetUSD = useCallback(
    () => setIsVNDCurrency(false),
    [setIsVNDCurrency]
  );
  const handleSetVND = useCallback(
    () => setIsVNDCurrency(true),
    [setIsVNDCurrency]
  );

  const t = useTranslations("walletPage");

  return (
    <MoreComboboxMenu
      side="right"
      triggerBtn={
        <div
          className={cn(
            "inline-flex w-full gap-3 items-center font-semibold text-sm sm:text-base sm:leading-5 cursor-pointer whitespace-nowrap py-3 px-4 hover:bg-[#F2F1FF] active:bg-[#F2F1FF] text-black bg-transparent"
          )}
        >
          <CircleDollarSign />
          {t("currency")}
          <ChevronRight />
        </div>
      }
      items={[
        {
          label: "USD",
          icon: (
            <Image src={usdLogo.src} width={24} height={24} alt="usd logo" />
          ),
          onClick: handleSetUSD,
          isActive: !isVNDCurrency,
        },
        {
          label: "VND",
          icon: (
            <Image src={vndLogo.src} width={24} height={24} alt="vnd logo" />
          ),
          onClick: handleSetVND,
          isActive: isVNDCurrency,
        },
      ]}
    />
  );
};

export default memo(CurrencyToggle);
