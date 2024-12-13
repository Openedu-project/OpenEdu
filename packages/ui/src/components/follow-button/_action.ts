'use server';

import { followUserService } from '@oe/api/services/user';
import { revalidateTag } from 'next/cache';

export const triggerFollow = async ({
  userId,
  followed,
  validateTags,
}: { userId: string; followed: boolean; validateTags?: string[] }) => {
  try {
    await followUserService(followed ? 'unfollow' : 'follow', undefined, userId);
    validateTags?.map(tag => revalidateTag(tag));
  } catch (error) {
    console.error(error);
  }
};
