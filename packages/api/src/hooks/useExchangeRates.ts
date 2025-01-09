import useSWR from 'swr';
import { TExchangeRates } from "#types/wallet";
import { SWR_CONFIG, SWR_WALLET_KEY } from '#utils/wallet';
import { fetchAPI } from '#utils/fetch';
import { API_ENDPOINT } from '#utils/endpoints';

const useExchangeRates = () => {
    const { data: exchangeRatesData } = useSWR(
        SWR_WALLET_KEY.EXCHANGE_RATES,
        async () => {
            const response = await fetchAPI(API_ENDPOINT.EXCHANGE_RATES);
            return response.data as TExchangeRates;
        },
        SWR_CONFIG.slow
    );

    return {
        exchangeRates: exchangeRatesData,
        isLoading: !exchangeRatesData
    };
};

export default useExchangeRates