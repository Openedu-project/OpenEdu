/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import type { ICourseOutline } from "@oe/api";
import { useGetMe } from "@oe/api";
import type { IWallet } from "@oe/api";
import { useGetShareRateByCode } from "@oe/api";
import { usePostValidateRefCode } from "@oe/api";
import { useExchangeRates } from "@oe/api";
import { useNFTTotalAssets, useWallet } from "@oe/api";
import {
  ASSET_TYPES,
  CHAIN,
  FIAT_CURRENCIES,
  SUPPORTED_EXCHANGE_RATES,
} from "@oe/api";
import type { IOrderRes } from "@oe/api";
import {
  useCreateOrder,
  useOrderChangeMethod,
  useOrderPaymentStatus,
  useOrderPaymentSuccess,
} from "@oe/api";
import { useGetPaymentMethodList } from "@oe/api";
import { PLATFORM_ROUTES, buildUrl } from "@oe/core";
import { getCookieClient } from "@oe/core";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useSocketStore } from "#store/socket";
import { PaymentConfirm } from "./payment-confirmation";
import { PaymentStatus } from "./payment-status";

export type IPaymentOption = "fiat" | "crypto";
export interface IPaymentCryptoWallet {
  id: string;
  native: string;
  balance: string;
  currency_symbol: string;
}
type AssetData = {
  type: string;
  assetType: string;
  amount: number;
  valueUSD: number;
  original: IWallet;
};

const PaymentPage = ({ courseData }: { courseData: ICourseOutline }) => {
  const router = useRouter();
  const t = useTranslations("coursePayment.paymentConfirmation");
  const { slug } = useParams();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [orderId, setOrderId] = useState<string>("");
  const [amountDue, setAmountDue] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [shareRateAmount, setShareRateAmount] = useState<number>(0);
  const [verifyOrderRes, setVerifyOrderRes] = useState<IOrderRes | null>(null);
  const [paymentMethodSelected, setPaymentMethodSelected] =
    useState<string>("");
  const [paymentOptionSelected, setPaymentOptionSelected] =
    useState<IPaymentOption>("fiat");
  const [cryptoCurrency, setCryptoCurrency] = useState<string>("USDT");
  const [fiatCurrency, setFiatCurrency] = useState<string>("VND");

  const orderCreationAttempted = useRef(false);
  const refCodeStorage = getCookieClient(
    process.env.NEXT_PUBLIC_COOKIE_REF_CODE
  );
  const fromSourceStorage = getCookieClient(
    process.env.NEXT_PUBLIC_COOKIE_FROM_SOURCE
  );

  const { dataMe: me } = useGetMe();
  const { triggerCreateOrder } = useCreateOrder();
  const { triggerOrderChangeMethod } = useOrderChangeMethod(orderId);
  const { triggerOrderPaymentSuccess } = useOrderPaymentSuccess(orderId);
  const { triggerPostValidateRefCode, errorPostValidateRefCode } =
    usePostValidateRefCode(refCodeStorage as string);
  const { dataPaymentMethodList } = useGetPaymentMethodList({
    per_page: 100,
    page: 1,
  });
  const { paymentData, resetSocketData } = useSocketStore();
  const { dataShareRateByCode: dataGetShareRateByCode } = useGetShareRateByCode(
    refCodeStorage as string
  );
  // TODO
  // const { wallets, isLoading, tokenBalances } = usePaymentWallet();
  const [usedCoupon, setUsedCoupon] = useState<string | null>(null);
  const { triggerOrderPaymentStatus } = useOrderPaymentStatus(orderId);
  const { wallets } = useWallet();
  const { tokenBalances } = useNFTTotalAssets();
  const { exchangeRates } = useExchangeRates();

  const cryptoWallet = useMemo(() => {
    if (!(wallets && exchangeRates)) {
      return [];
    }

    // const allCurrencies = [...FIAT_CURRENCIES, ...CRYPTO_CURRENCIES];

    const processedData = wallets
      .map((wallet) => {
        const currencyInfo =
          SUPPORTED_EXCHANGE_RATES[
            wallet.currency as keyof typeof SUPPORTED_EXCHANGE_RATES
          ];
        if (!currencyInfo) {
          return null;
        }
        const { tokens, near } = tokenBalances ?? {
          near: { balance: 0 },
          tokens: {} as { [key: string]: { balance: number } },
        };
        if (wallet.currency.toLocaleLowerCase() === CHAIN.NEAR) {
          wallet.balance = String(near.balance);
        } else if (!Object.keys(FIAT_CURRENCIES).includes(wallet.currency)) {
          // Only set balance for non-fiat currencies
          const tokenBalance = tokens[wallet.currency as keyof typeof tokens];
          wallet.balance = String(tokenBalance?.balance ?? 0);
        }

        return {
          assetType: wallet.type.toLowerCase(),
          id: wallet,
          native: wallet.currency,
          balance: Number(wallet.balance),
          currency_symbol: wallet.currency,
        };
      })
      .filter(Boolean) as unknown as AssetData[];

    return processedData.sort((a, b) => {
      if (
        a.assetType === ASSET_TYPES.FIAT &&
        b.assetType !== ASSET_TYPES.FIAT
      ) {
        return -1;
      }
      if (
        a.assetType !== ASSET_TYPES.FIAT &&
        b.assetType === ASSET_TYPES.FIAT
      ) {
        return 1;
      }
      return 0;
    });
  }, [wallets, exchangeRates, tokenBalances]);
  useEffect(() => {
    if (courseData) {
      const { price_settings } = courseData;

      setFiatCurrency(price_settings?.fiat_currency ?? "VND");
      setCryptoCurrency(price_settings?.crypto_currency ?? "USDT");
    }
  }, [courseData]);

  useEffect(() => {
    if (paymentData) {
      const isSuccess = paymentData?.data?.data?.order_status === "success";

      resetSocketData("payment");
      if (isSuccess) {
        router.push(
          buildUrl({
            endpoint: PLATFORM_ROUTES.paymentSuccess,
            params: { slug },
          })
        );
      } else {
        router.push(
          buildUrl({
            endpoint: PLATFORM_ROUTES.paymentFailed,
            params: { slug },
          })
        );
      }
    }
  }, [paymentData, resetSocketData, router, slug]);

  // useEffect(() => {
  //   if (wallets && tokenBalances) {
  //     const crypto = wallets
  //       .filter((wallet) => toAssetType(wallet.type) === ASSET_TYPES.CRYPTO)
  //       .map((item) => {
  //         return {
  //           id: item.id,
  //           native: toCurrencySymbol(item.currency) !== CURRENCY_SYMBOLS.NEAR,
  //           balance:
  //             toCurrencySymbol(item.currency) === CURRENCY_SYMBOLS.NEAR
  //               ? tokenBalances.near.balance?.toString()
  //               : tokenBalances.tokens[item.currency]?.balance.toString(),
  //           currency_symbol: item.currency,
  //         };
  //       });

  //     setCryptoWallet(crypto as unknown as IPaymentCryptoWallet[]);
  //   }
  // }, [wallets, tokenBalances]);

  const setAllData = useCallback((res: IOrderRes) => {
    const {
      id,
      missing_amount,
      discount_amount,
      referral_discount_amount,
      coupon,
    } = res.order;

    setPaymentOptionSelected(
      res?.payment_method?.service === "sepay" ? "fiat" : "crypto"
    );
    setUsedCoupon(coupon ? coupon.coupon_code : null);
    setOrderId(id);
    setAmountDue(Number(missing_amount));
    setDiscountAmount(Number(discount_amount));
    setShareRateAmount(Number(referral_discount_amount));
  }, []);

  const getAPICreateOrder = useCallback(
    async (hasRefCode = false) => {
      try {
        let source = "";

        if (fromSourceStorage) {
          const fromSourceData: { fromSource: string; courseSlug: string }[] =
            fromSourceStorage
              ? typeof fromSourceStorage === "string"
                ? JSON.parse(fromSourceStorage)
                : fromSourceStorage
              : [];
          const matchingEntries = fromSourceData
            .filter((entry) => entry.courseSlug === courseData.slug)
            .sort(
              (a, b) => fromSourceData.indexOf(b) - fromSourceData.indexOf(a)
            );

          if (matchingEntries.length > 0) {
            source = matchingEntries[0]?.fromSource ?? "";
          }
        }

        const res = await triggerCreateOrder({
          course_id: courseData?.id ?? "",
          course_cuid: courseData?.cuid ?? "",
          referral_code: hasRefCode ? (refCodeStorage as string) ?? "" : "",
          source,
        });

        setAllData(res);
      } catch (error) {
        console.error("error", error);
        setOrderId("");
      }
    },
    [
      courseData,
      refCodeStorage,
      fromSourceStorage,
      setAllData,
      triggerCreateOrder,
    ]
  );

  const handleCreateOrder = useCallback(async () => {
    if (orderCreationAttempted.current) {
      return;
    }
    orderCreationAttempted.current = true;

    if (courseData) {
      try {
        if (refCodeStorage) {
          await triggerPostValidateRefCode({
            course_cuid: courseData?.cuid ?? "",
          });
        }
        await getAPICreateOrder(true);
      } catch (error) {
        console.error("error", error);
        await getAPICreateOrder(false);
      }
    }
  }, [
    courseData,
    getAPICreateOrder,
    refCodeStorage,
    triggerPostValidateRefCode,
  ]);

  useEffect(() => {
    (async () => {
      if (me?.id && courseData) {
        await handleCreateOrder();
      }
    })();
  }, [courseData, handleCreateOrder, me?.id]);

  const handleChangeMethod = useCallback(
    async (paymentMethod: string) => {
      setPaymentMethodSelected(paymentMethod);
      try {
        const res = await triggerOrderChangeMethod({
          payment_method_id: paymentMethod,
          currency: "VND",
        });

        setVerifyOrderRes(res);
        setAllData(res);

        return true;
      } catch (error) {
        console.error("error", error);
        return false;
      }
    },
    [triggerOrderChangeMethod, setAllData]
  );

  const handleChangeCryptoMethod = useCallback(
    async (paymentOption: IPaymentOption) => {
      setPaymentOptionSelected(paymentOption);
      const item = dataPaymentMethodList?.results?.filter(
        (item) => item.payment_type === cryptoCurrency
      );
      let res: IOrderRes | null = null;

      try {
        if (paymentOption === "crypto") {
          res = await triggerOrderChangeMethod({
            payment_method_id: item?.[0]?.id as string,
          });
          setVerifyOrderRes(res);
          setAllData(res);
        } else {
          setAmountDue(Number(courseData?.price_settings?.fiat_price));
        }

        return true;
      } catch (error) {
        console.error("error", error);
        return false;
      }
    },
    [
      courseData,
      cryptoCurrency,
      dataPaymentMethodList?.results,
      triggerOrderChangeMethod,
      setAllData,
    ]
  );

  const handleOrderPaymentSuccess = useCallback(async () => {
    try {
      await triggerOrderPaymentSuccess({
        payment_method_id: dataPaymentMethodList?.results?.[0]?.id ?? "",
      });
      router.push(
        buildUrl({
          endpoint: PLATFORM_ROUTES.paymentSuccess,
          params: { slug },
        })
      );
      return true;
    } catch (error) {
      console.error("error", error);
      return false;
    }
  }, [
    dataPaymentMethodList?.results,
    router,
    slug,
    triggerOrderPaymentSuccess,
  ]);

  const handleNextStep = useCallback(async () => {
    if (!paymentMethodSelected) {
      toast.error(t("choosePaymentMethod"));
      return;
    }

    if (Number(amountDue) === 0) {
      await handleOrderPaymentSuccess();
    } else {
      const res = await triggerOrderPaymentStatus();

      if (res && res.status === "success") {
        router.push(
          buildUrl({
            endpoint: PLATFORM_ROUTES.paymentSuccess,
            params: { slug },
          })
        );
      } else {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }
  }, [
    amountDue,
    handleOrderPaymentSuccess,
    paymentMethodSelected,
    router,
    slug,
    t,
    triggerOrderPaymentStatus,
  ]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: {
        return (
          <PaymentConfirm
            courseData={courseData}
            orderId={orderId}
            paymentMethodSelected={paymentMethodSelected}
            paymentOptionSelected={paymentOptionSelected}
            dataOrder={verifyOrderRes}
            amountDue={amountDue}
            discountAmount={discountAmount}
            shareRate={
              errorPostValidateRefCode
                ? 0
                : dataGetShareRateByCode?.share_rate ?? 0
            }
            shareRateAmount={shareRateAmount}
            currentStep={currentStep}
            dataMethods={dataPaymentMethodList?.results ?? []}
            fiatCurrency={fiatCurrency}
            cryptoCurrency={cryptoCurrency}
            cryptoWallet={cryptoWallet as unknown as IPaymentCryptoWallet[]}
            usedCoupon={usedCoupon ?? ""}
            onNextStep={handleNextStep}
            setVerifyOrderRes={setVerifyOrderRes}
            handleChangeMethod={handleChangeMethod}
            handleChangeCryptoMethod={handleChangeCryptoMethod}
            setDiscountAmount={setDiscountAmount}
            setAmountDue={setAmountDue}
            setShareRateAmount={setShareRateAmount}
            handleOrderPaymentSuccess={handleOrderPaymentSuccess}
          />
        );
      }
      case 1: {
        return (
          <PaymentStatus
            imageSrc={courseData?.thumbnail?.url ?? ""}
            title={courseData?.name ?? ""}
          />
        );
      }
      default: {
        return null;
      }
    }
  };

  return (
    <div className="container mx-auto p-0">
      <div className="lg:max-w[1080px] mx-auto mt-6 w-full md:w-[80%]">
        {renderStepContent()}
      </div>
    </div>
  );
};

export { PaymentPage };
