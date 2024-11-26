export interface ILoginPayload {
  email: string;
  password: string;
  expiresInMins?: number;
}

export interface IToken {
  access_token: string;
  refresh_token: string;
  id: string;
}

export interface ISignUpPayload {
  display_name: string;
  email: string;
  password: string;
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
  provider: string;
  code_verifier?: string | null;
}
