"use client";

import { Check, ChevronDown } from "lucide-react";
import type React from "react";
import { memo, useCallback, useMemo } from "react";

import { ASSET_TYPES, CHAIN, type TChain } from "@oe/api/utils/wallet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@oe/ui/shadcn/dialog";
import { cn } from "@oe/ui/utils/cn";
import { useTranslations } from "next-intl";
import useWalletBase from "@oe/api/hooks/useWalletBase";
import { useDepositChainStore } from "../stores/deposit-chain-store";
import { CHAIN_DATA_INFO } from "#utils/wallet";
import AlertBlock from "../shared/alert-block";

type ChoosingBlockParams = {
  isChosen?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

const ChoosingBlock = memo(
  ({ isChosen, children, onClick }: ChoosingBlockParams) => (
    <button
      type="button"
      className={cn(
        "w-full relative block cursor-pointer overflow-hidden rounded-[8px] border p-4 font-normal text-[#2C2C2C] text-base leading-5",
        isChosen && "border-[#6368DC]"
      )}
      onClick={onClick}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
    >
      {children}
      {isChosen && (
        <div className="absolute top-0 right-0 rounded-bl-md bg-[#6368DC] p-1">
          <Check className="h-4 w-4 text-white" />
        </div>
      )}
    </button>
  )
);

ChoosingBlock.displayName = "ChoosingBlock";

const NetworkDialogTrigger = memo(() => {
  const { isLoading } = useWalletBase({ isRefresh: false });
  const chosenChain = useDepositChainStore((state) => state.chosenChain);
  const t = useTranslations("walletPage");

  return (
    <div className="space-y-3">
      <span className="font-semibold text-[#424242] text-[16px] leading-5">
        {t("network")}
      </span>
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-14 w-full bg-gray-200 rounded-lg"></div>
        </div>
      ) : (
        <DialogTrigger className="w-full">
          <div className="flex cursor-pointer items-center justify-between rounded-lg border border-[#DBDBDB] p-4">
            <span className="font-normal text-[16px] capitalize leading-5">
              {chosenChain?.chain || "Choose Network"}
            </span>
            <ChevronDown />
          </div>
        </DialogTrigger>
      )}
    </div>
  );
});

NetworkDialogTrigger.displayName = "NetworkDialogTrigger";

type ChainKey = keyof typeof CHAIN;

interface ChainData {
  [key: string]: {
    address: string;
  };
}

const NetworkDialogContent = memo(() => {
  const { wallets } = useWalletBase({ isRefresh: false });
  const selectedChain = useDepositChainStore((state) => state.chosenChain);
  const setChosenChain = useDepositChainStore((state) => state.setChosenChain);
  const t = useTranslations("depositPage");

  const chainData = useMemo<ChainData>(() => {
    if (!wallets?.length) return {};

    return wallets
      .filter((w) => w.type === ASSET_TYPES.CRYPTO)
      .reduce(
        (acc, wallet) => ({
          ...acc,
          [wallet.network]: {
            address: wallet.address,
          },
        }),
        {} as ChainData
      );
  }, [wallets]);

  const handleNetworkChange = useCallback(
    (network: ChainKey) => {
      setChosenChain(network as TChain, {
        address: chainData[network]?.address || "",
      });
    },
    [setChosenChain, chainData]
  );

  return (
    <DialogContent className="p-8 sm:rounded-2xl">
      <DialogHeader>
        <DialogTitle className="mb-6 font-semibold text-[24px] leading-[30px]">
          {t("chooseNetwork")}
        </DialogTitle>
        <div className="space-y-3">
          <DialogDescription>
            <AlertBlock>{t("ensureNetwork")}</AlertBlock>
          </DialogDescription>

          {Object.keys(CHAIN_DATA_INFO).map((chain) => {
            const chainInfo = CHAIN_DATA_INFO[chain];

            return (
              <ChoosingBlock
                key={chain}
                isChosen={chain === selectedChain?.chain}
                onClick={() => handleNetworkChange(chain as ChainKey)}
              >
                <span className="mr-1 font-semibold capitalize text-lg">
                  {chainInfo?.symbol}
                </span>
                <span className="opacity-90">{chainInfo?.name}</span>
              </ChoosingBlock>
            );
          })}
        </div>
      </DialogHeader>
    </DialogContent>
  );
});

NetworkDialogContent.displayName = "NetworkDialogContent";

const ChooseNetworkDialog = () => (
  <Dialog>
    <NetworkDialogTrigger />
    <NetworkDialogContent />
  </Dialog>
);

export default ChooseNetworkDialog;
