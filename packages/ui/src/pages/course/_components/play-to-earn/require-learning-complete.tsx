import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import type { ICourseOutline } from '@oe/api';
import whaleWarning from '@oe/assets/images/whale/whale-warning.png';
import { Image } from '#components/image';
import { PaymentButton } from '#components/payment-button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '#shadcn/alert-dialog';

interface IPlayToEarnModalProps {
  segmentName: string;
  segmentState?: string;
  courseOutline: ICourseOutline;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const PlayToEarnWarningModal = ({
  segmentName,
  segmentState,
  courseOutline,
  isOpen,
  setIsOpen,
}: IPlayToEarnModalProps) => {
  const t = useTranslations('courseOutline.playToEarn');
  const tCommonAction = useTranslations('general');

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
    },
    [setIsOpen]
  );

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="max-w-[440px] gap-6 shadow-shadow-5">
        <AlertDialogHeader className="flex flex-col items-center">
          <Image
            src={whaleWarning.src}
            alt=""
            quality={100}
            width={200}
            height={200}
            className="max-h-[200px] w-full max-w-[200px]"
          />
          <AlertDialogTitle className="giant-iheading-semibold20 md:giant-iheading-semibold28 mt-6 text-center">
            {t('modalTitle')}
          </AlertDialogTitle>
          <AlertDialogDescription className="mbutton-regular16 mt-4 text-center">
            {segmentState === 'completed' ? t('complete') : t('started')}
            <span className="mbutton-semibold16 mx-1 text-foreground">{segmentName}</span>
            {t('desc')}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="!flex-col gap-5">
          <PaymentButton
            className="mbutton-regular16 h-fit flex-grow"
            courseData={courseOutline}
            isCourseDetail
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <AlertDialogCancel onClick={handleCancel} className="!m-0">
            {tCommonAction('cancel')}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
