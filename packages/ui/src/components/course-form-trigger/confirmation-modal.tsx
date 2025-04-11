import type { TFormTriggerConfirmationSettings } from '@oe/api';
import type { ICourseOutline } from '@oe/api';
import { getCookieClient } from '@oe/core';
import { buildUrl } from '@oe/core';
import type { VariantProps } from 'class-variance-authority';
import { Link } from '#common/navigation';
import { Modal } from '#components/modal';
import { Button, buttonVariants } from '#shadcn/button';
import { cn } from '#utils/cn';
import { useTriggerModalStore } from './_store';
import { MODAL_ID } from './_utils';

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
type ButtonVariant = ButtonVariantProps['variant'];

interface IConfirmationModal {
  isTriggerForm?: boolean;
  course?: ICourseOutline | null;
  onButtonClick?: () => void;
  settings: TFormTriggerConfirmationSettings;
}

const getButtonVariant = (variant: string) =>
  buttonVariants({
    variant: (variant as ButtonVariant) ?? 'default',
  });

const ConfirmationModal = ({ settings, onButtonClick, course, isTriggerForm = false }: IConfirmationModal) => {
  const { setOpenTriggerModal, modals } = useTriggerModalStore();

  if (!(settings?.enabled || settings)) {
    return null;
  }

  const accessTokenKey = process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY;
  const accessToken = getCookieClient(accessTokenKey);

  return (
    <Modal
      open={modals[MODAL_ID.afterSubmitFormTrigger]}
      onClose={() => setOpenTriggerModal(MODAL_ID.afterSubmitFormTrigger, false)}
      title={settings?.title || ''}
      hasCancelButton={false}
      hasCloseIcon
    >
      {settings?.description}

      <div className="flex justify-end gap-3 pb-4">
        {settings?.buttons?.map((btn, idx) => {
          if (btn?.type?.includes('http')) {
            const href = isTriggerForm
              ? btn?.type || ''
              : buildUrl({
                  endpoint: btn?.type || '',
                  queryParams: {
                    access_token: accessToken,
                    course_cuid: course?.cuid,
                    course_name: course?.name,
                  },
                });

            return (
              <Link
                target="_blank"
                href={href}
                key={`confirm_settings_btn_${idx}`}
                className={cn(getButtonVariant(btn?.variant), 'hover:no-underline')}
              >
                {btn?.text}
              </Link>
            );
          }

          // Handle regular buttons
          return (
            <Button
              className={cn(getButtonVariant(btn?.variant))}
              key={`confirm_settings_btn_${idx}`}
              onClick={onButtonClick}
            >
              {btn?.text || 'Close'}
            </Button>
          );
        })}
      </div>
    </Modal>
  );
};

ConfirmationModal.displayName = 'ConfirmationModal';
export { ConfirmationModal };
