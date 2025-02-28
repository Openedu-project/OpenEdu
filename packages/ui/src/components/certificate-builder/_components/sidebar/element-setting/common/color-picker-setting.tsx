import { useTranslations } from 'next-intl';
import { GradientColorPicker } from '#components/color-picker';
import { SIDEBAR_STYLES } from '../../constants';

interface ColorPickerSettingProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  translationKey?: string;
}

export const ColorPickerSetting = ({
  value,
  onChange,
  label,
  translationKey = 'builder.settings.fontColor',
}: ColorPickerSettingProps) => {
  const tCertificate = useTranslations('certificate');

  return (
    <div className={SIDEBAR_STYLES.colorPicker}>
      <p className={SIDEBAR_STYLES.subheading}>{label || tCertificate(translationKey)}</p>
      <GradientColorPicker value={value || '#000000'} onChange={onChange} />
    </div>
  );
};
