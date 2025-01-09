import { getMeServiceWithoutError } from '@oe/api/services/auth';
import { getTranslations } from 'next-intl/server';
import { AIModule } from '#components/conversation';

export default async function AIAssistantPage() {
  const [tAI, me] = await Promise.all([getTranslations('aiAssistant'), getMeServiceWithoutError()]);

  return (
    <div className="container flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-center px-4 py-8">
      <h2 className="mcaption-regular24 md:giant-iheading-bold40 !font-normal mb-6 text-center">
        {tAI.rich('aiHelloText', { name: (me?.display_name?.length ?? 0) > 0 ? me?.display_name : me?.username })}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <AIModule showDesc className="items-start shadow" />
      </div>
    </div>
  );
}
