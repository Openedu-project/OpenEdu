import { Modal } from '@oe/ui/components/modal';
import { Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { createAPIUrl } from '@oe/api/utils/fetch';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { copyToClipboard } from '@oe/core/utils/utils';
import { useMemo } from 'react';
import { toast } from 'sonner';

interface IShareCertProps {
  username: string;
  certId: string;
  onClose: () => void;
}

export default function ShareCertModal({ onClose, username, certId }: IShareCertProps) {
  const t = useTranslations('certificate');
  const tGeneral = useTranslations('general');

  const url = useMemo(
    () =>
      createAPIUrl({
        endpoint: PLATFORM_ROUTES.profileCertificateDetail,
        params: { username, certId },
      }),
    [username, certId]
  );

  const handleCopyLink = () => {
    copyToClipboard(`${window.location.origin}${url}`, t('copied'));

    toast.success(tGeneral('copied'));
  };

  return (
    <Modal open={true} title={t('shareThisPage')} onClose={onClose} hasCancelButton={false} hasCloseIcon>
      <div className="flex w-full items-center gap-3 py-4">
        <div className="mcaption-regular16 no-scrollbar mr-spacing-xs line-clamp-2 flex-1 overflow-x-auto">{`${window.location.origin}${url}`}</div>
        <Copy className="stroke-1 hover:cursor-pointer" onClick={handleCopyLink} />
      </div>
    </Modal>
  );
}
