import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI } from '#utils/fetch';
import { CHAIN } from '#utils/wallet';

const toAvail = (balance: string, decimals: number): string => (Number(balance.toString()) / 10 ** decimals).toFixed(6);

export const getAvailBalance = async (address: string): Promise<string> => {
  if (!address) {
    return '0.000000';
  }
  const result: { data: { account_info: { data: { free: string } } } } = await fetchAPI(
    `${API_ENDPOINT.CHAIN_ACCOUNT_INFO.replace(':network', CHAIN.AVAIL).replace(':address', address)}?is_mainnet=${process.env.NODE_ENV === 'production'}`
  );
  const balance: string = result?.data?.account_info?.data?.free || '0';
  const amount: string = toAvail(balance, 18);

  return amount;
};
