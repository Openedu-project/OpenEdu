import { useTranslations } from 'next-intl';
import { Modal } from '#components/modal';
import { Button } from '#shadcn/button';
import { useConversationStore } from '#store/conversation-store';
import { PromptGrid } from './prompt-grid';

export function PromptPopup({
  categoryId,
  name,
}: {
  categoryId?: string;
  name?: string;
}) {
  const { selectedAgent } = useConversationStore();
  const tAI = useTranslations('aiAssistant');
  const tGeneral = useTranslations('general');
  return (
    <Modal
      title={tAI('allPromptingWithName', { name: name })}
      hasCancelButton={false}
      hasCloseIcon
      className="md:max-w-[80dvw] xl:max-w-[60dvw]"
      trigger={<Button variant="link">{tGeneral('viewAll')}</Button>}
    >
      <PromptGrid categoryId={categoryId} agent={selectedAgent} perPage={12} />
    </Modal>
  );
}
