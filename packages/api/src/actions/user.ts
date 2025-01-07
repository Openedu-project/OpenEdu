'use server';

import { getUserProfileService } from '#services/user';

export const getUserProfile = async (username: string) => {
  const validateTag = `user_profile_${username}`;

  try {
    const profileData = await getUserProfileService(undefined, {
      id: username,
      init: { next: { tags: [validateTag] } },
    });
    return { validateTag, profileData };
  } catch (error) {
    console.error(error);
    return { validateTag, profileData: null };
  }
};
