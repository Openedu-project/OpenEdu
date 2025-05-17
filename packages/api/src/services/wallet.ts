import { buildUrl } from '@oe/core';
import type { IBankAccountPayload } from '#schemas/wallet';
import type { ICryptoWithdrawPayload, IFiatWithdrawPayload } from '#schemas/withdrawSchema';
import type { HTTPPagination } from '#types/fetch';
import type { IBankAccount, IWallet, TRequestWithdrawHistory } from '#types/wallet';
import { API_ENDPOINT } from '#utils/endpoints';
import { type FetchOptions, deleteAPI, fetchAPI, postAPI, putAPI } from '#utils/fetch';

// export async function postWithdrawCryptoService(
//   endpoint: string | null | undefined,
//   walletId: string,
//   { payload, init }: { payload: IWithdrawCryptoPayload; init?: RequestInit }
// ) {
//   const response = await postAPI(
//     endpoint ?? buildUrl({ endpoint: API_ENDPOINT.USERS_ME_WALLETS_ID_WITHDRAW_CRYPTO, params: { id: walletId } }),
//     payload,
//     init
//   );

//   return response.data;
// }

export async function getWalletSevice(endpoint?: string | null | undefined, params?: Record<string, unknown>) {
  const response = await fetchAPI(
    endpoint ??
      buildUrl({
        endpoint: API_ENDPOINT.USERS_ME_WALLETS,
        queryParams: params,
      })
  );
  return response.data as IWallet[];
}

export async function getBankAccountsService(endpoint: string | null | undefined, params?: Record<string, unknown>) {
  const response = await fetchAPI(
    endpoint ??
      buildUrl({
        endpoint: API_ENDPOINT.USER_SETTINGS,
        queryParams: params,
      })
  );

  return response.data as HTTPPagination<IBankAccount>;
}

export async function tokenSubmitWithdrawService(
  endpoint: string | null | undefined,
  walletId: string,
  { payload, init }: { payload: ICryptoWithdrawPayload; init?: RequestInit }
) {
  const response = await postAPI(
    endpoint ??
      buildUrl({
        endpoint: API_ENDPOINT.USERS_ME_WALLETS_ID_WITHDRAW_CRYPTO,
        params: { id: walletId },
      }),
    payload,
    init
  );

  return response.data;
}

export async function fiatSubmitWithdrawService(
  endpoint: string | null | undefined,
  walletId: string,
  { payload, init }: { payload: IFiatWithdrawPayload; init?: RequestInit }
) {
  const response = await postAPI(
    endpoint ??
      buildUrl({
        endpoint: API_ENDPOINT.USERS_ME_WALLETS_ID_WITHDRAW,
        params: { id: walletId },
      }),
    payload,
    init
  );

  return response.data;
}

export const createBankAccount = async (
  url: string | null | undefined,
  payload: IBankAccountPayload,
  init: FetchOptions = {}
) => {
  const response = await postAPI<IBankAccount, Record<string, IBankAccountPayload[]>>(
    url ?? API_ENDPOINT.USER_SETTINGS,
    {
      settings: [payload],
    },
    init
  );

  return response.data;
};

export const updateBankAccount = async (
  url: string | null | undefined,
  payload: IBankAccountPayload,
  init: FetchOptions = {}
) => {
  const response = await putAPI<IBankAccount, Record<string, IBankAccountPayload[]>>(
    url ?? API_ENDPOINT.USER_SETTINGS,
    {
      settings: [payload],
    },
    init
  );

  return response.data;
};

export const deleteBankAccount = async (url: string | null | undefined, ids: string, init: FetchOptions = {}) => {
  const response = await deleteAPI(
    url ?? buildUrl({ endpoint: API_ENDPOINT.USER_SETTINGS, queryParams: { ids } }),
    undefined,
    init
  );

  return response.data;
};

export const getWalletRequestWithdraw = async (url: string | null | undefined, params?: Record<string, unknown>) => {
  const response = await fetchAPI<HTTPPagination<TRequestWithdrawHistory>>(
    url ??
      buildUrl({
        endpoint: API_ENDPOINT.USERS_ME_APPROVALS,
        queryParams: params,
      })
  );

  return response.data;
};
