import { Loader2, TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import showdown from 'showdown';
import { Modal } from '#components/modal';

interface IAIModal {
  open: boolean;
  text?: string;
  loading?: boolean;
  onConfirm: (text: string) => void;
  onRewrite: () => void;
}

export const AIModal: React.FC<IAIModal> = ({ open = false, loading, text, onConfirm, onRewrite }) => {
  const t = useTranslations('richText.ai.modal');
  const converter = new showdown.Converter();
  const htmlText = converter.makeHtml(text ?? '');

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center gap-spacing-mml">
          <Loader2 className="h-[80px] w-[80px] animate-spin text-primary" />
          <p className="mcaption-regular16 text-foreground">{t('loading')}</p>
        </div>
      );
    }
    if (text) {
      return (
        <div className="!overflow-visible h-[50vh] whitespace-nowrap rounded-radius-m border bg-background p-spacing-s">
          <div
            className="tiptap text-wrap text-foreground"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: htmlText,
            }}
          />
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center gap-spacing-xl">
        <TriangleAlert size={80} className="text-destructive" />
        <p className="mcaption-regular16 text-foreground">{t('failLoading')}</p>
      </div>
    );
  };

  return (
    <Modal
      isOpen={open}
      title={t('title')}
      description={text ? t('description') : ' '}
      buttons={
        text
          ? [
              {
                type: 'button',
                label: t('regenerate'),
                variant: 'outline',
                onClick: onRewrite,
              },
              {
                type: 'button',
                label: t('apply'),
                variant: 'default',
                onClick: () => onConfirm(htmlText),
              },
            ]
          : loading
            ? []
            : [
                {
                  type: 'button',
                  label: t('reload'),
                  variant: 'default',
                  onClick: onRewrite,
                },
              ]
      }
    >
      {renderContent()}
    </Modal>
  );
};
