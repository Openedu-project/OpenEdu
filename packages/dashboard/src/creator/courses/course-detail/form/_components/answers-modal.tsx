import { Modal, type ModalProps } from '@oe/ui/components/modal';
import { AnswersModalContent } from './answers-modal-content';

export function AnswersModal({
  id,
  formUID,
  triggerType,
  ...props
}: // biome-ignore lint/suspicious/noExplicitAny: <explanation>
ModalProps<any> & { id: string; formUID: string; triggerType: string }) {
  return (
    <Modal {...props} className="md:max-h-[90dvh] md:max-w-[90dvw]">
      <AnswersModalContent id={id} formUID={formUID} triggerType={triggerType} />
    </Modal>
  );
}
