export interface IVerifyEmailPayload {
  token: string;
}

export interface IVerifyEmailResponse {
  access_token: string;
  refresh_token: string;
}
