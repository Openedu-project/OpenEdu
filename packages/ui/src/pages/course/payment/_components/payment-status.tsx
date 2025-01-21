"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Image } from "#components/image";

interface IPaymentStatus {
  imageSrc: string;
  title: string;
}
const PaymentStatus = ({ imageSrc, title }: IPaymentStatus) => {
  const t = useTranslations("coursePayment.paymentStatus");

  return (
    <div className='mx-auto flex max-w-md flex-col items-center justify-end p-4 text-center'>
      <Image src={imageSrc} alt={title} width={300} height={300} />
      <h2 className='mb-6 font-semibold text-xl'>{title}</h2>

      <Loader2 className='mx-auto mb-4 h-12 w-12 animate-spin text-primary' />

      <p className='mb-2 font-medium text-lg text-primary'>{t("verifying")}</p>
      <p className='text-gray-600 text-sm'>{t("pleaseWait")}</p>
    </div>
  );
};

export default PaymentStatus;
