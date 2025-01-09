import useWalletBase from "@oe/api/hooks/useWalletBase";
import useNearTokens from "@oe/api/hooks/useNearTokens";
import useAvailBalance from "@oe/api/hooks/useAvailBalance";
import { ASSET_TYPES, CHAIN } from "@oe/api/utils/wallet";
import { useMemo } from "react";
import { TTokenBalances } from "@oe/api/types/wallet";

export const useTokenBalances = () => {
  const { wallets } = useWalletBase();

  const nearWallet = useMemo(
    () =>
      wallets.find(
        (w) => w.type === ASSET_TYPES.CRYPTO && w.network === CHAIN.NEAR
      ),
    [wallets]
  );

  const availWallet = useMemo(
    () =>
      wallets.find(
        (w) => w.type === ASSET_TYPES.CRYPTO && w.network === CHAIN.AVAIL
      ),
    [wallets]
  );

  const { nearTokens, isLoading: isNearLoading } = useNearTokens(
    nearWallet?.address || null
  );
  const { availBalance, isLoading: isAvailLoading } = useAvailBalance(
    availWallet?.address || null
  );

  const tokenBalances = useMemo(() => {
    if (!nearTokens) return null;

    return {
      ...nearTokens,
      tokens: {
        ...nearTokens.tokens,
        AVAIL: {
          balance: availBalance,
        },
      },
    } as TTokenBalances;
  }, [nearTokens, availBalance]);

  return {
    tokenBalances,
    isLoading: isNearLoading || isAvailLoading,
  };
};
