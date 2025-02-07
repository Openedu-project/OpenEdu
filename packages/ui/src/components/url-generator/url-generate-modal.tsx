'use client';
import { postBlogAI } from '@oe/api/services/blog';
import { MagicStar } from '@oe/assets/icons/magic-star';
import { CHARACTERS_REGEX } from '@oe/core/utils/helpers';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Modal } from '#components/modal';
import { Button } from '#shadcn/button';
import { toast } from '#shadcn/sonner';
import { type IURLGenerator, URLGenerator, defaultURLValue } from './url-generator';

export const URLGenerateModal = ({ onSuccess }: { onSuccess?: () => void }) => {
  const t = useTranslations('urlGenerateModal');
  const tGeneral = useTranslations('general');
  const [value, setValue] = useState<IURLGenerator>(defaultURLValue);

  const handleAIGenerate = async () => {
    const { urls, ...baseParams } = value;

    const links = urls
      .replaceAll(',', ' ')
      .trim()
      .split(CHARACTERS_REGEX)
      .map(url => {
        return {
          blog_type: 'org',
          link: url,
        };
      });

    try {
      const res = await postBlogAI(null, {
        payload: { ai_blog_request_type: 'generate_blog', ...baseParams, blogs: links },
      });

      if (res) {
        toast.success(t('generating'));
        onSuccess?.();
      }
    } catch (error) {
      return error;
    }
    setValue(defaultURLValue);
  };

  return (
    <Modal
      trigger={
        <Button variant="outline" className="border-primary text-primary">
          <MagicStar color="hsl(var(--primary))" />
          <span className="ml-2 hidden lg:block">{t('AIGenerate')}</span>
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
          onClick: async onClose => {
            await handleAIGenerate?.();
            onClose?.();
          },
        },
      ]}
    >
      <URLGenerator multiple value={value} onChange={setValue} showNote />
    </Modal>
  );
};
