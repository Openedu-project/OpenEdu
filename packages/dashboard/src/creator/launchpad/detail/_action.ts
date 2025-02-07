'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateAdminLaunchpadDetail() {
  await revalidateTag('getAdminLaunchpadDetailService');
}
