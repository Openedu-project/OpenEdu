import type React from 'react';
import { FORM_STYLES } from '#utils/wallet';

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  inputId: string;
}

const WithdrawFormField = ({ label, error, children, inputId }: FormFieldProps) => (
  <div>
    <label htmlFor={inputId} className={FORM_STYLES.LABEL}>
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default WithdrawFormField;
