import { Share2 } from 'lucide-react';
import type React from 'react';
import { Badge } from '#shadcn/badge';
import { Button } from '#shadcn/button';
import { DropdownMenu, DropdownMenuTrigger } from '#shadcn/dropdown-menu';
import { cn } from '#utils/cn';
import { MenuContent } from './menu-share-item';
import type { ShareButtonComponentProps } from './types';

export const addParamsToUrl = (url: string, params: Record<string, string>) => {
  const urlObj = new URL(url);

  for (const [key, value] of Object.entries(params)) {
    urlObj.searchParams.set(key, value);
  }
  return urlObj.toString();
};

export default function ShareButton({
  config,
  children,
  onShareClick,
  className,
  isAffiliate,
  ...props
}: ShareButtonComponentProps) {
  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onShareClick?.(e);
  };

  const AffiliatedBadge = isAffiliate && (
    <Badge className="mcaption-regular8 absolute bottom-[75%] left-[65%] rounded-[8px] bg-[#09BEC9] p-1 text-white">
      Referral
    </Badge>
  );

  const DefaultShareIcon = <Share2 className="h-3 w-3 md:h-4 md:w-4" color="hsl(var(--foreground))" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className={cn('relative border-foreground/20 p-2 focus:border focus-visible:ring-0', className)}
          onClick={handleShare}
          {...props}
        >
          {children ?? DefaultShareIcon}
          {AffiliatedBadge}
        </Button>
      </DropdownMenuTrigger>

      <MenuContent config={config} />
    </DropdownMenu>
  );
}
