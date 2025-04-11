export interface IBankWithdrawalAccount {
  setting_id?: string;
  id?: string;
  bank_name: string;
  account_name: string;
  account_number: string;
}

export interface IBankAccountSettingValue<T> {
  setting_value: T;
}
