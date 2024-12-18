import { QRCodeSVG } from 'qrcode.react';

import { memo } from 'react';
import { useWalletDataStore } from '../../../_store/useWalletDataStore';

const QRCode = memo(() => {
  const chosenChain = useWalletDataStore(state => state.chosenChain);

  if (!chosenChain) {
    return null;
  }

  return (
    <div className="border h-fit mx-auto p-2 rounded-lg w-fit">
      <QRCodeSVG value={chosenChain.address} size={160} level="H" />
    </div>
  );
});

QRCode.displayName = 'QRCode';

export default QRCode;
