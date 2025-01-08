'use client';
import type { IUserProfile } from '@oe/api/types/user-profile';
import { pickCharacters } from '@oe/core/utils/helpers';
import { Avatar, AvatarFallback, AvatarImage } from '@oe/ui/shadcn/avatar';
import { Card } from '@oe/ui/shadcn/card';
import type React from 'react';
import type { HTMLAttributes } from 'react';
import { FollowButton } from '#components/follow-button';
import { cn } from '#utils/cn';
interface IProfileCardProps extends HTMLAttributes<HTMLDivElement> {
  profileData: IUserProfile;
  align?: boolean;
  avatarSize?: number;
  desc?: string;
  wrapperClassName?: string;
  infoClassName?: string;
  handleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  followBtn?: boolean;
}
export default function ProfileCard({
  profileData,
  align = false,
  handleClick,
  avatarSize,
  className,
  wrapperClassName = '',
  infoClassName = '',
  desc,
  followBtn = false,
}: IProfileCardProps) {
  return (
    <Card
      className={cn(
        'rounded-sm bg-transparent p-3 shadow-shadow-6',
        align && 'max-w-[200px] px-10 py-3',
        className,
        handleClick && 'cursor-pointer'
      )}
      onClick={e => {
        e.stopPropagation();
        handleClick?.(e);
      }}
    >
      <div className={cn('flex w-full items-center justify-between gap-2', align && 'flex-col')}>
        <div className={cn('flex w-full items-center gap-2', align && 'flex-col', wrapperClassName)}>
          <Avatar className="h-[36px] w-[36px]" style={{ height: `${avatarSize}px`, width: `${avatarSize}px` }}>
            <AvatarImage src={profileData?.avatar ?? ''} alt={profileData?.username} />
            <AvatarFallback className="mcaption-semibold12">
              {pickCharacters(profileData.display_name.length > 0 ? profileData.display_name : profileData?.username)}
            </AvatarFallback>
          </Avatar>
          <div className={cn('w-full', align && 'text-center', infoClassName)}>
            <p className={cn('mcaption-semibold12 line-clamp-2 text-foreground')}>
              {profileData?.display_name ?? profileData?.username}
            </p>
            {desc && <p className={cn('mcaption-regular9 mt-1 line-clamp-3 text-foreground')}>{desc}</p>}
          </div>
          {followBtn && <FollowButton isFollowed={profileData.status === 'followed'} userId={profileData.id} />}
        </div>
      </div>
    </Card>
  );
}
