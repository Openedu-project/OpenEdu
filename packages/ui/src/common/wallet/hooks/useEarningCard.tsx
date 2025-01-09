import useExchangeRates from "@oe/api/hooks/useExchangeRates";
import useWalletBase from "@oe/api/hooks/useWalletBase";
import { useMemo } from "react";
import { calculateEarnings } from "@oe/api/utils/wallet-calculations";

export const useEarningCard = () => {
  const { wallets, isLoading: isWalletsLoading } = useWalletBase();
  const { exchangeRates, isLoading: isRatesLoading } = useExchangeRates();

  const earnings = useMemo(() => {
    if (!wallets || !exchangeRates) return null;
    const earningValue = calculateEarnings(wallets, exchangeRates);
    return earningValue;
  }, [wallets, exchangeRates]);

  return {
    earnings,
    isLoading: isWalletsLoading || isRatesLoading,
  };
};
