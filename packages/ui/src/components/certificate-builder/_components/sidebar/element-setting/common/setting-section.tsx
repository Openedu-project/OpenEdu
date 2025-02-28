import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Tooltip } from '#shadcn/tooltip';
import { SIDEBAR_STYLES } from '../../constants';

interface SettingSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
  translationKey?: string;
  infoText?: string;
}

export const SettingSection = ({ title, children, className = '', translationKey, infoText }: SettingSectionProps) => {
  const tCertificate = useTranslations('certificate');

  return (
    <div className={`${SIDEBAR_STYLES.section} ${className}`}>
      <div className="flex items-center gap-2">
        <h3 className={SIDEBAR_STYLES.heading}>{translationKey ? tCertificate(translationKey) : title}</h3>
        {infoText ? (
          <Tooltip
            content={infoText}
            contentProps={{
              className: 'whitespace-nowrap',
            }}
          >
            <Info className="h-4 w-4 cursor-help text-muted-foreground" />
          </Tooltip>
        ) : null}
      </div>
      {children}
    </div>
  );
};
