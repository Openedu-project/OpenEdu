import { CURRENCY_SYMBOLS } from '@oe/api/utils/wallet';
import { useTranslations } from 'next-intl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';
import { FORM_STYLES } from '#utils/wallet';

interface FiatTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const FiatTypeSelect = ({ value, onChange, error }: FiatTypeSelectProps) => {
  const t = useTranslations('withdrawPage');

  return (
    <>
      <Select name="fiatType" onValueChange={onChange} value={value}>
        <SelectTrigger className={FORM_STYLES.SELECT_TRIGGER}>
          <SelectValue placeholder={t('form.selectFiatType')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={CURRENCY_SYMBOLS.VND}>VND</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
};

export default FiatTypeSelect;
