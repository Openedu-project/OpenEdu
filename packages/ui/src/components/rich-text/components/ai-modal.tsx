import { useGetRewriteData } from '@oe/api/hooks/useBlog';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { marked } from '@oe/core/utils/marker';
import { Loader2, TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Modal } from '#components/modal';
import { useSocketStore } from '#store/socket';

export type IAIStatus = 'pending' | 'generating' | 'completed' | 'failed';

interface IAIModal {
  open: boolean;
  text?: string;
  status?: IAIStatus;
  onConfirm: (text: string) => void;
  onRewrite: () => void;
  rewriteId: string;
  onClose?: () => void;
}

export const AIModal: React.FC<IAIModal> = ({ open = false, status, onConfirm, onRewrite, rewriteId, onClose }) => {
  const t = useTranslations('richText.ai.modal');
  const [AIStatus, setAIStatus] = useState<IAIStatus>(status ?? 'pending');
  const { AIBlogStatusData, resetSocketData } = useSocketStore();
  const { data: result } = useGetRewriteData(rewriteId, AIStatus === 'completed');

  useEffect(() => {
    if (status) {
      setAIStatus(status);
    } else {
      setAIStatus('pending');
    }
  }, [status]);

  useEffect(() => {
    if (AIBlogStatusData?.data?.rewrite_id === rewriteId) {
      setAIStatus(AIBlogStatusData?.data?.status as IAIStatus);
      resetSocketData('ai_blog_status');
    }
  }, [AIBlogStatusData, resetSocketData, rewriteId]);

  const htmlText = useMemo(() => marked.parse(result?.content ?? '', { async: false }), [result?.content]);

  const handleRewrite = useCallback(() => {
    setAIStatus('pending');
    onRewrite();
  }, [onRewrite]);

  const renderContent = useCallback(() => {
    if (AIStatus === 'failed') {
      return (
        <div className="flex flex-col items-center gap-spacing-xl">
          <TriangleAlert size={80} className="text-destructive" />
          <p className="mcaption-regular16 text-foreground">{t('failLoading')}</p>
        </div>
      );
    }
    if (AIStatus === 'completed') {
      return (
        <div className="!overflow-visible h-[50vh] whitespace-nowrap rounded-radius-m border bg-background p-2">
          <div
            className="rich-text text-wrap text-foreground"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: htmlText,
            }}
          />
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center gap-spacing-mml">
        <Loader2 className="h-[80px] w-[80px] animate-spin text-primary" />
        <p className="mcaption-regular16 text-foreground">{t('loading')}</p>
      </div>
    );
  }, [AIStatus, htmlText, t]);

  return (
    <Modal
      open={open}
      title={t('title')}
      className="md:max-w-[70vw]"
      description={result ? t('description') : ' '}
      onClose={() => {
        onClose?.();
        setAIStatus('pending');
      }}
      buttons={
        result
          ? [
              {
                type: 'button',
                label: t('regenerate'),
                variant: 'outline',
                onClick: handleRewrite,
              },
              {
                type: 'button',
                label: t('apply'),
                variant: 'default',
                onClick: () => onConfirm(htmlText),
              },
            ]
          : GENERATING_STATUS.includes(AIStatus)
            ? []
            : [
                {
                  type: 'button',
                  label: t('reload'),
                  variant: 'default',
                  onClick: handleRewrite,
                },
              ]
      }
    >
      {renderContent()}
    </Modal>
  );
};
