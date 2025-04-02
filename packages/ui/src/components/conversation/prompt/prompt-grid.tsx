'use client';
import { useGetPromps } from '@oe/api/hooks/useConversation';
import type { IPrompt, TAgentType } from '@oe/api/types/conversation';
import { useTranslations } from 'next-intl';
import { memo, useEffect, useState } from 'react';
import { Button } from '#shadcn/button';
import { ExpandPromptCard } from './prompt-card';
import { PromptPopup } from './prompt-popup';

export const PurePromptGrid = ({
  categoryId,
  agent,
  perPage,
  litmited,
  name,
}: {
  name?: string;
  categoryId?: string;
  agent?: TAgentType;
  perPage?: number;
  litmited?: number;
}) => {
  const tGeneral = useTranslations('general');
  const [promptData, setPromptData] = useState<IPrompt[]>([]);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    per_page: perPage ?? 4,
    ai_agent_type: agent,
    category_id: categoryId,
  });

  useEffect(() => {
    if (!(agent || categoryId || perPage)) {
      return;
    }
    setSearchParams({
      page: 1,
      per_page: perPage ?? 4,
      ai_agent_type: agent,
      category_id: categoryId,
    });
    setPromptData([]);
  }, [agent, perPage, categoryId]);

  const { prompts } = useGetPromps({
    queryParams: searchParams,
    shouldFetch: !!searchParams.ai_agent_type || !!searchParams?.category_id,
  });

  useEffect(() => {
    if (!prompts) {
      return;
    }
    setPromptData(prevData => [...prevData, ...prompts.results]);
  }, [prompts]);

  const loadMore = () => {
    setSearchParams(prev => ({ ...prev, page: prev.page + 1 }));
  };

  if (!prompts || prompts?.results?.length === 0) {
    return null;
  }

  return (
    <div className="w-full md:mt-4">
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4">
        {promptData.map((prompt, i) => (
          <ExpandPromptCard key={prompt.id} text={prompt.text} side={i < 4 ? 'bottom' : 'top'} />
        ))}
      </div>

      <div className="mx-auto mt-4 w-fit lg:mt-8">
        {prompts.pagination?.page < prompts.pagination?.total_pages &&
          (!litmited || promptData.length < litmited ? (
            <Button variant="link" onClick={loadMore}>
              {tGeneral('viewMore')}
            </Button>
          ) : (
            <PromptPopup categoryId={categoryId} name={name} />
          ))}
      </div>
    </div>
  );
};

export const PromptGrid = memo(PurePromptGrid, (prevProps, nextProps) => {
  if (prevProps.agent !== nextProps.agent) {
    return false;
  }
  if (prevProps.categoryId !== nextProps.categoryId) {
    return false;
  }
  if (prevProps.perPage !== nextProps.perPage) {
    return false;
  }
  return true;
});
