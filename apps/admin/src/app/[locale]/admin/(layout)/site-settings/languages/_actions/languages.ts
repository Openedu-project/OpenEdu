'use server';

import { createOrUpdateI18nConfig } from '@oe/api/services/i18n';
import type { LanguageCode } from '@oe/i18n/languages';
import { revalidatePath } from 'next/cache';
import { revalidateTag } from 'next/cache';

export async function createOrUpdateI18nConfigAction({
  data,
  id,
}: { data: { locales?: LanguageCode[]; locale?: LanguageCode }; id?: string }) {
  const response = await createOrUpdateI18nConfig({ data, id });
  // const { origin } = await getAPIReferrerAndOrigin();
  revalidateTag('/api/v1/system-configs?keys=i18n_config&domains=openedu101dev.com');
  revalidatePath('/');
  return response;
}
