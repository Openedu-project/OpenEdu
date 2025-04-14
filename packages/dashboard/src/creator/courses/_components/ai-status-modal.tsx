import type { IAICourseStatus } from '@oe/api';
import { Modal } from '@oe/ui';
import { CircleCheckBig, Loader2, TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

interface IAIContent {
  success?: ReactNode;
  loading?: ReactNode;
  failed?: ReactNode;
}
interface IAIStatusModal {
  open: boolean;
  title?: string;
  description?: string;
  status?: IAIStatus;
  content?: IAIContent;
  hasCloseIcon?: boolean;
}

export type IAIStatus = IAICourseStatus;

export function AIStatusModal({
  open = false,
  status = 'pending',
  title,
  description,
  content,
  hasCloseIcon = true,
}: IAIStatusModal) {
  const t = useTranslations('aiStatusModal');
  const renderContent = () => {
    if (['success', 'generated', 'completed'].includes(status)) {
      return (
        <>
          <CircleCheckBig className="h-[80px] w-[80px]" color="var(--positive-500)" />
          {content?.success ?? <p className="mcaption-regular16 text-foreground">{t('success')}</p>}
        </>
      );
    }
    if (status === 'failed') {
      return (
        <>
          <TriangleAlert size={80} color="var(--negative-600)" />
          {content?.failed ?? <p className="mcaption-regular16 text-foreground">{t('failLoading')}</p>}
        </>
      );
    }

    return (
      <>
        <Loader2 className="h-[80px] w-[80px] animate-spin" color="var(--primary)" />
        {content?.loading ?? <p className="mcaption-regular16 text-foreground">{t('generating')}</p>}
      </>
    );
  };

  return (
    <Modal
      open={open}
      title={title ?? '  '}
      description={description ?? ' '}
      hasCancelButton={false}
      hasCloseIcon={hasCloseIcon}
    >
      <div className="flex flex-col items-center gap-6 p-4">{renderContent()}</div>
    </Modal>
  );
}
