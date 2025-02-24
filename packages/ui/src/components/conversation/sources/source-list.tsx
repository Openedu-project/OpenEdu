import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { Modal } from '#components/modal';
import { Button } from '#shadcn/button';
import { ScrollArea } from '#shadcn/scroll-area';
import { Separator } from '#shadcn/separator';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { SourceCard } from './source-card';

const list = [
  {
    url: 'https://www.bankless.com/read/whats-next-for-sui-in-2025',
    title: "What's Next for Sui in 2025",
    content:
      'Sui has been one of the most talked-about L1s this cycle, garnering excitement over its roadmap plans and earning traction that has helped it pull ahead during a stormy time for prices.. Even when compared to other Move-based chains, Sui has had a stellar season as it has built out a robust foundation for its ecosystem that looks primed for future growth in 2025, with a series of major ...',
  },
  {
    url: 'https://crypto.news/heres-why-sui-price-can-surge-to-16-while-apt-can-hit-22-by-2025-end/',
    title: "Here's why SUI price can surge to $16, while APT can hit ...",
    content:
      '30 Jan 2025 — Analysts see potential for SUI and APT to climb to $16 and $22, respectively, by year-end 2025, driven by increasing adoption, ...',
  },
  {
    url: 'https://cryptonews.com/cryptocurrency/sui-vs-solana/',
    title: 'SUI vs Solana: Which is The Better Network in 2025?',
    content:
      '5 Feb 2025 — We compare Sui vs Solana, evaluating speed, transaction costs, ecosystems, and opportunities. Read on to discover the pros and cons of each.',
  },
  {
    url: 'https://www.cryptopolitan.com/solana-sol-and-sui-sui-hit-new-all-time-highs-in-january-2025-but-this-coin-has-more-eyes-on-it-in-february/',
    title: 'Solana (SOL) and Sui (SUI) Hit New All-Time Highs in ...',
    content:
      "2 days ago — The token's remarkable 570% increase has positioned it as the most anticipated crypto launch in early 2025. With over 438 million tokens sold, ...",
  },
  {
    url: 'https://www.disruptionbanking.com/2025/01/13/how-strong-will-sui-be-in-2025/',
    title: 'How Strong Will SUI Be in 2025?',
    content:
      '13 Jan 2025 — However, the chances are that in 2025 alone the SUI token may reach between 3 times and 4 times what it is trading at today, with a long-term ...',
  },
];

export function SourceList() {
  const tSources = useTranslations('aiAssistant.sources');
  const { setOpenWebSource } = useConversationStore();

  return (
    <>
      <div className="flex justify-between">
        <p className="mcaption-semibold20">{tSources('title')}</p>
        <Button onClick={() => setOpenWebSource(false)} variant="ghost" className="!p-1 h-auto">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="relative grow">
        <div className={cn('absolute top-0 left-0 h-full w-full rounded-lg p-2')}>
          <ScrollArea className="h-full">
            {list.map((item, index) => (
              <Fragment key={item.title}>
                <SourceCard {...item} className="mb-3" />
                {index < list.length - 1 && <Separator className="mb-3" />}
              </Fragment>
            ))}
          </ScrollArea>
        </div>
      </div>
    </>
  );
}

export function SourcePopup() {
  const { openWebSource } = useConversationStore();

  return (
    <Modal
      title="  "
      open={openWebSource}
      contentClassName="h-[calc(100dvh-100px)] flex flex-col"
      hasCancelButton={false}
    >
      <SourceList />
    </Modal>
  );
}
