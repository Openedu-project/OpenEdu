'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

type RevalidateResponse = {
  success: boolean;
  error?: string;
};

export async function revalidateData(type: 'tag' | 'path', value: string): Promise<RevalidateResponse> {
  try {
    if (type === 'tag') {
      await revalidateTag(value);
    } else {
      await revalidatePath(value);
    }
    return { success: true };
  } catch (error) {
    console.error('Revalidation error:', error);
    return { success: false, error: 'Failed to revalidate' };
  }
}
