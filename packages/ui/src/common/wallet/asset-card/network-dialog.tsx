import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "#shadcn/dialog";
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";
import useWalletBase from "@oe/api/hooks/useWalletBase";
import { copyToClipboard, shortenAddress } from "#utils/utils";
import Image from "next/image";
import { Copy } from "lucide-react";
import { CHAIN_DATA_INFO, CHAIN_LOGOS, getExplorerLink } from "#utils/wallet";
import { CHAIN, CURRENCY_SYMBOLS } from "@oe/api/utils/wallet";

interface NetworkDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface NetworkItemProps {
  chainSymbol: string;
  chainName: string;
  logoSrc: string;
  address: string;
  onCopyClick: (
    address: string
  ) => (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

const NetworkItem: React.FC<NetworkItemProps> = ({
  chainSymbol,
  chainName,
  logoSrc,
  address,
  onCopyClick,
}) => {
  return (
    <div className="m-0 flex items-center justify-between gap-3">
      <div className="flex gap-3">
        <div className="h-12 w-12 rounded-full bg-slate-200">
          <div className="relative h-full w-full">
            <Image src={logoSrc} fill alt={chainName} />
          </div>
        </div>

        <div>
          <h3 className="mb-0 font-semibold text-xl leading-6">{chainName}</h3>
          <div className="inline-flex gap-3">
            <a
              className="cursor-pointer text-[#2C2C2C] text-sm underline"
              target="_blank"
              href={getExplorerLink(chainSymbol, "address", address)}
              rel="noreferrer"
            >
              {shortenAddress(address, 10, 10)}
            </a>
          </div>
        </div>
      </div>

      <Copy onClick={onCopyClick(address)} className="h-5 w-5 cursor-pointer" />
    </div>
  );
};

const NetworkDialogItem = React.memo(() => {
  const tToast = useTranslations("toast");
  const { wallets } = useWalletBase();

  const handleCopyClick = useCallback(
    (address: string) => (e: React.MouseEvent<SVGElement, MouseEvent>) => {
      e.preventDefault();
      copyToClipboard(address, tToast("copyToClipboard"));
    },
    [tToast]
  );

  const nearWallet = wallets.find(
    (wallet) => wallet.currency === CURRENCY_SYMBOLS.NEAR
  );
  const availWallet = wallets.find(
    (wallet) => wallet.currency === CURRENCY_SYMBOLS.AVAIL
  );

  return (
    <>
      {nearWallet?.address && (
        <NetworkItem
          chainSymbol={CHAIN.NEAR}
          chainName={CHAIN_DATA_INFO[CHAIN.NEAR]?.name || "NEAR"}
          logoSrc={CHAIN_LOGOS.near.src}
          address={nearWallet.address}
          onCopyClick={handleCopyClick}
        />
      )}
      {availWallet?.address && (
        <NetworkItem
          chainSymbol={CHAIN.AVAIL}
          chainName={CHAIN_DATA_INFO[CHAIN.AVAIL]?.name || "AVAIL"}
          logoSrc={CHAIN_LOGOS.avail.src}
          address={availWallet.address}
          onCopyClick={handleCopyClick}
        />
      )}
    </>
  );
});

NetworkDialogItem.displayName = "NetworkDialogItem";

const NetworkDialog = ({ isOpen, onOpenChange }: NetworkDialogProps) => {
  const tNetwork = useTranslations("networkDialog");
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="mb-0 font-semibold text-[#2C2C2C] text-[28px] leading-9">
            {tNetwork("title")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            {tNetwork("description")}
          </DialogDescription>
        </DialogHeader>
        <NetworkDialogItem />
      </DialogContent>
    </Dialog>
  );
};

export default NetworkDialog;
