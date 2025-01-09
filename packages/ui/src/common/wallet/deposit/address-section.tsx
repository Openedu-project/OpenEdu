"use client";

import { copyToClipboard } from "@oe/ui/utils/utils";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { useDepositChainStore } from "../stores/deposit-chain-store";

const AddressSection = memo(() => {
  const selectedChain = useDepositChainStore((state) => state.chosenChain);
  const tToast = useTranslations("toast");
  const tWallet = useTranslations("walletPage");

  const handleCopyClick = () => {
    if (selectedChain) {
      copyToClipboard(selectedChain.address, tToast("copyToClipboard"));
    }
  };

  if (!selectedChain) {
    return (
      <div className="space-y-3">
        <span className="font-semibold text-[#424242] text-[16px] leading-5">
          {tWallet("address")}
        </span>
        <div className="flex items-center justify-between rounded-lg border border-[#DBDBDB] p-4">
          <span className="overflow-hidden text-ellipsis font-normal text-[16px] leading-5">
            {tWallet("noAddress")}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <span className="font-semibold text-[#424242] text-[16px] leading-5">
        {tWallet("address")}
      </span>
      <button
        type="button"
        className="w-full flex cursor-pointer items-center justify-between rounded-lg border border-[#050404] p-4"
        onClick={handleCopyClick}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleCopyClick();
          }
        }}
      >
        <span className="overflow-hidden text-ellipsis font-normal text-[16px] leading-5">
          {selectedChain.address}
        </span>
        <Copy />
      </button>
    </div>
  );
});

AddressSection.displayName = "AddressSection";

export default AddressSection;
