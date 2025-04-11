import { Button } from '@oe/ui';
import { CheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Header({ loading }: { loading: boolean }) {
  const tCourse = useTranslations('course');
  return (
    <div className="flex items-center justify-between rounded-lg bg-background p-4 shadow-xs">
      <h1 className="mb-0 font-semibold text-xl">{tCourse('information.title')}</h1>
      <Button size="sm" type="submit" disabled={loading} loading={loading}>
        {tCourse('common.actions.save')} <CheckIcon className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
