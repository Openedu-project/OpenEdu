import { http, createConfig, getBalance } from '@wagmi/core';
import { baseSepolia } from '@wagmi/core/chains';
import { CURRENCY_SYMBOLS, ETH_TOKEN_CONTRACTS, type TChain, type TCurrencySymbol } from '#utils/wallet';

const BASE_RPC = process.env.NEXT_PUBLIC_BASE_RPC;

export interface BaseTokenBalances {
  address: string;
  tokens: {
    [key in TChain | TCurrencySymbol]: {
      balance: number;
    };
  };
}

const config = createConfig({
  chains: [baseSepolia],

  transports: {
    [baseSepolia.id]: http(BASE_RPC),
  },
});

export async function getBaseTokens(address: string): Promise<BaseTokenBalances> {
  //get ETH balance
  const ethBalance = await getBalance(config, {
    address: address as `0x${string}`,
    chainId: baseSepolia.id,
  });

  //get USDC balance
  const usdcBalance = await getBalance(config, {
    address: address as `0x${string}`,
    chainId: baseSepolia.id,
    token: ETH_TOKEN_CONTRACTS[CURRENCY_SYMBOLS.USDC] as `0x${string}`,
  });

  const defaultTokens: BaseTokenBalances['tokens'] = {
    near: { balance: 0 },
    base: { balance: 0 },
    avail: { balance: 0 },
    VND: { balance: 0 },
    USD: { balance: 0 },
    P: { balance: 0 },
    NEAR: { balance: 0 },
    USDT: { balance: 0 },
    USDC: { balance: Number(usdcBalance.value) / 10 ** usdcBalance.decimals },
    AVAIL: { balance: 0 },
    ETH: {
      balance: Number(ethBalance.value) / 10 ** ethBalance.decimals,
    },
  };

  return {
    address,
    tokens: defaultTokens,
  };
}
