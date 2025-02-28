import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { SIDEBAR_STYLES } from '../../constants';

interface SettingFieldProps {
  label?: string;
  children: ReactNode;
  className?: string;
  translationKey?: string;
}

export const SettingField = ({ label, children, className = '', translationKey }: SettingFieldProps) => {
  const tCertificate = useTranslations('certificate');

  return (
    <div className={`${SIDEBAR_STYLES.field} ${className}`}>
      <p className={SIDEBAR_STYLES.subheading}>{translationKey ? tCertificate(translationKey) : label}</p>
      {children}
    </div>
  );
};
