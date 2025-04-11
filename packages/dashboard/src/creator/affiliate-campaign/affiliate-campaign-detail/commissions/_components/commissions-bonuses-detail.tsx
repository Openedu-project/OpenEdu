import type { ICommissionItem } from '@oe/api';
import { formatNumber, getAlphabetLabel } from '@oe/core';
import { Modal } from '@oe/ui';
import { useTranslations } from 'next-intl';

interface ICommissionBonusesModal {
  onClose: () => void;
  data?: ICommissionItem | null;
}

const CommissionBonusesModal = ({ onClose, data }: ICommissionBonusesModal) => {
  const t = useTranslations('affiliateCommissionFormModal');

  return (
    <Modal
      open={true}
      title=""
      onClose={onClose}
      hasCancelButton={false}
      buttons={[
        {
          type: 'button',
          label: t('cancel'),
          variant: 'outline',
          onClick: () => onClose(),
        },
      ]}
    >
      <div className="space-y-4 px-2 py-8">
        {data?.bonuses?.map((bonus, index) => (
          <div key={bonus.id || index} className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold text-lg">
              {t('level')} {getAlphabetLabel(index)}
            </h3>
            <div className="space-y-2">
              <p>
                {t('bonusQuantity')}: {formatNumber(bonus.qty1)}
              </p>
              <p>
                {t('bonusRate')}: {bonus.ref1_rate}%
              </p>
            </div>
          </div>
        ))}
        {(!data?.bonuses || data.bonuses.length === 0) && <p>{t('noBonuses')}</p>}
      </div>
    </Modal>
  );
};

export { CommissionBonusesModal };
