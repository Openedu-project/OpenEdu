'use client';
import { type SpringValue, animated, config, useSpring, useTransition } from '@react-spring/web';
import { useEffect, useState } from 'react';
import { useConversationStore } from '#store/conversation-store';
import { ChatWindow } from './chat-window';
import { SourceList, SourcePopup } from './sources/source-list';
import type { IChatWindowProps } from './type';
import { useIsDesktop } from './utils';

const AnimatedDiv = animated('div');

export function ChatWithSource({ id, initData, agent = 'ai_chat' }: IChatWindowProps) {
  const { openWebSource } = useConversationStore();
  const [hasMounted, setHasMounted] = useState(false);

  const isDesktop = useIsDesktop();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const smoothSpring = {
    ...config.wobbly,
    tension: 180,
    friction: 18,
    mass: 0.6,
    clamp: false,
    precision: 0.001,
    velocity: 0.001,
    duration: 200,
  };

  const chatProps = useSpring({
    transform: hasMounted && !openWebSource && isDesktop ? 'translateX(100px)' : 'translateX(0px)',
    config: smoothSpring,
    immediate: !hasMounted,
  });

  const desktopTransition = useTransition(openWebSource, {
    from: { opacity: 0, transform: 'translateX(200px)' },
    enter: { opacity: 1, transform: 'translateX(0px)' },
    leave: { opacity: 0, transform: 'translateX(200px)' },
    config: smoothSpring,
    immediate: !hasMounted,
  });

  return (
    <>
      {/* <Button onClick={() => setOpenWebSource(!openWebSource)}>Open</Button> */}
      <div className="flex grow gap-4 ">
        <AnimatedDiv className="mx-auto max-w-2xl grow" style={chatProps}>
          <ChatWindow id={id} initData={initData} agent={agent} />
        </AnimatedDiv>

        {isDesktop ? (
          <div className="relative ml-2 shrink-0 overflow-visible lg:w-[300px] xl:w-[400px]">
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
    </>
  );
}
