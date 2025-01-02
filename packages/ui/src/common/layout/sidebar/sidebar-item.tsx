import { ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Link } from '#common/navigation';
import { Button } from '#shadcn/button';
import { Tooltip } from '#shadcn/tooltip';
import { cn } from '#utils/cn';

import { useRef } from 'react';

import { useState } from 'react';

import type { FC } from 'react';
import type { ISidebarItem, ISidebarItemProps } from './types';

export const SidebarItem: FC<ISidebarItemProps> = ({ item, depth, maxDepth, pathname, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.items && item.items.length > 0 && depth < maxDepth;
  const contentRef = useRef<HTMLDivElement>(null);

  const isCurrentActive = item.isRoot ? item.href === pathname : pathname.includes(item.href as string);
  const isAncestorActive = useMemo(() => {
    if (!hasChildren) {
      return false;
    }

    const checkActive = (items: ISidebarItem[]): boolean => {
      return items.some(subItem => {
        const isSubItemActive = subItem.isRoot ? subItem.href === pathname : pathname.includes(subItem.href as string);
        return isSubItemActive || (subItem.items && checkActive(subItem.items));
      });
    };

    return checkActive(item.items || []);
  }, [hasChildren, item.items, pathname]);

  useEffect(() => {
    if (!isCollapsed && (isCurrentActive || isAncestorActive)) {
      setIsOpen(true);
    }
  }, [isCollapsed, isCurrentActive, isAncestorActive]);

  useEffect(() => {
    if (isCollapsed) {
      setIsOpen(false);
    }
  }, [isCollapsed]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : '0';
    }
  }, [isOpen]);

  const handleItemClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  const renderLink = () => {
    const commonProps = {
      className: cn(
        'w-full justify-start gap-4 px-2 font-normal hover:text-primary',
        isCollapsed && 'justify-center',
        (isCurrentActive || isAncestorActive) && 'text-primary'
      ),
      style: {
        paddingLeft: isCollapsed ? '0.5rem' : `${depth * 1 + 0.5}rem`,
      },
    };

    const content = (
      <>
        {item.icon && <span className="shrink-0">{item.icon}</span>}
        {!isCollapsed && item.label && <span className="truncate">{item.label}</span>}
        {!isCollapsed &&
          hasChildren &&
          (isOpen ? (
            <ChevronDown className="ml-auto h-4 w-4 shrink-0" />
          ) : (
            <ChevronRight className="ml-auto h-4 w-4 shrink-0" />
          ))}
      </>
    );

    if (!item.href) {
      return (
        <Button variant="ghost" onClick={handleItemClick} {...commonProps}>
          {content}
        </Button>
      );
    }

    return (
      <Link href={item.href} variant="ghost" exact={item.isRoot} {...commonProps}>
        {content}
      </Link>
    );
  };

  const renderTooltipContent = () => (
    <div className="min-w-[200px] p-3">
      <div className={cn('mb-2 flex items-center gap-2 border-b pb-2', !hasChildren && 'mb-0 border-none pb-0')}>
        {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
        <span className="font-medium">{item.label}</span>
      </div>

      {hasChildren && (
        <ul className="space-y-1">
          {item.items?.map(subItem => (
            <li key={subItem.id}>
              <Link
                href={subItem.href || ''}
                variant="ghost"
                className={cn(
                  'flex items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:text-primary'
                )}
              >
                {subItem.icon && <span className="shrink-0">{subItem.icon}</span>}
                <span className="truncate">{subItem.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <li>
      {isCollapsed ? (
        <Tooltip
          content={renderTooltipContent()}
          contentProps={{ side: 'right', sideOffset: 8, className: 'p-0 shadow-lg' }}
        >
          {renderLink()}
        </Tooltip>
      ) : (
        renderLink()
      )}

      {hasChildren && !isCollapsed && (
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: 0 }}
        >
          <ul className="mt-2 space-y-2">
            {item.items?.map(subItem => (
              <SidebarItem
                key={subItem.id}
                item={subItem}
                depth={depth + 1}
                maxDepth={maxDepth}
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};
