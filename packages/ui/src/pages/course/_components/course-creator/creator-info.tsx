import type { IUserProfile } from '@oe/api';
import { abbreviateNumber } from '@oe/core';

// const HTTP_REGEX = /^(https?:\/\/)/;
// const HTTP_PREFIX = 'https://';

export function CreatorInfor({ creatorData }: { creatorData: IUserProfile }) {
  // const props = getFilteredSocialProps(creatorData?.props as unknown as Record<string, string>);

  const stats = [
    {
      value: creatorData.followers,
      label: creatorData.followers === 1 ? 'Follower' : 'Followers',
    },
    {
      value: creatorData.total_courses,
      label: creatorData.total_courses === 1 ? 'Course' : 'Courses',
    },
    {
      value: creatorData.total_blogs,
      label: 'Blog',
    },
  ];

  return (
    <>
      {/* <p className="mcaption-semibold14 lg:mcaption-semibold16 line-clamp-2">{creatorData?.headline}</p> */}

      <div className="mcaption-regular14 lg:mcaption-regular16 flex flex-wrap text-primary">
        {stats.map((stat, index) => (
          <span key={index} className={index < stats.length - 1 ? 'mr-3' : ''}>
            <span className="mcaption-semibold14 lg:mcaption-semibold16">{abbreviateNumber(stat.value)}</span>
            &nbsp;
            {stat.label}
          </span>
        ))}
      </div>

      {/* <div className="mcaption-regular16 flex flex-wrap gap-x-4 gap-y-2">
        {Object.entries(props).map(([key, value]) => {
          const hasHttp = HTTP_REGEX.test(value);
          if (value) {
            const url = hasHttp ? value : `${HTTP_PREFIX}${value}`;
            return (
              <Link
                key={key}
                href={url}
                target="_blank"
                className="flex h-fit items-center gap-2 p-0 text-current hover:no-underline"
              >
                {key !== 'website' ? (
                  <SocialIcon url={value} iconClassName="h-5 w-5" showText={false} iconColor="#2C2C2C" />
                ) : (
                  <Global width={20} height={20} />
                )}
                {url}
              </Link>
            );
          }
          return null;
        })}
      </div> */}
    </>
  );
}
