import { isLogin } from "@oe/api";
import { getAIModels } from "@oe/api";
import type { TAgentType } from "@oe/api";
import type { ReactNode } from "react";
import { AIModelDropdown } from "#components/conversation";
import { cn } from "#utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  agent: TAgentType;
};

export async function AIChatLayout({ children, className }: Props) {
  const [AIChatModels, login] = await Promise.all([
    getAIModels(undefined, { next: { tags: ["get_ai_models"] } }),
    isLogin(),
  ]);

  return (
    <div
      className={cn(
        "flex h-[calc(100dvh-var(--header-small-height))] md:h-[calc(100dvh-var(--header-height))]",
        className
      )}
    >
      <div className="flex grow flex-col gap-4 p-2 lg:p-4">
        {AIChatModels && AIChatModels?.length > 0 && (
          <AIModelDropdown
            AIModels={AIChatModels}
            isLogin={login}
            className="shrink-0 lg:mx-auto"
          />
        )}
        <div className="flex grow flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
