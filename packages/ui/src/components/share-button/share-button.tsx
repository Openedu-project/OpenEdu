import { copyToClipboard } from '@oe/core/utils/utils';
import { Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { SocialIcon } from '#components/social-icon';
import { Badge } from '#shadcn/badge';
import { Button } from '#shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '#shadcn/dropdown-menu';
import { cn } from '#utils/cn';
import { SOCIAL_MEDIA_CONFIG, type ShareButtonComponentProps } from './types';

const addParamsToUrl = (url: string, params: Record<string, string>) => {
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
  const tCommonAction = useTranslations('general');

  const { url, title, permalink, socials, additionalParams = {} } = config;

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    onShareClick?.(e);
  };

  const handlePermalinkCopy = () => {
    const permalinkUrl = additionalParams ? addParamsToUrl(url, additionalParams) : url;
    copyToClipboard(permalinkUrl, tCommonAction('copied'), 2000);
  };

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
          {children ?? <Share2 className="h-3 w-3 md:h-4 md:w-4" color="hsl(var(--foreground))" />}
          {isAffiliate && (
            <Badge className="mcaption-regular8 absolute bottom-[75%] left-[65%] rounded-[8px] bg-[#09BEC9] p-1 text-white">
              Referral
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-lg bg-white shadow-lg">
        {permalink?.enabled && (
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2" onClick={handlePermalinkCopy}>
            <SocialIcon url={permalink?.url ?? ''} iconSize={16} iconColor="#2C2C2C">
              <span className="ml-2">{permalink.label || 'Permalink'}</span>
            </SocialIcon>
          </DropdownMenuItem>
        )}

        {socials.map(social => {
          const socialConfig = SOCIAL_MEDIA_CONFIG[social.id];
          if (socialConfig) {
            const ShareComponent = socialConfig?.Component;

            // Create URL with source parameter and additional params
            const shareUrl = addParamsToUrl(url, {
              utm: socialConfig.sourceParam,
              ...additionalParams,
            });

            return (
              <DropdownMenuItem key={social.id} className="px-3 py-2">
                <ShareComponent
                  url={shareUrl}
                  title={title}
                  className={cn('flex w-full items-center gap-2', social.className)}
                >
                  <SocialIcon url={socialConfig.url} iconSize={16} iconColor="#2C2C2C">
                    <span className="ml-2">{social.label || socialConfig.label}</span>
                  </SocialIcon>
                </ShareComponent>
              </DropdownMenuItem>
            );
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
