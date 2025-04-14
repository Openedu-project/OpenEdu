import { Image } from '@oe/ui';

import BannerBg from '@oe/assets/images/learner-dashboard-banner.png';
import { UserAvatar } from '@oe/ui';

export function WelcomeBanner({
  username,
  avatar,
}: {
  username: string;
  avatar: string;
}) {
  return (
    <div className="relative z-10 rounded-[12px] p-6">
      <div className="flex w-full items-center justify-between">
        <div>
          <span className="giant-iheading-semibold20 md:giant-iheading-semibold32">Welcome {username}!</span>
        </div>

        <UserAvatar
          src={avatar}
          name={username}
          className="[&>div]:giant-iheading-bold18 [&>div]:sm:giant-iheading-bold32 h-10 w-10 sm:h-[72px] sm:w-[72px]"
        />
      </div>

      <Image
        src={BannerBg.src}
        alt=""
        noContainer
        fill
        sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
        className="-z-10 absolute top-0 left-0 rounded-[12px]"
      />
    </div>
  );
}
