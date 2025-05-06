import { Account, type Near, connect, keyStores } from 'near-api-js';
import { FailoverRpcProvider, JsonRpcProvider } from 'near-api-js/lib/providers';
import type { TNFTData, TNFTItem } from '#types/wallet';
import { CHAIN, NFT_CONTRACTS, type TChain, type TCurrencySymbol, TOKEN_CONTRACTS } from '#utils/wallet';

const NEAR_NETWORK_ID =
  process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_APP_ORIGIN === 'https://openedu101dev.com'
    ? 'testnet'
    : 'mainnet';
const NEAR_RPC = process.env.NEXT_PUBLIC_NEAR_RPC;
const NEAR_RPC_FAILOVER = process.env.NEXT_PUBLIC_NEAR_RPC_FAILOVER;

export interface NearTokenBalances {
  address: string;
  near: {
    balance: number;
  };
  tokens: {
    [key in TChain | TCurrencySymbol]: {
      balance: number;
    };
  };
  totalNFTSupply: number;
}

// RPC Failover
const jsonProviders = [
  new JsonRpcProvider({
    url: NEAR_RPC as string,
  }),
  new JsonRpcProvider(
    {
      url: NEAR_RPC_FAILOVER as string,
    },
    { retries: 3, backoff: 2, wait: 500 }
  ),
];

const provider = new FailoverRpcProvider(jsonProviders);

// Initialize NEAR connection
let nearConnection: Near | null = null;

async function initializeNear(): Promise<Near> {
  if (nearConnection) {
    return nearConnection;
  }
  if (!NEAR_RPC) {
    throw new Error('NEAR_RPC is undefined');
  }

  const keyStore = new keyStores.InMemoryKeyStore();

  nearConnection = await connect({
    networkId: NEAR_NETWORK_ID,
    nodeUrl: NEAR_RPC,
    provider,
    keyStore,
  });

  return nearConnection;
}

// Get account details
export async function getNearAccountBalance(address: string): Promise<number> {
  try {
    const near = await initializeNear();
    const account = new Account(near.connection, address);
    const state = await account.state();

    return Number.parseFloat(state.amount) / 1e24;
  } catch {
    return 0;
  }
}

// Get token balance for NEP-141 tokens
export async function getNEP141Balance(tokenContract: string, address: string): Promise<number | null> {
  try {
    const near = await initializeNear();
    const account = new Account(near.connection, address);

    const result: number = await account.viewFunction({
      contractId: tokenContract,
      methodName: 'ft_balance_of',
      args: { account_id: address },
    });

    if (typeof result !== 'string' && typeof result !== 'number') {
      throw new TypeError('Invalid balance response');
    }

    // Convert to a number for further processing
    const balance = typeof result === 'string' ? Number.parseFloat(result) : result;

    return balance;
  } catch {
    return null;
  }
}

// Get NFT supply
export async function getNEP171Supply(nftContract: string, address: string): Promise<number | null> {
  try {
    const near = await initializeNear();
    const account = new Account(near.connection, address);

    const supply: unknown[] = await account.viewFunction({
      contractId: nftContract,
      methodName: 'nft_supply_for_owner',
      args: { account_id: address },
    });

    return Number(supply);
  } catch {
    return null;
  }
}

// Get NFT tokens
export async function getNFTTokens(nftContract: string, address: string): Promise<TNFTItem[] | null> {
  try {
    const near = await initializeNear();
    const account = new Account(near.connection, address);

    const tokens: TNFTItem[] = await account.viewFunction({
      contractId: nftContract,
      methodName: 'nft_tokens_for_owner',
      args: { account_id: address },
    });
    return tokens;
  } catch {
    return null;
  }
}

// Fetch balances for NEAR and various tokens
export async function getNearTokens(address: string): Promise<NearTokenBalances> {
  try {
    // Fetch all data concurrently
    const [nearBalance, tokenResults, nftSupplies] = await Promise.all([
      getNearAccountBalance(address),

      // Fetch all token balances at once
      Promise.all(
        Object.entries(TOKEN_CONTRACTS).map(async ([token, contract]) => {
          const { id, decimals } = contract as { id: string; decimals: number };
          const balance = await getNEP141Balance(id, address);
          return {
            token,
            balance: balance === null ? 0 : balance / 10 ** decimals,
          };
        })
      ),

      // Fetch all NFT supplies at once
      Promise.all(
        Object.values(NFT_CONTRACTS).map(async contract => {
          const supply = await getNEP171Supply(contract as string, address);

          return supply ?? 0;
        })
      ),
    ]);

    // Initialize tokens object with default values for all required keys
    const defaultTokens: NearTokenBalances['tokens'] = {
      near: { balance: 0 },
      base: { balance: 0 },
      avail: { balance: 0 },
      VND: { balance: 0 },
      USD: { balance: 0 },
      P: { balance: 0 },
      NEAR: { balance: 0 },
      USDT: { balance: 0 },
      USDC: { balance: 0 },
      AVAIL: { balance: 0 },
      ETH: {
        balance: 0,
      },
    };

    // Update tokens with actual balances
    const tokenBalances = { ...defaultTokens };

    for (const { token, balance } of tokenResults) {
      if (token in tokenBalances) {
        tokenBalances[token as keyof NearTokenBalances['tokens']] = { balance };
      }
    }

    // Calculate total NFT supply
    let totalNFTSupply = 0;

    for (const supply of nftSupplies) {
      totalNFTSupply += supply;
    }

    return {
      address,
      near: {
        balance: nearBalance,
      },
      tokens: tokenBalances,
      totalNFTSupply,
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const fetchNearNFTs = async (address: string): Promise<TNFTData> => {
  const results = await Promise.all(
    Object.entries(NFT_CONTRACTS).map(async ([contractName, contractAddress]) => {
      try {
        const tokens = (await getNFTTokens(contractAddress, address)) || [];
        return {
          contractName,
          tokens: tokens.map(token => ({
            ...token,
            chain: CHAIN.NEAR,
            contract: contractAddress,
          })),
        };
      } catch (error) {
        console.error(`Failed to fetch tokens for ${contractName}:`, error);
        return { contractName, tokens: [] };
      }
    })
  );

  const nftData: TNFTData = {};

  for (const result of results) {
    if (result.tokens.length > 0) {
      nftData[result.contractName] = result.tokens;
    }
  }

  return nftData;
};
