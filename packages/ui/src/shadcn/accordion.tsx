'use client';

import { Content, Item, Root, Trigger } from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import type { ComponentProps, ComponentPropsWithoutRef } from 'react';
import { cn } from '#utils/cn';

const Accordion = Root;

function AccordionItem({ className, ...props }: ComponentProps<typeof Item>) {
  return <Item data-slot="accordion-item" className={cn('border-b', className)} {...props} />;
}

function AccordionTrigger({
  className,
  headerClassName,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Trigger> & {
  headerClassName?: string;
}) {
  const content = props.asChild ? (
    children
  ) : (
    <>
      {children}
      <ChevronDown className="size-4 shrink-0 transition-transform duration-200" />
    </>
  );

  return (
    // <Header className={cn("flex", headerClassName)}>
    <div className={cn('mb-2 flex', headerClassName)}>
      <Trigger
        data-slot="accordion-trigger"
        className={cn(
          'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...props}
      >
        {content}
      </Trigger>
    </div>
    // </Header>
  );
}

function AccordionContent({ className, children, ...props }: ComponentProps<typeof Content>) {
  return (
    <Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
