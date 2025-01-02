export interface IWalletItem {
  user_id: string;
  balance: string;
  type: string;
  currency: string;
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
}

export interface IWalletRes extends Array<IWalletItem> {}
