"use client";

import { QRCodeSVG } from "qrcode.react";

import { memo } from "react";
import { useDepositChainStore } from "../stores/deposit-chain-store";

const QRCode = memo(() => {
  const selectedChain = useDepositChainStore((state) => state.chosenChain);

  if (!selectedChain) {
    return null;
  }

  return (
    <div className="border h-fit mx-auto p-2 rounded-lg w-fit">
      <QRCodeSVG value={selectedChain.address} size={160} level="H" />
    </div>
  );
});

QRCode.displayName = "QRCode";

export default QRCode;
