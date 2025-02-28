import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ToggleGroup, ToggleGroupItem } from '#shadcn/toggle-group';
import { SIDEBAR_STYLES } from '../../constants';

interface AlignmentSettingProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
}

export const AlignmentSetting = ({ value = 'left', onChange, label }: AlignmentSettingProps) => {
  const tCertificate = useTranslations('certificate');

  return (
    <div className={SIDEBAR_STYLES.field}>
      <p className={SIDEBAR_STYLES.subheading}>{label || tCertificate('builder.settings.alignment')}</p>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={value => {
          if (value) {
            onChange(value);
          }
        }}
        className="justify-start"
      >
        <ToggleGroupItem value="left" aria-label="Align left" className="h-8 w-8 p-0">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center" className="h-8 w-8 p-0">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right" className="h-8 w-8 p-0">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Justify" className="h-8 w-8 p-0">
          <AlignJustify className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
