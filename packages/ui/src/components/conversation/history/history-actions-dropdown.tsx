import type { IChatHistory } from '@oe/api/types/conversation';
import { CircleEllipsis, Pencil, Share, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState, type ReactNode } from 'react';
import { DeleteButton } from '#components/delete-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#shadcn/dropdown-menu';
import { cn } from '#utils/cn';

interface ActionItem {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
  node?: React.ReactNode;
}

interface ActionDropdownProps {
  className?: string;
  actions?: ActionItem[];
  onShare?: () => void;
  onEdit: () => void;
  onDelete: (onClose?: () => void) => Promise<void>;
  item: IChatHistory;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({ className, actions, item, onShare, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const tAI = useTranslations('aiAssistant');
  const tGeneral = useTranslations('general');

  const defaultItems: ActionItem[] = [
    {
      icon: <Share className="h-4 w-4" />,
      label: 'Share',
      onClick: onShare,
      variant: 'default',
      disabled: true,
    },
    {
      icon: <Pencil className="h-4 w-4" />,
      label: 'Edit Name',
      onClick: onEdit,
      variant: 'default',
    },
    {
      label: 'delete',
      node: (
        <DeleteButton
          onDelete={onDelete}
          title={tAI('delTitle')}
          description={
            tAI.rich('delDesc', {
              chat_name: item?.context?.title ?? '',
              strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
              span: (chunks: ReactNode) => <span className="text-center">{chunks}</span>,
            }) as string
          }
          variant="ghost"
          className="h-auto w-full justify-start gap-2 rounded-md p-1 text-sm outline-hidden hover:bg-slate-50 focus:bg-accent focus:text-accent-foreground"
        >
          <Trash2 className="h-4 w-4" />
          <span className="mcaption-regular14">{tGeneral('delete')}</span>
        </DeleteButton>
      ),
    },
  ];

  const menuItems = actions || defaultItems;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger id={item.id} className={cn('outline-hidden', className)}>
        <CircleEllipsis className={cn('h-4 w-4 text-slate-600', 'transition-transform duration-200')} />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn(
          'p-1',
          'fade-in-0 zoom-in-95 animate-in',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=top]:slide-in-from-bottom-2'
        )}
      >
        {menuItems.map((item, index) => {
          if (item.node) {
            return <React.Fragment key={item.label}>{item.node} </React.Fragment>;
          }
          return (
            <React.Fragment key={item.label}>
              <DropdownMenuItem
                onClick={item.onClick}
                disabled={item.disabled}
                className={cn(
                  'flex items-center gap-2 p-1',
                  'cursor-pointer select-none rounded-md',
                  'transition-colors duration-200',
                  'data-[disabled]:opacity-50',
                  !item.disabled && 'hover:bg-slate-50'
                )}
              >
                {item.icon}
                <span className="mcaption-regular14">{item.label}</span>
              </DropdownMenuItem>
              {index < menuItems.length - 1 && <DropdownMenuSeparator className="my-1 bg-slate-100" />}
            </React.Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDropdown;
