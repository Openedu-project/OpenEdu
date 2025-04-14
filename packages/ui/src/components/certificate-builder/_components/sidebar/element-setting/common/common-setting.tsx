import type { ICertificateElement } from '@oe/api';
import { useTranslations } from 'next-intl';
import { Input } from '#shadcn/input';
import { Label } from '#shadcn/label';
import { SIDEBAR_STYLES } from '../../constants';
import { SettingSection } from './setting-section';

export const CommonSetting = ({
  selectedElement,
  updateElement,
}: {
  selectedElement?: ICertificateElement;
  updateElement: (id: string, updates: Partial<ICertificateElement>) => void;
}) => {
  const tCertificate = useTranslations('certificate');

  const handleUpdateStyles = (updates: Record<string, unknown>) => {
    if (!selectedElement) {
      return;
    }

    updateElement(selectedElement.id, {
      ...selectedElement,
      styles: {
        ...selectedElement.styles,
        ...updates,
      },
    });
  };

  return (
    <SettingSection title={tCertificate('builder.settings.position')}>
      <div className={SIDEBAR_STYLES.fieldGroup}>
        <div className={SIDEBAR_STYLES.field}>
          <Label htmlFor="x">X</Label>
          <Input
            id="x"
            type="number"
            value={(selectedElement as ICertificateElement)?.styles?.x ?? 0}
            onChange={e => handleUpdateStyles({ x: Number(e.target.value) })}
          />
        </div>

        <div className={SIDEBAR_STYLES.field}>
          <Label htmlFor="y">Y</Label>
          <Input
            id="y"
            type="number"
            value={(selectedElement as ICertificateElement)?.styles?.y ?? 0}
            onChange={e => handleUpdateStyles({ y: Number(e.target.value) })}
          />
        </div>
      </div>
    </SettingSection>
  );
};
