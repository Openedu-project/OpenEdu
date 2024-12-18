import type { TChainData } from '@oe/api/types/wallet';
import { CHAIN, CURRENCY_SYMBOLS, type TChain, type TCurrencySymbol } from '@oe/api/utils/wallet';
import availLogo from '@oe/assets/images/icons/avail-icon.png';
import nearLogo from '@oe/assets/images/icons/near-icon.png';
import usdLogo from '@oe/assets/images/icons/usd-icon.png';
import usdcLogo from '@oe/assets/images/icons/usdc-icon.png';
import usdtLogo from '@oe/assets/images/icons/usdt-icon.png';
import vndLogo from '@oe/assets/images/icons/vnd-icon.png';
// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import type { StaticImageData } from 'next/image';

// For transaction
// const txLink = getExplorerLink(CHAIN.NEAR, 'transaction', '0x123...');
// For address
// const addressLink = getExplorerLink(CHAIN.AVAIL, 'address', '0xabc...');
export const getExplorerLink = (
  network: keyof typeof CHAIN_DATA_INFO,
  type: 'address' | 'transaction',
  hash: string
): string => {
  const chainInfo = CHAIN_DATA_INFO[network];
  if (!chainInfo) {
    return '';
  }

  const explorerBase = type === 'address' ? chainInfo.explorerAddr : chainInfo.explorerTx;

  return `${explorerBase}/${hash}`;
};

export const CURRENCY_LOGOS: Partial<Record<TCurrencySymbol, StaticImageData>> = {
  [CURRENCY_SYMBOLS.AVAIL]: availLogo,
  [CURRENCY_SYMBOLS.NEAR]: nearLogo,
  [CURRENCY_SYMBOLS.USD]: usdLogo,
  [CURRENCY_SYMBOLS.USDC]: usdcLogo,
  [CURRENCY_SYMBOLS.USDT]: usdtLogo,
  [CURRENCY_SYMBOLS.VND]: vndLogo,
};

export const CHAIN_LOGOS: Record<TChain, StaticImageData> = {
  [CHAIN.AVAIL]: availLogo,
  [CHAIN.NEAR]: nearLogo,
  [CHAIN.ETHEREUM]: nearLogo,
};

export const FORM_STYLES = {
  LABEL: 'text-[16px] leading-5 font-semibold text-[#424242] border-[#DBDBDB]',
  SELECT_TRIGGER: 'text-[16px] font-normal leading-5 capitalize p-4 h-fit rounded-lg text-left',
  INPUT: 'text-[16px] font-normal leading-5 p-4 h-fit rounded-lg border-[#DBDBDB]',
} as const;

// biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
export const CHAIN_DATA_INFO: { [key: string]: TChainData['chainName'] } = {
  [CHAIN.NEAR]: {
    symbol: CHAIN.NEAR,
    name: 'Near Protocol',
    explorerTx: 'https://nearblocks.io/txns',
    explorerAddr: 'https://nearblocks.io/address',
  },
  [CHAIN.ETHEREUM]: {
    symbol: CHAIN.ETHEREUM,
    name: 'Ethereum',
    explorerTx: 'https://etherscan.io/tx',
    explorerAddr: 'https://etherscan.io/address',
  },
  [CHAIN.AVAIL]: {
    symbol: CHAIN.AVAIL,
    name: 'Avail DA Mainnet',
    explorerTx: 'https://avail.subscan.io/extrinsic',
    explorerAddr: 'https://avail.subscan.io/account',
  },
};
