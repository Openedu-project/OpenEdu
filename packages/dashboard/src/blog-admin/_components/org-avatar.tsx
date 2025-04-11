import { getOrgByDomainService } from '@oe/api';
import BannerBg from '@oe/assets/images/blog-creation-bg.png';
import OpenEdu from '@oe/assets/images/openedu.png';
import { getCookie } from '@oe/core';
import { Image } from '@oe/ui';
import { cn } from '@oe/ui';
import { getTranslations } from 'next-intl/server';

export async function OrgAvatar({ className }: { className?: string }) {
  const domain = (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? '';
  const [tBlogForm, orgData] = await Promise.all([
    getTranslations('blogForm'),
    getOrgByDomainService(undefined, {
      domain,
    }),
  ]);

  return (
    <div className={cn('relative mb-6 min-h-[120px] w-full p-6', className)}>
      <Image
        src={BannerBg.src}
        alt="creation-banner"
        noContainer
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        className="h-full w-full rounded-xl"
      />
      <div className="flex flex-col flex-wrap items-center gap-4 md:flex-row">
        <div>
          <Image
            src={orgData?.thumbnail?.url ?? OpenEdu.src}
            alt="creation-banner"
            aspectRatio="1:1"
            fill
            sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
            style={{ objectFit: 'contain' }}
            className="h-[80px] w-[80px] rounded-full border bg-background"
            containerHeight="auto"
          />
        </div>
        <p className="giant-iheading-bold20 lg:giant-iheading-bold40 z-10 text-foreground">
          {tBlogForm.rich('ownerBlog', {
            name: orgData?.name ?? 'Organization',
          })}
        </p>
      </div>
    </div>
  );
}
