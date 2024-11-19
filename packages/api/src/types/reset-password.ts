export interface IResetPasswordPayload {
  email: string;
  password: string;
  token: string;
}

export interface IResetPasswordResponse {
  message: string;
}
