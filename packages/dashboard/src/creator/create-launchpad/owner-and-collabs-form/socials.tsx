import type { IUserProfile } from '@oe/api';
import { FormFieldWithLabel } from '@oe/ui';
import { Input } from '@oe/ui';
import { Globe, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { NoticeBlock } from '../notice-block';

interface SocialsProps {
  profile: IUserProfile;
}

type Social = {
  name: string;
  link: string;
};

const Socials = ({ profile }: SocialsProps) => {
  const tLaunchpad = useTranslations('creatorSettingLaunchpad.ownerAndCollabs');
  const telegram = profile.props?.telegram;

  const socialsFilter: Social[] = profile?.props
    ? Object.entries(profile.props)
        .filter(([key, value]) => value !== '' && key !== 'telegram')
        .map(([key, value]) => ({
          name: key,
          link: value as string,
        }))
    : [];

  return (
    <div className="mt-4 flex flex-col">
      <div>
        {socialsFilter?.map(social => (
          <div key={social.name} className="flex items-center space-x-2">
            <Globe size={20} />
            <a
              href={social?.link}
              target="_blank"
              rel="noreferrer"
              className="line-clamp-2 overflow-hidden text-ellipsis whitespace-pre-wrap break-all md:line-clamp-1"
            >
              {social?.link}
            </a>
          </div>
        ))}
      </div>
      <div>
        <h2 className="mt-4 font-semibold text-base text-neutral-800">{tLaunchpad('verifyEmail')} *</h2>
        <span className="flex items-center space-x-2 rounded-lg border border-neutral-100 bg-neutral-20 px-4 py-2 text-neutral-900">
          <Mail size={18} />
          <p>{profile?.email}</p>
        </span>
      </div>
      <div>
        <h2 className="mt-4 font-semibold text-base text-neutral-800">{tLaunchpad('telegramLink')} *</h2>
        <FormFieldWithLabel name="telegram" className="" showErrorMessage>
          <Input />
        </FormFieldWithLabel>
        {telegram && telegram !== '' ? (
          <div />
        ) : (
          <NoticeBlock
            title=""
            content={
              <p className="">
                {tLaunchpad.rich('updateTelegramMessage', {
                  bold: chunks => <b className="text-primary">{chunks}</b>,
                })}
              </p>
            }
          />
        )}
      </div>
    </div>
  );
};

export { Socials };
