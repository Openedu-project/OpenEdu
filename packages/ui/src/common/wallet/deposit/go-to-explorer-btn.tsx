"use client";

import { getExplorerLink } from "#utils/wallet";
import { useDepositChainStore } from "../stores/deposit-chain-store";
import { Button } from "#shadcn/button";
import { useTranslations } from "next-intl";

const GoToExplorerBtn = () => {
  const t = useTranslations("depositPage");
  const selectedChain = useDepositChainStore((state) => state.chosenChain);
  return selectedChain ? (
    <div className="block space-y-2">
      <a
        href={getExplorerLink(
          selectedChain.chain,
          "address",
          selectedChain.address
        )}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="w-full bg-[#5055D7] font-medium text-base text-white">
          {t("viewTxns")}
        </Button>
      </a>
      <Button className="w-full text-base font-medium" variant="outline">
        {t("see")}
        <span className="uppercase mx-1">{selectedChain.chain}</span>
        {t("amountInWallet")}
      </Button>
    </div>
  ) : null;
};

export default GoToExplorerBtn;
