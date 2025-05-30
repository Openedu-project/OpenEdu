'use client';

import { Content, Provider, Root, Trigger } from '@radix-ui/react-tooltip';

import { Link } from '#common/navigation';

import { type ComponentPropsWithoutRef, type ComponentRef, type ReactNode, forwardRef } from 'react';
import { cn } from '#utils/cn';

const TooltipProvider = Provider;

const RadixTooltip = Root;

const TooltipTrigger = Trigger;

const TooltipContent = forwardRef<ComponentRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 animate-in overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-popover-foreground text-sm shadow-md data-[state=closed]:animate-out',
        className
      )}
      {...props}
    />
  )
);
TooltipContent.displayName = Content.displayName;

const Tooltip = ({
  content,
  children,
  contentProps,
  className,
  ...props
}: {
  content: ReactNode;
  children: ReactNode;
  contentProps?: ComponentPropsWithoutRef<typeof TooltipContent>;
  className?: string;
} & ComponentPropsWithoutRef<typeof RadixTooltip>) => (
  <TooltipProvider delayDuration={100}>
    <RadixTooltip {...props}>
      <TooltipTrigger asChild className={className}>
        {children}
      </TooltipTrigger>
      <TooltipContent sideOffset={0} className="max-w-[300px]" {...contentProps}>
        {content}
      </TooltipContent>
    </RadixTooltip>
  </TooltipProvider>
);

interface IProps extends Omit<ComponentPropsWithoutRef<typeof Link>, 'children'> {
  name: string;
  href: string;
}

export default function TooltipLink({ name, href, ...props }: IProps) {
  return (
    <Tooltip content={name}>
      <Link {...props} className={cn('w-full justify-start truncate p-0 underline', props.className)} href={href}>
        {name}
      </Link>
    </Tooltip>
  );
}

export { Tooltip, TooltipLink, RadixTooltip, TooltipTrigger, TooltipContent, TooltipProvider };
