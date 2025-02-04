import { Image } from '@oe/ui/components/image';

import BannerBg from '@oe/assets/images/learner-dashboard-banner.png';

export default function WelcomeBanner({ username }: { username: string }) {
  return (
    <div className="relative z-10 rounded-[12px] p-6">
      <span className="giant-iheading-semibold20 md:giant-iheading-semibold32">Welcome {username}!</span>
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
