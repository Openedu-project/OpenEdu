'use client';

import type { IUserProfile } from '@oe/api';
// import { Flag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Link } from '#common/navigation';
// import Newletter from '@oe/icons/newletter';
// import ShareSocial from '@oe/icons/share-social';
// import { Avatar, AvatarFallback, AvatarImage } from "#shadcn/avatar";
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';

import { createAPIUrl } from '@oe/api';
// import orgAvatarDark from '@/assets/images/org-ava-dark.png';
import background from '@oe/assets/images/user-background.png';
import { PLATFORM_ROUTES } from '@oe/core';
// import { pickCharacters } from "@oe/core";
import { Image } from '#components/image';
import { UserAvatar } from '#components/user-avatar';
import { useUserRoleStore } from '../_store/userProfileStore';

interface IUserBioProps {
  data: IUserProfile;
  isMe: boolean;
  handleFollowUser: () => void;
}

interface RoleMapping {
  roleId: string[];
  displayName: string;
}

export function UserBio({ data, isMe, handleFollowUser }: IUserBioProps) {
  const tProfile = useTranslations('userProfile.profile');

  const [showAll, setShowAll] = useState<boolean>(false);

  const { filterUserData } = useUserRoleStore();

  const filteredOrgs = filterUserData();

  const { display_name, username, avatar, cover_photo, status } = data;

  const roleMappings: RoleMapping[] = [
    { roleId: ['partner'], displayName: 'Educator' },
    { roleId: ['org_writer'], displayName: 'Writer' },
    { roleId: ['org_editor'], displayName: 'Editor' },
    { roleId: ['org_moderator', 'org_admin'], displayName: 'Admin' },
  ];

  const getRoleDisplayNames = (): string[] =>
    roleMappings
      .filter(mapping => filteredOrgs?.some(org => mapping?.roleId?.includes(org?.role_id)))
      .map(mapping => mapping.displayName);

  const roleDisplayNames = getRoleDisplayNames();

  const validOrgs = useMemo(
    () =>
      // Always include the first org, then filter the rest based on org_name
      [filteredOrgs[0], ...filteredOrgs.slice(1).filter(org => org?.org_name?.length > 0)],
    [filteredOrgs]
  );

  const visibleOrgs = showAll ? validOrgs : filteredOrgs?.slice(0, 2);
  const hasMore = filteredOrgs?.slice(2)?.some(org => org?.org_name?.length > 0);

  return (
    <div className={cn('relative mb-12', roleDisplayNames?.length === 0 && 'sm:mb-28')}>
      <div className="relative">
        <Image
          src={cover_photo?.length > 0 ? cover_photo : background.src}
          alt=""
          width={1080}
          height={316}
          quality={100}
          className="aspect-video max-h-[316px] object-cover"
        />
      </div>

      <div className="relative flex flex-col gap-[100px] px-3 sm:flex-row sm:gap-6">
        <div className="relative flex w-[140px] items-end justify-end sm:w-[160px] md:w-[200px]">
          <div className="-translate-y-1/3 sm:-translate-y-1/4 absolute top-0 left-0">
            {/* <Avatar className="h-[140px] w-[140px] border-[6px] border-white sm:h-[160px] sm:w-[160px] md:h-[200px] md:w-[200px]">
              <AvatarImage src={avatar} alt="avatar" />
              <AvatarFallback className="giant-iDisplay-bold48 sm:giant-iDisplay-bold64">
                {display_name?.length > 0
                  ? pickCharacters(display_name)
                  : pickCharacters(username)}
              </AvatarFallback>
            </Avatar> */}
            <UserAvatar
              name={display_name?.length > 0 ? display_name : username}
              src={avatar ?? ''}
              className="[&>div]:giant-iDisplay-bold48 sm:[&>div]:giant-iDisplay-bold64 h-[140px] w-[140px] rounded-full border-[6px] border-white sm:h-[160px] sm:w-[160px] md:h-[200px] md:w-[200px]"
            />
          </div>
        </div>

        <div className="mt-2 px-3 last:mb-0 sm:px-0 md:mt-6">
          <h4 className="giant-iheading-semibold28 mb-3 sm:max-w-80 lg:max-w-none">
            {display_name?.length > 0 ? display_name : username}
          </h4>

          <div className="mcaption-semibold20 flex flex-col justify-between gap-3">
            <div>
              {roleDisplayNames?.length > 0 &&
                roleDisplayNames?.map((role, index) => (
                  <span key={role} className="mb-3 text-primary">
                    {index > 0 && <span> . </span>}&nbsp;
                    {tProfile(role.toLowerCase())}
                  </span>
                ))}
            </div>
            {filteredOrgs?.length > 0 && (
              <div className="flex items-center">
                {/* <span className="text-secondary">{tProfile('organization')}:</span> */}
                <span className="mcaption-regular16 mr-4 text-neutral-900">{tProfile('for')}</span>
                <div className="flex flex-wrap items-start gap-2">
                  {visibleOrgs.map((item, index) => (
                    <div key={item?.org_id} className="flex flex-wrap">
                      <Link
                        href={`//${item?.org_domain}`}
                        target="_blank"
                        className="flex items-center justify-center p-0 text-forground"
                      >
                        {/* <div className="w-6 h-6">
                        <Image src={orgAvatar.src} alt="" width={24} height={24} className="w-full h-full" />
                      </div> */}

                        <span className="mcaption-semibold16 line-clamp-1 flex-1 text-center">{item?.org_name}</span>
                      </Link>
                      {validOrgs?.length > 0 && index < validOrgs.length - 1 && validOrgs?.length > 1 && (
                        <span className="mcaption-semibold16 !leading-[40px] h-10 text-center">,</span>
                      )}
                    </div>
                  ))}

                  {hasMore && (
                    // <div className="flex items-center justify-center mr-3 last:mr-0">
                    //   <div className="relative w-6 h-1/2">
                    //     <Image src={orgAvatarDark.src} alt="" width={24} height={24} />
                    //     <span className="mbutton-bold12 text-white absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    //       +{filteredOrgs.length - 2}
                    //     </span>
                    //   </div>
                    //   <span className="mcaption-semibold12 ml-3">{tProfile('more')}</span>
                    // </div>
                    <Button
                      variant="ghost"
                      className="!rounded-none mbutton-bold12 h-10 border-primary border-b p-0 text-primary no-underline hover:bg-transparent hover:text-primary sm:ml-2"
                      onClick={() => setShowAll(!showAll)}
                    >
                      {showAll ? tProfile('seeLess') : tProfile('more')}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {isMe ? (
          <div className="absolute top-3 right-3 flex flex-col justify-end gap-2 md:top-6 lg:flex-row-reverse lg:gap-3">
            <Link
              href={createAPIUrl({
                endpoint: PLATFORM_ROUTES.editProfileInformation,
                params: { username },
              })}
              className="mbutton-bold12 sm:mbutton-regular16 rounded-2 bg-primary px-5 py-[6px] text-center text-primary-foreground"
            >
              {tProfile('editProfile')}
            </Link>
            <Link
              href={PLATFORM_ROUTES.learner}
              className="mbutton-bold12 sm:mbutton-regular16 rounded-2 bg-primary px-5 py-[6px] text-center text-primary-foreground"
            >
              {tProfile('myLearningSpace')}
            </Link>
          </div>
        ) : (
          <Button
            variant="default"
            size="default"
            onClick={handleFollowUser}
            className="absolute top-3 right-3 md:top-6"
          >
            {status === 'followed' ? 'Following' : tProfile('follow')}
          </Button>
        )}

        {/* <div className="flex gap-8 justify-end ml-0 mt-auto">
          <Newletter />
          <ShareSocial color="#2C2C2C" />
          {!isMe && <Flag />}
        </div> */}
      </div>
    </div>
  );
}
