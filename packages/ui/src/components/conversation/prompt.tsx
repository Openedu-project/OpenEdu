'use client';
import type { TAgentType } from '@oe/api/types/conversation';
import { animated, useSpring } from '@react-spring/web';
import { MoveRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '#shadcn/button';
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { useSendMessageHandler } from './hooks/useMessageHandler';

const category = [
  { id: 'edu-01', name: 'Education' },
  { id: 'mkt-02', name: 'Marketing' },
  { id: 'prd-03', name: 'Product' },
  { id: 'biz-04', name: 'Business Development' },
  { id: 'edu-01d', name: 'Education' },
  { id: 'mkt-0df2', name: 'Marketing' },
  { id: 'prd-0df3', name: 'Product' },
  { id: 'biz-0df4', name: 'Business Development' },
  { id: 'dfmkt-0df2', name: 'Marketing' },
  { id: 'pdfrd-0df3', name: 'Product' },
  { id: 'bidfz-0df4', name: 'Business Development' },
];

const prompt = {
  text: 'Days of heaven; longing and melancholy at dusk. Beautiful light penetrating clouds. Memorable gorgeous lighting. 16k photograph. Highest resolution, high detail. High realism, depth of field, kodak portra 800, 105 mm f1 deep red color. Ultra realistic. Ultra detail and texture. Hauntingly beautiful. Professional DSLR lighting and shadows. Inspired by Stanley Kubrick, Tarkovsky, Parajanov, Storaro, Roger Deakins, a hauntingly beautiful work of true and ethereal beauty. Glowing aura. Watercolor splashes. Luminous.',
};

const AnimatedDiv = animated('div');

const ExpandPromptCard = ({
  agent = 'ai_search',
  text,
  side = 'bottom',
}: {
  agent?: TAgentType;
  text: string;
  side?: 'bottom' | 'top';
}) => {
  const { selectedAgent } = useConversationStore();
  const sendMessage = useSendMessageHandler(agent);

  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const textSpring = useSpring({
    height: isHovered ? `${Math.max(textRef?.current?.clientHeight ?? 0, 70)}px` : '70px',
    opacity: 1,
    config: { tension: 280, friction: 60 },
  });
  const openNewChatWithPrompt = async () => {
    if (!isHovered) {
      setIsHovered(true);
      return;
    }
    await sendMessage({
      messageInput: text,
      type: selectedAgent,
    });
  };

  return (
    <div className="relative">
      <div className={cn('invisible hidden lg:flex', 'flex-col items-end whitespace-normal rounded-3xl p-1.5 md:p-3')}>
        <div className="relative w-full">
          <div className="h-[70px]" />
        </div>
      </div>

      <div
        ref={cardRef}
        className={cn(
          'left-0 w-full lg:absolute',
          side === 'top' && 'bottom-0',
          side === 'bottom' && 'top-0',
          'transition-all duration-300'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          zIndex: isHovered ? 50 : 1,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <Button
          variant="outline"
          className={cn(
            'mcaption-regular14 group relative h-auto w-full animate-fadeIn flex-col items-end whitespace-normal rounded-3xl bg-background p-1.5 md:p-3',
            'before:absolute before:top-0 before:left-0 before:z-[-1]',
            'before:rounded-3xl before:bg-white before:content-[""]',
            'before:h-full before:w-full',
            'hover:bg-primary/10 hover:shadow-xl'
          )}
          onClick={openNewChatWithPrompt}
        >
          <div className="relative w-full">
            <AnimatedDiv style={textSpring} className="overflow-hidden">
              <p ref={textRef} className="mcaption-regular14 line-clamp-[8] text-start">
                {text}
              </p>
            </AnimatedDiv>

            <div className="absolute right-0 bottom-0 left-0 h-10 bg-gradient-to-t from-white to-transparent group-hover:hidden" />
          </div>
          <MoveRight className={cn('mt-2 hidden hidden h-4 w-4 text-primary group-hover:block')} />
        </Button>
      </div>
    </div>
  );
};

const PromptGrid = () => {
  const [length, setLength] = useState(4);

  return (
    <div className="w-full px-8 md:mt-4">
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4">
        {Array.from({ length }, (_, i) => (
          <ExpandPromptCard
            key={i}
            text={i === 1 ? 'Days of heaven; longing ' : prompt.text}
            side={i < 4 ? 'bottom' : 'top'}
          />
        ))}
      </div>
      <Button className="!flex mx-auto mt-4" variant="link" onClick={() => setLength(prev => prev + 4)}>
        View More
      </Button>
    </div>
  );
};
const PromptCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id);
  };
  return (
    <div className="flex grow flex-col gap-4">
      <div className="-top-4 md:-top-8 sticky z-10 bg-background">
        <ScrollArea className="rounded-full border bg-background p-1 md:p-2">
          <div className="flex gap-3">
            {category?.map(cate => (
              <Button
                key={cate.id}
                variant="ghost"
                onClick={() => handleSelectCategory(cate.id)}
                className={cn(
                  'mcaption-semibold14 md:mcaption-semibold16 rounded-full py-0',
                  selectedCategory === cate.id && 'bg-primary/10 text-primary'
                )}
              >
                {cate.name}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <PromptGrid />
    </div>
  );
};

export default PromptCategory;
