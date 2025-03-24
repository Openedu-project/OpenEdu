import { Modal } from '#components/modal';
import { useConversationStore } from '#store/conversation-store';
import { SourceList } from './source-list';

export function SourcePopup() {
  const { openWebSource } = useConversationStore();

  return (
    <Modal
      title="  "
      open={openWebSource.isOpen}
      contentClassName="h-[calc(80dvh-100px)] flex flex-col"
      hasCancelButton={false}
    >
      <SourceList />
    </Modal>
  );
}
