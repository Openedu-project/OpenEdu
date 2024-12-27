import type { AuthEventName } from '#utils/auth';

export type SocialProvider = 'google' | 'facebook' | 'twitter' | 'linkedin';

export interface ISocialCallbackStateData {
  provider: SocialProvider;
  originUrl: string;
  referrer: string;
  verifier?: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
  expiresInMins?: number;
}

export interface IToken {
  access_token: string;
  refresh_token: string;
  id: string;
  allow_fields: {
    next_path: string;
  };
}

export interface ISignUpPayload {
  display_name: string;
  email: string;
  password: string;
  isAgree: boolean;
}

export interface ISignUpResponse extends Omit<IToken, 'id'> {}
export interface IAccessTokenResponse {
  access_token: string;
  refresh_token: string;
  id: string;
}

export interface ISocialLoginPayload {
  access_token?: string;
  code?: string;
  provider: SocialProvider;
  code_verifier?: string | null;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IForgotPasswordResponse {
  message: string;
}

export interface IResendEmailPayload {
  event: AuthEventName;
  email: string;
  next_path?: string | null;
}

export interface IResendEmailResponse {
  access_token: string;
  refresh_token: string;
}

export interface ISetPasswordPayload {
  email: string;
  password: string;
  token: string;
}

export interface ISetPasswordResponse {
  message: string;
}

export interface IResetPasswordPayload {
  email: string;
  password: string;
  token: string;
}

export interface IResetPasswordResponse {
  message: string;
}
