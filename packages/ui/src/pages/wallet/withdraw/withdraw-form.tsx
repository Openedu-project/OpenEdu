'use client';

import { WITHDRAW_TYPE } from '@oe/api/utils/wallet';
import { useWalletStore } from '../_store/useWalletStore';
import { WithdrawFiatForm } from './withdraw-fiat-form';
import { WithdrawTokenForm } from './withdraw-token-form';

export const WithdrawForm = () => {
  const { withdrawType } = useWalletStore();
  return withdrawType === WITHDRAW_TYPE.TOKEN ? <WithdrawTokenForm /> : <WithdrawFiatForm />;
};
