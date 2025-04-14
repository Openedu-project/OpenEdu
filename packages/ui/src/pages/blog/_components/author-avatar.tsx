import BannerBg from '@oe/assets/images/blog-creation-bg.png';
import { getTranslations } from 'next-intl/server';
import { Image } from '#components/image';
import { UserAvatar } from '#components/user-avatar';
import { cn } from '#utils/cn';

export async function AuthorAvatar({
  className,
  name,
  avatar,
}: {
  className?: string;
  name: string;
  avatar: string;
}) {
  const tBlogForm = await getTranslations('blogForm');

  return (
    <div className={cn('relative mb-6 min-h-[120px] w-full p-6', className)}>
      <Image
        src={BannerBg.src}
        alt="creation-banner"
        noContainer
        fill
        sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
        style={{ objectFit: 'cover' }}
        className="h-full w-full rounded-xl"
      />
      <div className="flex flex-col flex-wrap items-center gap-4 md:flex-row">
        <UserAvatar
          className="relative h-[80px] w-[80px] flex-inline shrink-0 rounded-full border-2"
          src={avatar}
          name={name}
        />

        <p className="giant-iheading-bold20 lg:giant-iheading-bold40 z-10 text-foreground">
          {tBlogForm.rich('ownerBlog', {
            name,
          })}
        </p>
      </div>
    </div>
  );
}
