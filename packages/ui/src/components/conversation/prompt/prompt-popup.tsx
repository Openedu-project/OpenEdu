import type { TAgentType } from "@oe/api/types/conversation";
import { useTranslations } from "next-intl";
import { Modal } from "#components/modal";
import { Button } from "#shadcn/button";
import { ScrollArea, ScrollBar } from "#shadcn/scroll-area";
import { useConversationStore } from "#store/conversation-store";
import { PromptGrid } from "./prompt-grid";

export function PromptPopup({
  categoryId,
  name,
  agent,
}: {
  categoryId?: string;
  name?: string;
  agent?: TAgentType;
}) {
  const { selectedAgent } = useConversationStore();
  const tAI = useTranslations("aiAssistant");
  const tGeneral = useTranslations("general");
  return (
    <Modal
      title={tAI("allPromptingWithName", { name: name ?? "" })}
      hasCancelButton={false}
      hasCloseIcon
      className="md:max-w-[80dvw] xl:max-w-[60dvw]"
      trigger={<Button variant="link">{tGeneral("viewAll")}</Button>}
    >
      <ScrollArea className="h-[70dvh]">
        <div className="h-full w-full px-2 pb-4">
          <PromptGrid
            categoryId={categoryId}
            agent={agent === "ai_search" ? selectedAgent : agent}
            perPage={50}
          />
        </div>
        <ScrollBar className="ml-4" />
      </ScrollArea>
    </Modal>
  );
}
