'use client';
import { type SpringValue, animated, useSpring, useTransition } from '@react-spring/web';
import { useMemo } from 'react';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { ChatWindow } from './chat-window';
import { SourceList } from './sources/source-list';
import { SourcePopup } from './sources/sources-popup';
import type { IChatWindowProps } from './type';
import { useIsDesktop } from './utils';

const AnimatedDiv = animated('div');

export function ChatWithSource({ id, initData, agent = 'ai_search' }: IChatWindowProps) {
  const { openWebSource, width } = useConversationStore();

  const isDesktop = useIsDesktop();

  const smoothSpring = {
    tension: 180,
    friction: 18,
    mass: 0.6,
    clamp: false,
    precision: 0.001,
    velocity: 0,
  };

  const transformX = useMemo(() => {
    if (!width) {
      return 0;
    }
    const containerWidth = window.innerWidth > 1440 ? 1440 : window.innerWidth;

    return (containerWidth - width - 200) / 2;
  }, [width]);

  const chatProps = useSpring({
    x: openWebSource.isOpen ? 0 : transformX,
    config: smoothSpring,
  });

  const desktopTransition = useTransition(openWebSource.isOpen, {
    from: { opacity: 0, transform: 'translateX(200px)' },
    enter: { opacity: 1, transform: 'translateX(0px)' },
    leave: { opacity: 0, transform: 'translateX(200px)' },
    config: smoothSpring,
  });

  return (
    <div className="container flex grow gap-4 overflow-hidden">
      <AnimatedDiv className="grow" style={isDesktop ? chatProps : undefined}>
        <ChatWindow id={id} initData={initData} agent={agent} />
      </AnimatedDiv>

      {isDesktop ? (
        <div
          className={cn(
            'relative mt-8 ml-2 hidden shrink-0 overflow-visible lg:w-[300px] xl:w-[400px]',
            openWebSource.isOpen && 'block'
          )}
        >
          {desktopTransition(
            (
              style: {
                opacity: SpringValue<number>;
                transform: SpringValue<string>;
              },
              item: boolean
            ) =>
              item && (
                <AnimatedDiv
                  className="flex h-full flex-col gap-2 rounded-xl border bg-background p-4 pr-2"
                  style={style}
                >
                  <SourceList />
                </AnimatedDiv>
              )
          )}
        </div>
      ) : (
        <SourcePopup />
      )}
    </div>
  );
}
