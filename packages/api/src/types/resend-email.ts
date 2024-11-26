export interface IResendEmailPayload {
  event: 'REGISTER' | 'RESET_PASSWORD' | 'EXTERNAL_REGISTER';
  email: string;
}

export interface IResendEmailResponse {
  access_token: string;
  refresh_token: string;
}
