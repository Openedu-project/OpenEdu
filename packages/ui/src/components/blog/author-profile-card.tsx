import type { IUserProfile } from '@oe/api/types/user-profile';
import avatar from '@oe/assets/images/org-avatar.png';
import { abbreviateNumber, pickCharacters } from '@oe/core/utils/helpers';
import { BLOG_ROUTES, PLATFORM_ROUTES, generateRoute } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '#shadcn/avatar';
import { buttonVariants } from '#shadcn/button';
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area';
import { cn } from '#utils/cn';
import FollowButton from '../follow-button/follow-button';
import { Image } from '../image';

interface IAuthorProfile {
  profile: IUserProfile;
  className?: string;
  isMe?: boolean;
  validateTags?: string[];
}
export default function AuthorProfileCard({ profile, className, isMe = false, validateTags }: IAuthorProfile) {
  const t = useTranslations('authorProfileCard');
  const tGeneral = useTranslations('general');

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-2 p-4 text-foreground shadow-lg',
        className
      )}
    >
      <Link
        href={generateRoute(PLATFORM_ROUTES.userProfile, { username: profile?.username })}
        className="h-auto"
        target="_blank"
      >
        <Avatar className="h-[120px] w-[120px] cursor-pointer">
          <AvatarImage src={profile?.avatar ?? ''} alt={profile?.username} />
          <AvatarFallback>
            {profile?.display_name && profile.display_name?.length > 0
              ? pickCharacters(profile.display_name)
              : pickCharacters(profile?.username ?? '')}
          </AvatarFallback>
        </Avatar>
      </Link>
      <p className="giant-iheading-semibold28 text-center">{profile.display_name ?? profile.username}</p>
      <div className="mcaption-semibold16 flex flex-wrap gap-3 text-foreground">
        <span>
          {(profile.followers ?? 0 > 1)
            ? t.rich('numberFollowers', { number: abbreviateNumber(profile.followers) })
            : t.rich('numberFollower', { number: abbreviateNumber(profile.followers ?? 0) })}
        </span>
        <span>&#x2022;</span>
        <span>
          {(profile.total_blogs ?? 0 > 1)
            ? t.rich('numberArticles', { number: abbreviateNumber(profile.total_blogs) })
            : t.rich('numberArticle', { number: abbreviateNumber(profile.total_blogs ?? 0) })}
        </span>
      </div>

      <p className="mcaption-regular12 text-center">{profile.about}</p>
      {isMe ? (
        <>
          <Link
            className={cn(
              buttonVariants({ variant: 'outline' }),
              '!no-underline min-w-[80%] border-primary text-primary'
            )}
            href={BLOG_ROUTES.blogCreation}
          >
            {tGeneral('write')}
          </Link>
          <Link
            className={cn(buttonVariants({ variant: 'primary' }), '!no-underline min-w-[80%]')}
            href={BLOG_ROUTES.blogManagement}
          >
            {t('blogManagement')}
          </Link>
        </>
      ) : (
        <FollowButton
          className="min-w-[80%]"
          userId={profile.id}
          isFollowed={profile.status === 'followed'}
          validateTags={validateTags}
        />
      )}

      {profile.writer_in_orgs && profile.writer_in_orgs.length > 0 && (
        <div className=" w-full border-t py-4">
          <p className="mcaption-semibold16 text-foreground">{t('memberOfOrg')}</p>
          <ScrollArea className="w-full">
            <div className="mt-4 flex gap-4">
              {profile.writer_in_orgs?.map(org => (
                <Link
                  key={org.id}
                  className="flex h-auto flex-col items-center p-2 hover:bg-primary/10"
                  href={`https://${org.domain}/en${BLOG_ROUTES.blog}`}
                  target="_blank"
                >
                  <div className="relative flex min-w-[50px] justify-center rounded-full border-2">
                    <Image
                      src={org.thumbnail?.url ?? avatar.src}
                      alt={org.name}
                      className="rounded-full"
                      width={32}
                      height={32}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <p className="mcaption-semibold12 mt-2 w-full text-wrap text-center text-foreground">{org.name}</p>
                </Link>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
