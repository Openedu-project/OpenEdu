import { useWallet } from "@oe/api";
import { type ICryptoWithdrawPayload, cryptoWithdrawSchema } from "@oe/api";
import { tokenSubmitWithdrawService } from "@oe/api";
import type { HTTPError } from "@oe/api";
import {
  CHAIN,
  CURRENCY_SYMBOLS,
  FIAT_CURRENCIES,
  NETWORK_OPTIONS,
  TOKEN_OPTIONS,
} from "@oe/api";
import { formatCurrency } from "@oe/core";
import { FormWrapper } from "#components/form-wrapper";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { Modal } from "#components/modal";
import { Selectbox, type SelectboxOption } from "#components/selectbox";
import { Button } from "#shadcn/button";
import {
  FormControl,
  FormField,
  FormFieldWithLabel,
  FormItem,
  FormLabel,
  FormMessage,
} from "#shadcn/form";
import { Input } from "#shadcn/input";
import { getAvailBalance } from "@oe/api";
import { getNearTokens } from "@oe/api";
import type { TTokenBalances } from "@oe/api";
import { InputCurrency } from "#components/input-currency";

export const calculateAvailableBalance = (
  token: string,
  balance: string
): string => {
  let availableBalance = Number.parseFloat(balance);

  if (token.toLowerCase() === CURRENCY_SYMBOLS.NEAR.toLowerCase()) {
    availableBalance = Math.max(0, availableBalance - 0.05);
  } else if (token.toLowerCase() === CURRENCY_SYMBOLS.AVAIL.toLowerCase()) {
    availableBalance = Math.max(0, availableBalance - 0.13);
  }

  return availableBalance.toFixed(5);
};

export const WithdrawTokenForm = () => {
  const { wallets, mutateWallets } = useWallet();
  const t = useTranslations("wallets");
  const tError = useTranslations("errors");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedWallets, setUpdatedWallets] = useState<typeof wallets | null>(
    null
  );

  // Fetch token balances similar to how asset-list-table does it
  useEffect(() => {
    if (!wallets) {
      return;
    }

    const fetchTokenBalances = async () => {
      // Find NEAR and AVAIL wallets
      const nearWallet = wallets.find((w) => w.network === CHAIN.NEAR);
      const availWallet = wallets.find((w) => w.network === CHAIN.AVAIL);

      let nearTokens: TTokenBalances | null = null;
      let availBalance = 0;

      // Fetch NEAR tokens
      if (nearWallet?.address) {
        try {
          nearTokens = await getNearTokens(nearWallet.address);
        } catch (error) {
          console.error("Error fetching NEAR tokens:", error);
        }
      }

      // Fetch AVAIL balance
      if (availWallet?.address) {
        try {
          availBalance = Number(await getAvailBalance(availWallet.address));
        } catch (error) {
          console.error("Error fetching AVAIL balance:", error);
        }
      }

      // Update wallet balances
      if (nearTokens || availBalance) {
        const updatedWalletsCopy = [...wallets];

        // Update NEAR wallet balance
        if (nearTokens && nearWallet) {
          const nearWalletIndex = updatedWalletsCopy.findIndex(
            (w) =>
              w.network === CHAIN.NEAR && w.currency === CURRENCY_SYMBOLS.NEAR
          );
          if (nearWalletIndex !== -1) {
            updatedWalletsCopy[nearWalletIndex] = {
              ...updatedWalletsCopy[nearWalletIndex],
              balance: String(nearTokens.near.balance || 0),
            } as (typeof updatedWalletsCopy)[number];
          }

          // Update other token balances
          for (const [token, data] of Object.entries(nearTokens.tokens || {})) {
            const tokenWalletIndex = updatedWalletsCopy.findIndex(
              (w) =>
                w.currency.toLowerCase() === token.toLowerCase() &&
                !Object.keys(FIAT_CURRENCIES).includes(w.currency)
            );

            if (
              tokenWalletIndex !== -1 &&
              tokenWalletIndex !== nearWalletIndex
            ) {
              updatedWalletsCopy[tokenWalletIndex] = {
                ...updatedWalletsCopy[tokenWalletIndex],
                balance: String(data.balance || 0),
              } as (typeof updatedWalletsCopy)[number];
            }
          }
        }

        // Update AVAIL wallet balance
        if (availWallet) {
          const availWalletIndex = updatedWalletsCopy.findIndex(
            (w) => w.network === CHAIN.AVAIL
          );
          if (availWalletIndex !== -1) {
            updatedWalletsCopy[availWalletIndex] = {
              ...updatedWalletsCopy[availWalletIndex],
              balance: String(availBalance),
            } as (typeof updatedWalletsCopy)[number];
          }
        }

        setUpdatedWallets(updatedWalletsCopy);
      }
    };

    fetchTokenBalances();
  }, [wallets]);

  const handlePostWithdrawToken = useCallback(
    async (form: UseFormReturn<ICryptoWithdrawPayload>) => {
      setIsLoading(true);
      try {
        const data = form.getValues();
        const allWallets = [...(updatedWallets || wallets || [])];

        const walletId = allWallets?.find(
          (wallet) =>
            wallet.network.toLowerCase() === data.network.toLowerCase()
        )?.id;
        if (!walletId) {
          toast.error(t("form.error.invalidWallet"));
          return;
        }

        await tokenSubmitWithdrawService(null, walletId, {
          payload: {
            ...data,
            network: data.network.toLowerCase(),
            currency: data.token,
            is_mainnet: process.env.NODE_ENV === "production",
          },
        });
        await mutateWallets();
        toast.success(t("withdrawPage.form.tokenSuccess"));
        form.reset();
        setIsLoading(false);
      } catch (error) {
        toast.error(tError((error as HTTPError).message));
        setIsLoading(false);
      }
      setIsOpen(false);
    },
    [t, tError, wallets, mutateWallets, updatedWallets]
  );

  return (
    <FormWrapper
      id="withdraw-token"
      schema={cryptoWithdrawSchema}
      onSubmit={() => setIsOpen(true)}
    >
      {({ form }) => {
        const { watch } = form;
        const network = watch("network");
        const currency = watch("currency");
        const tokenOptions = TOKEN_OPTIONS[network] ?? [];

        // Use the updated wallets if available, otherwise use the original wallets
        const walletsToUse = updatedWallets || wallets;

        const currentWallet = walletsToUse?.find(
          (wallet) =>
            wallet.network.toLowerCase() === network.toLowerCase() &&
            wallet.currency === currency
        );

        const availableBalance = calculateAvailableBalance(
          currentWallet?.network ?? "",
          currentWallet?.balance ?? "0"
        );

        form.setValue("availableBalance", Number(availableBalance));

        return (
          <>
            <FormFieldWithLabel
              name="network"
              label={t("withdrawPage.form.network")}
              render={({ field }) => (
                <Selectbox
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    form.setValue("token", "");
                    form.setValue("amount", "");
                  }}
                  options={NETWORK_OPTIONS}
                />
              )}
            />
            <FormFieldWithLabel
              name="token"
              label={t("withdrawPage.form.token")}
              render={({ field }) => (
                <Selectbox
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    form.setValue("currency", value);
                    form.setValue("amount", "");
                  }}
                  options={tokenOptions as SelectboxOption[]}
                />
              )}
            />
            <FormFieldWithLabel
              name="to_address"
              label={t("withdrawPage.form.address")}
            >
              <Input placeholder={t("withdrawPage.form.enterWithdrawAddr")} />
            </FormFieldWithLabel>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("withdrawPage.form.amount")}</FormLabel>
                    <FormControl>
                      <div className="relative flex w-full items-center rounded-md border border-input">
                        <InputCurrency
                          id={field.name}
                          {...field}
                          className="w-full border-none focus-visible:ring-0"
                          placeholder={t("withdrawPage.form.enterAmount")}
                          decimalsLimit={0}
                          allowNegativeValue={false}
                          hasCurrency={false}
                          suffix={currency ? ` ${currency}` : ""}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="mcaption-semibold12 mr-[2px] h-9 bg-muted text-primary uppercase hover:text-primary"
                          onClick={() =>
                            field.onChange(availableBalance.toString())
                          }
                        >
                          {t("withdrawPage.button.max")}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-muted-foreground text-sm">
                {t("withdrawPage.form.available")}
                {availableBalance} {currency}
              </p>
            </div>
            <Button type="submit" className="w-full">
              {t("withdrawPage.button.submit")}
            </Button>
            <Modal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              title={t("withdrawPage.modal.cryptoTitle")}
              description={t("withdrawPage.modal.cryptoDesc", {
                amount: formatCurrency(Number(watch("amount")), {
                  showSymbol: false,
                  currency: currency,
                  decimals: 2,
                }),
                token: watch("token"),
              })}
              buttons={[
                {
                  label: t("withdrawPage.button.cancel"),
                  type: "button",
                  onClick: (handleClose) => handleClose?.(),
                  variant: "outline",
                },
                {
                  label: t("withdrawPage.button.confirm"),
                  type: "button",
                  loading: isLoading,
                  onClick: () => handlePostWithdrawToken(form),
                },
              ]}
            />
          </>
        );
      }}
    </FormWrapper>
  );
};
