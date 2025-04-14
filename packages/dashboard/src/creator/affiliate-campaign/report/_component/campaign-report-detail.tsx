import { useGetMe } from '@oe/api';
import type { IReportAffiliateCampaign } from '@oe/api';
import { formatNumber } from '@oe/core';
import { Modal } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

interface ICampaignReportDetailModal {
  onClose: () => void;
  data?: IReportAffiliateCampaign | null;
}

const CampaignReportDetailModal = ({ onClose, data }: ICampaignReportDetailModal) => {
  const t = useTranslations('affiliateCampaignReport');
  const { dataMe: me } = useGetMe();

  const isCurrentUser = useCallback((userId: string) => me?.id === userId, [me]);

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
      <div className="space-y-4">
        {data ? (
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="giant-iheading-semibold20 mb-2">
                {t('course')}: {data.pub_course.name}
              </h3>
              <p className="mcaption-regular16">
                {t('coursePrice')}:{formatNumber(Number(data.pub_course.price))}
              </p>
            </div>

            <div className="space-y-4">
              {/* Ref 1 Details */}
              <div className={`rounded-lg border p-4 ${isCurrentUser(data.ref1_user_id) ? 'border-primary' : ''}`}>
                <h4 className="giant-iheading-semibold20 mb-4">{t('ref1Details')}</h4>
                {data.ref1_user ? (
                  <div className="space-y-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:space-y-0">
                    <div className="flex justify-between truncate sm:grid md:col-span-2" title={data.ref1_user.email}>
                      <p className="mcaption-semibold16">UserId</p>
                      <p className="mcaption-regular16">{data.ref1_user_id}</p>
                    </div>

                    <div className="flex justify-between sm:grid sm:text-center">
                      <p className="mcaption-semibold16">{t('rate')}</p>
                      <p className="giant-iheading-semibold20 text-secondary">{data.ref1_rate}%</p>
                    </div>

                    <div className="flex justify-between sm:grid sm:text-right">
                      <p className="mcaption-semibold16">{t('amount')}</p>
                      <p className="giant-iheading-semibold20 text-primary">{formatNumber(Number(data.ref1_amount))}</p>
                    </div>
                  </div>
                ) : (
                  <p className="mcaption-regular16">{t('noRef1User')}</p>
                )}
              </div>

              {/* Ref 2 Details */}
              <div className={`rounded-lg border p-4 ${isCurrentUser(data.ref2_user_id) ? 'border-primary' : ''}`}>
                <h4 className="giant-iheading-semibold20 mb-4">{t('ref2Details')}</h4>
                {data.ref2_user ? (
                  <div className="space-y-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:space-y-0">
                    <div className="flex justify-between truncate sm:col-span-2 sm:grid" title={data.ref2_user.email}>
                      <p className="mcaption-semibold16">UserId</p>
                      <p className="mcaption-regular16">{data.ref2_user_id}</p>
                    </div>
                    <div className="flex justify-between sm:grid sm:text-center">
                      <p className="mcaption-semibold16">{t('rate')}</p>
                      <p className="giant-iheading-semibold20 text-secondary">{data.ref2_rate}%</p>
                    </div>
                    <div className="flex justify-between sm:grid sm:text-right">
                      <p className="mcaption-semibold16">{t('amount')}</p>
                      <p className="giant-iheading-semibold20 text-primary">{formatNumber(Number(data.ref2_amount))}</p>
                    </div>
                  </div>
                ) : (
                  <p className="mcaption-regular16">{t('noRef2User')}</p>
                )}
              </div>

              {/* Ref 3 Details */}
              <div className={`rounded-lg border p-4 ${isCurrentUser(data.ref3_user_id) ? 'border-primary' : ''}`}>
                <h4 className="giant-iheading-semibold20 mb-4">{t('ref3Details')}</h4>
                {data.ref3_user ? (
                  <div className="space-y-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:space-y-0">
                    <div className="flex justify-between truncate sm:col-span-2 sm:grid" title={data.ref3_user.email}>
                      <p className="mcaption-semibold16">UserId</p>
                      <p className="mcaption-regular16">{data.ref3_user_id}</p>
                    </div>
                    <div className="flex justify-between sm:grid sm:text-center">
                      <p className="mcaption-semibold16">{t('rate')}</p>
                      <p className="giant-iheading-semibold20 text-secondary">{data.ref3_rate}%</p>
                    </div>
                    <div className="flex justify-between sm:grid sm:text-right">
                      <p className="mcaption-semibold16">{t('amount')}</p>
                      <p className="giant-iheading-semibold20 text-primary">{formatNumber(Number(data.ref3_amount))}</p>
                    </div>
                  </div>
                ) : (
                  <p className="mcaption-regular16">{t('noRef3User')}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="mcaption-regular16">{t('noBonuses')}</p>
        )}
      </div>
    </Modal>
  );
};

export { CampaignReportDetailModal };
