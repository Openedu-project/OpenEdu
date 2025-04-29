'use client';

import { animated, useSpring } from '@react-spring/web';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { ChatWindow } from './chat-window';
import { SourceList } from './sources/source-list';
import { SourcePopup } from './sources/sources-popup';
import type { IChatWindowProps } from './type';
import { useIsDesktop } from './utils';

const AnimatedDiv = animated('div');

export function ChatWithSource({ id, initData, agent }: IChatWindowProps) {
  const { openWebSource } = useConversationStore();
  const isDesktop = useIsDesktop();

  const smoothSpring = {
    tension: 180,
    friction: 18,
    mass: 0.6,
    clamp: false,
    precision: 0.001,
    velocity: 0,
  };

  // Single spring to control both elements
  const springs = useSpring({
    sourcePanelWidth: openWebSource.isOpen ? 400 : 0,
    sourceOpacity: openWebSource.isOpen ? 1 : 0,
    config: smoothSpring,
  });

  return (
    <div className="flex grow overflow-y-auto overflow-x-hidden">
      {/* Chat window's width is calculated from the spring value */}
      <AnimatedDiv
        className="grow"
        style={{
          width: isDesktop ? springs.sourcePanelWidth.to(w => `calc(100% - ${w}px`) : '100%',
        }}
      >
        <ChatWindow id={id} initData={initData} agent={agent} />
      </AnimatedDiv>

      {isDesktop ? (
        <AnimatedDiv
          className={cn('relative flex h-full shrink-0 overflow-visible', openWebSource.isOpen && 'pl-4')}
          style={{
            width: springs.sourcePanelWidth,
            opacity: springs.sourceOpacity,
          }}
        >
          <div className="flex h-full w-full flex-col gap-2 rounded-xl border bg-background p-4 pr-2">
            <SourceList />
          </div>
        </AnimatedDiv>
      ) : (
        <SourcePopup />
      )}
    </div>
  );
}
