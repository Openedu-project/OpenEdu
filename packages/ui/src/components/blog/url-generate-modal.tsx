'use client';

import { MagicStar } from '@oe/assets/icons/magic-star';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Modal } from '#components/modal';
import { type IURLGenerator, URLGenerator, defaultURLValue } from '#components/url-generator';
import { Button } from '#shadcn/button';

export const URLGenerateModal = () => {
  const t = useTranslations('urlGenerateModal');
  const tGeneral = useTranslations('general');
  const [value, setValue] = useState<IURLGenerator>(defaultURLValue);

  const handleAIGenerate = () => {
    setValue(defaultURLValue);
  };

  return (
    <Modal
      trigger={
        <Button variant="secondary" leftSection={<MagicStar />}>
          {t('AIGenerate')}
        </Button>
      }
      className="max-w-xl"
      title={t('inputURL')}
      description={t('inputMultiURLDesc')}
      buttons={[
        {
          label: tGeneral('cancel'),
          variant: 'outline',
          onClick: onClose => onClose?.(),
        },
        {
          label: t('generate'),
          variant: 'default',
          onClick: onClose => {
            handleAIGenerate?.();
            onClose?.();
          },
        },
      ]}
    >
      <URLGenerator multiple value={value} onChange={setValue} />
    </Modal>
  );
};
