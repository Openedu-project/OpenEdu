import type React from 'react';
import { memo } from 'react';
import EarningCard from './earning-card';
import NftAndPointCard from './nft-and-point-card';
import EstimatedValueCard from './total-value-card';

const WalletOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <EstimatedValueCard />
      <EarningCard />
      <NftAndPointCard />
    </div>
  );
};

WalletOverview.displayName = 'WalletOverview';

export default memo(WalletOverview);
