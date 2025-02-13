import DocumentUploadIcon from '@oe/assets/icons/document-upload-icon';
import whale_image from '@oe/assets/images/whale-success.png';
import { CREATE_LAUNCHPAD_MODAL_ID } from '@oe/core/utils/constants';
import { Image } from '@oe/ui/components/image';
import { Modal } from '@oe/ui/components/modal';
import { Button } from '@oe/ui/shadcn/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@oe/ui/shadcn/dialog';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';

import { usePostAdminPublishLaunchpads } from '@oe/api/hooks/useAdminLaunchpad';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { toast } from '@oe/ui/shadcn/sonner';
import useLaunchpadDetail from '../_hooks/useLaunchpadDetail';
import { useLaunchpadModalStore } from '../_store/useLaunchpadModalStore';

const PublishLaunchpadButton = () => {
  const { launchpadId: id } = useParams();

  const { launchpad } = useLaunchpadDetail();

  const { triggerPostAdminPublishLaunchpads, isLoadingPostAdminPublishLaunchpads } = usePostAdminPublishLaunchpads(
    id as string
  );
  const { modals, setOpenModal } = useLaunchpadModalStore();
  const tLaunchpadPublish = useTranslations('creatorSettingLaunchpad.launchpadPublish');
  const tCreatorSettingLaunchpad = useTranslations('creatorSettingLaunchpad');
  const t = useTranslations('creatorSettingLaunchpad.common');
  const tError = useTranslations('errors');

  const handleClose = useCallback(() => {
    setOpenModal(CREATE_LAUNCHPAD_MODAL_ID.publishLaunchpadSuccess as string, false);
  }, [setOpenModal]);

  const isHavePool = launchpad?.props.pool_id !== '';

  const handleOpenPublishModal = useCallback(
    (open: boolean) => {
      setOpenModal(CREATE_LAUNCHPAD_MODAL_ID.publishLaunchpad as string, open);
    },
    [setOpenModal]
  );

  const handleRequest = useCallback(async () => {
    try {
      await triggerPostAdminPublishLaunchpads({
        status: 'publish',
      });
      handleOpenPublishModal(false);
      setOpenModal(CREATE_LAUNCHPAD_MODAL_ID.publishLaunchpadSuccess as string, true);
      toast.success(tCreatorSettingLaunchpad('publishLaunchpadSuccess'));
    } catch (error) {
      console.error('Handle Publish Launchpad Error', error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [triggerPostAdminPublishLaunchpads, handleOpenPublishModal, setOpenModal, tCreatorSettingLaunchpad, tError]);

  return (
    <>
      <Dialog open={modals[CREATE_LAUNCHPAD_MODAL_ID.publishLaunchpad as string]} onOpenChange={handleOpenPublishModal}>
        <DialogTrigger asChild>
          <Button className="flex items-center space-x-2 rounded-xl" disabled={!isHavePool}>
            <p>{tLaunchpadPublish('publishLaunchpad')}</p>
            <DocumentUploadIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>{tLaunchpadPublish('publishLaunchpadModal.title')}</DialogTitle>
          </DialogHeader>
          <div>
            <p>{tLaunchpadPublish('publishLaunchpadModal.description')}</p>
            <p className="mt-4 text-negative-600">{tLaunchpadPublish('publishLaunchpadModal.warning')}</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-xl">
                {t('cancel')}
              </Button>
            </DialogClose>
            <Button loading={isLoadingPostAdminPublishLaunchpads} onClick={handleRequest} className="rounded-xl">
              {t('request')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {modals[CREATE_LAUNCHPAD_MODAL_ID.publishLaunchpadSuccess as string] && (
        <Modal
          open={modals[CREATE_LAUNCHPAD_MODAL_ID.publishLaunchpadSuccess as string]}
          onClose={handleClose}
          title=""
          className="shadow-[0_4px_30px_0px_#F4F5F6]"
          hasCancelButton={false}
        >
          <div className="flex w-full flex-col space-y-4 p-6">
            <Image src={whale_image.src} alt="whale" width={50} height={50} className="w-1/2 object-contain" />
            <h1 className="text-center font-semibold text-[28px]">{tLaunchpadPublish('successTittle')}</h1>
            <p className="text-center text-neutral-600">{tLaunchpadPublish('successDescription')}</p>
            <Link href={CREATOR_ROUTES.creatorLaunchpadList} className="w-full">
              <Button className="rounded-xl border-primary text-primary hover:text-primary" variant="outline">
                {tLaunchpadPublish('viewLaunchpadList')}
              </Button>
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PublishLaunchpadButton;
