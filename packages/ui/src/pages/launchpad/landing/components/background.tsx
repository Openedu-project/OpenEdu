import launchpadBg from '@oe/assets/images/launchpad/launchpad-bg.svg';
// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import Image from 'next/image';

const LaunchpadBackground = () => {
  return (
    <div className="-z-50 absolute inset-0 overflow-hidden">
      <Image
        src={launchpadBg.src}
        alt="Launchpad Background"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-top"
      />
    </div>
  );
};

export { LaunchpadBackground };
