export type SNSProvider = 'google' | 'facebook' | 'twitter';
export interface ISNSStateData {
  provider: string;
  redirectUrl: string;
  referrer: string;
  verifier?: string;
}
