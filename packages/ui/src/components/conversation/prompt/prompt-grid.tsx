'use client';
import type { IPrompt, TAgentType } from '@oe/api';
import { useGetPromps } from '@oe/api';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ElementType, useEffect, useState } from 'react';
import { Button } from '#shadcn/button';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { ExpandPromptCard } from './prompt-card';
// import { PromptPopup } from './prompt-popup';

export const PromptGrid = ({
  categoryId,
  agent,
  perPage,
  litmited,
  name,
  className,
  PromptPopup,
}: {
  name?: string;
  categoryId?: string;
  agent?: TAgentType;
  perPage?: number;
  litmited?: number;
  className?: string;
  PromptPopup?: ElementType;
}) => {
  const tGeneral = useTranslations('general');
  const [promptData, setPromptData] = useState<IPrompt[]>([]);
  const { selectedAgent } = useConversationStore();
  const [count, setCount] = useState(4);
  const [disabled, setDisabled] = useState(false);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    per_page: perPage,
    ai_agent_type: agent,
    category_id: categoryId,
  });

  useEffect(() => {
    if (!(agent || categoryId || perPage)) {
      return;
    }
    setSearchParams({
      page: 1,
      per_page: perPage ?? litmited ?? 8,
      ai_agent_type: agent === 'ai_search' ? selectedAgent : agent,
      category_id: categoryId,
    });
    setPromptData([]);
    setCount(4);
  }, [agent, perPage, categoryId, litmited, selectedAgent]);

  const { prompts, isLoading } = useGetPromps({
    queryParams: searchParams,
    shouldFetch: (!!searchParams.ai_agent_type || !!searchParams?.category_id) && !!searchParams?.per_page,
  });

  useEffect(() => {
    if (!prompts) {
      return;
    }
    setPromptData(prevData => [...prevData, ...prompts.results]);
  }, [prompts]);

  const loadMore = () => {
    if (!litmited) {
      setSearchParams(prev => ({ ...prev, page: prev.page + 1 }));
      return;
    }
    setCount(prev => prev + 4);
  };

  if (isLoading) {
    return (
      <div className="m-auto w-fit">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (!prompts || prompts?.results?.length === 0) {
    return null;
  }

  return (
    <div className={cn('w-full md:mt-4', className)}>
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4">
        {promptData?.slice(0, litmited ? count : promptData.length).map((prompt, i) => (
          <ExpandPromptCard
            key={prompt.id}
            text={prompt.text}
            side={i < 4 ? 'bottom' : 'top'}
            disabled={disabled}
            callbackFn={() => {
              setDisabled(true);
            }}
            agent={agent}
          />
        ))}
      </div>

      <div className="mx-auto mt-4 w-fit lg:mt-8">
        {(!litmited && prompts.pagination?.page < prompts.pagination?.total_pages) ||
        (litmited && count < litmited && count < prompts.pagination?.total_items) ? (
          <Button variant="link" onClick={loadMore}>
            {tGeneral('viewMore')}
          </Button>
        ) : (
          prompts.pagination?.page < prompts.pagination?.total_pages &&
          PromptPopup && <PromptPopup categoryId={categoryId} name={name} agent={agent} />
        )}
      </div>
    </div>
  );
};
