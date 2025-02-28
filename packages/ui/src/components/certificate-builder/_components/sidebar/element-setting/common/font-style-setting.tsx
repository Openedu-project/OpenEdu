import { Bold, Italic, Underline } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ToggleGroup, ToggleGroupItem } from '#shadcn/toggle-group';
import { SIDEBAR_STYLES } from '../../constants';

interface FontStyleSettingProps {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  onChange: (styles: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
  }) => void;
}

export const FontStyleSetting = ({
  bold = false,
  italic = false,
  underline = false,
  onChange,
}: FontStyleSettingProps) => {
  const tCertificate = useTranslations('certificate');

  return (
    <div className={SIDEBAR_STYLES.field}>
      <p className={SIDEBAR_STYLES.subheading}>{tCertificate('builder.settings.fontWeight')}</p>
      <ToggleGroup
        size="sm"
        type="multiple"
        value={[bold ? 'bold' : '', italic ? 'italic' : '', underline ? 'underline' : ''].filter(Boolean)}
        onValueChange={value => {
          onChange({
            bold: value.includes('bold'),
            italic: value.includes('italic'),
            underline: value.includes('underline'),
          });
        }}
        className="justify-start"
      >
        <ToggleGroupItem value="bold" aria-label={tCertificate('builder.settings.bold')} className="h-8 w-8 p-0">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label={tCertificate('builder.settings.italic')} className="h-8 w-8 p-0">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="underline"
          aria-label={tCertificate('builder.settings.underline')}
          className="h-8 w-8 p-0"
        >
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
