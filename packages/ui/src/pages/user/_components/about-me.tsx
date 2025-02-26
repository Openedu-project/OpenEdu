import type { IUserProfile } from '@oe/api/types/user-profile';

import { useTranslations } from 'next-intl';

import Global from '@oe/assets/icons/global';
import Mail from '@oe/assets/icons/mail';
import { abbreviateNumber } from '@oe/core/utils/helpers';
import { Link } from '#common/navigation';
import { SocialIcon } from '#components/social-icon';

export default function AboutMe({ data }: { data: IUserProfile }) {
  const tProfile = useTranslations('userProfile.profile');

  const { followers, email, props, total_courses, total_blogs, headline, about } = data;

  return (
    <div className="flex flex-col gap-6">
      {headline?.length > 0 && (
        <p className="mcaption-semibold20 text-content-neutral-color-content-neutral-strong">{headline}</p>
      )}

      <div className="mcaption-regular16 flex flex-col gap-2 md:flex-row md:gap-10">
        {props.website && props.website.length > 0 && (
          <div className="flex items-center gap-2">
            <Global />
            <Link target="_blank" href={props.website}>
              {props.website}
            </Link>
          </div>
        )}

        <Link href={`mailto:${email}`} className="flex items-center gap-2">
          <Mail color="#2C2C2C" />
          <span>{email}</span>
        </Link>

        {Object.entries(props).map(([key, value]) => {
          if (value && key !== 'website') {
            const socialLink = value?.includes('http') ? value : `//${value}`;
            return (
              <Link
                href={socialLink}
                target="_blank"
                className="flex items-center text-sm transition duration-100"
                key={key}
              >
                <SocialIcon url={value} iconClassName="h-5 w-5" showText={false} iconColor="#2C2C2C" />
              </Link>
            );
          }
          return null;
        })}
      </div>

      <div className="mcaption-regular16 text-primary">
        <span className="mr-3">
          <span className="mcaption-semibold16">{abbreviateNumber(followers)}</span>
          &nbsp;
          {followers > 1 ? tProfile('followers') : tProfile('follower')}
        </span>
        <span className="mr-3">
          <span className="mcaption-semibold16">{total_courses}</span>&nbsp;
          {total_courses > 1 ? tProfile('courses') : tProfile('course')}
        </span>
        <span>
          <span className="mcaption-semibold16">{total_blogs}</span>&nbsp;
          {tProfile('blog')}
        </span>
      </div>

      {about && <p className="text-justify">{about}</p>}
    </div>
  );
}
