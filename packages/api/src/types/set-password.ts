export interface ISetPasswordPayload {
  email: string;
  password: string;
  token: string;
}

export interface ISetPasswordResponse {
  message: string;
}
