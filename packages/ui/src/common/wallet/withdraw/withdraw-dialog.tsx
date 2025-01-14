import { ASSET_TYPES, CURRENCY_SYMBOLS, type TWithdrawState, WITHDRAW_STATE } from '@oe/api/utils/wallet';
import { Button } from '@oe/ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@oe/ui/shadcn/dialog';
import { formatVNDCurrency } from '@oe/ui/utils/format-currency';
import { Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';

export interface WithdrawDialogProps {
  state: TWithdrawState;
  setState: (state: TWithdrawState) => void;
  isLoading: boolean;
  amount: number | string;
  currency: string;
  address?: string;
  onSubmit: () => void;
  onClose: () => void;
  onNavigate: (path: string) => void;
  type: 'fiat' | 'crypto';
}

const DialogTitleContent: React.FC<{ state: TWithdrawState }> = ({ state }) => {
  const tWithdrawPage = useTranslations('withdrawPage');
  const getTitleText = () => {
    switch (state) {
      case WITHDRAW_STATE.SUCCESS:
        return tWithdrawPage('withdrawStatus.success.title');
      case WITHDRAW_STATE.SUBMIT:
        return tWithdrawPage('withdrawStatus.submit.title');
      case WITHDRAW_STATE.OUT_OF_GAS:
        return tWithdrawPage('withdrawStatus.outOfGas.title');
      default:
        return '';
    }
  };

  return <>{getTitleText()}</>;
};

const DialogDescriptionContent: React.FC<{
  state: TWithdrawState;
  amount: number | string;
  currency: string;
  address?: string;
  type: 'fiat' | 'crypto';
}> = ({ state, amount, currency, address, type }) => {
  const tWithdrawPage = useTranslations('withdrawPage');
  const getDescriptionContent = () => {
    switch (state) {
      case WITHDRAW_STATE.SUCCESS:
        return <>{tWithdrawPage('withdrawStatus.success.desc')}</>;
      case WITHDRAW_STATE.SUBMIT:
        return (
          <>
            {tWithdrawPage('withdrawStatus.submit.notice')}
            <span className="font-semibold text-primary text-xl uppercase">
              {type === ASSET_TYPES.FIAT && currency.toUpperCase() === CURRENCY_SYMBOLS.VND
                ? `${formatVNDCurrency('vnd', Number(amount))} `
                : `${formatVNDCurrency('usd', Number(amount))} `}
              {currency}
            </span>
            {address && (
              <>
                {tWithdrawPage('withdrawStatus.submit.cryptoToAddress')}
                <span className="block break-all rounded bg-gray-100 p-2 underline">{address}</span>
              </>
            )}
            <span className="block">
              {type === ASSET_TYPES.CRYPTO && `${tWithdrawPage('withdrawStatus.submit.cryptoNotice')}`}
              {type === ASSET_TYPES.FIAT && `${tWithdrawPage('withdrawStatus.submit.fiatNotice')}`}
            </span>
          </>
        );
      case WITHDRAW_STATE.OUT_OF_GAS:
        return tWithdrawPage('withdrawStatus.outOfGas.desc');
      default:
        return null;
    }
  };

  return <>{getDescriptionContent()}</>;
};

const DialogActions: React.FC<{
  state: TWithdrawState;
  onClose: () => void;
  onSubmit: () => void;
  onNavigate: (path: string) => void;
  isLoading: boolean;
  type: 'fiat' | 'crypto';
}> = ({ state, onClose, onSubmit, onNavigate, isLoading, type }) => {
  const tWithdrawPage = useTranslations('withdrawPage');
  const renderButtons = () => {
    switch (state) {
      case WITHDRAW_STATE.SUCCESS:
        return (
          <>
            <Button variant="outline" className="border-black" onClick={onClose}>
              {tWithdrawPage('btn.close')}
            </Button>
            <Button onClick={() => onNavigate(`/wallet/history?type=${type}`)} className="mb-1">
              {tWithdrawPage('btn.viewHistory')}
            </Button>
          </>
        );
      case WITHDRAW_STATE.SUBMIT:
        return (
          <>
            <Button variant="outline" className="border-black " onClick={onClose} disabled={isLoading}>
              {tWithdrawPage('btn.cancel')}
            </Button>
            <Button onClick={onSubmit} disabled={isLoading} className="mb-1">
              {tWithdrawPage('btn.submit')}
            </Button>
          </>
        );
      case WITHDRAW_STATE.OUT_OF_GAS:
        return (
          <>
            <Button variant="outline" className="border-black" onClick={onClose}>
              {tWithdrawPage('btn.close')}
            </Button>
            <Button onClick={() => onNavigate('/wallet/deposit')} className="mb-1">
              {tWithdrawPage('btn.deposit')}
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return <>{renderButtons()}</>;
};

export const WithdrawDialog: React.FC<WithdrawDialogProps> = ({
  state,
  setState,
  isLoading,
  amount,
  currency,
  address,
  onSubmit,
  onClose,
  onNavigate,
  type,
}) => {
  return (
    <Dialog open={state !== WITHDRAW_STATE.INIT} onOpenChange={open => !open && setState(WITHDRAW_STATE.INIT)}>
      <DialogContent className="p-8 sm:rounded-2xl">
        {isLoading && <Loader className="animate-spin" />}
        <DialogHeader>
          <DialogTitle className="mb-4 font-semibold text-2xl">
            <DialogTitleContent state={state} />
          </DialogTitle>
          <DialogDescription className="text-base">
            <DialogDescriptionContent state={state} amount={amount} currency={currency} address={address} type={type} />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogActions
            state={state}
            onClose={onClose}
            onSubmit={onSubmit}
            onNavigate={onNavigate}
            isLoading={isLoading}
            type={type}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
