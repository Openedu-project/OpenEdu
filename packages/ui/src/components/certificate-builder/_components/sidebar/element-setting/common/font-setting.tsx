import { useTranslations } from 'next-intl';
import { Selectbox } from '#components/selectbox';
import { fonts } from '../../../../utils';
import { SIDEBAR_STYLES } from '../../constants';

interface FontSettingProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const FontSetting = ({ value, onChange, label }: FontSettingProps) => {
  const tCertificate = useTranslations('certificate');

  return (
    <div className={SIDEBAR_STYLES.field}>
      <p className={SIDEBAR_STYLES.subheading}>{label || tCertificate('builder.settings.fontFamily')}</p>
      <Selectbox
        options={fonts.map(font => ({
          id: font.family,
          value: font.family,
          label: font.name,
          style: {
            fontFamily: font.family,
          },
        }))}
        value={value}
        onChange={value => onChange(value)}
        style={{
          fontFamily: value,
        }}
      />
    </div>
  );
};
