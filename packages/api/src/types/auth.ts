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
