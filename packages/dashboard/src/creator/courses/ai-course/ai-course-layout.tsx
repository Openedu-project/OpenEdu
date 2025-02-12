import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { cn } from '@oe/ui/utils/cn';
import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { AICourseNavMenu } from './_components/ai-course-nav';

export default function AICourseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex items-center justify-center gap-2 py-4">
        <Link href={CREATOR_ROUTES.courses} variant="ghost" activeClassName="">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <div className="flex grow items-center justify-center">
          <AICourseNavMenu />
        </div>
      </div>
      <div className="overflow-hidden rounded p-4">
        <div className={cn('scrollbar h-full overflow-auto')}>{children}</div>
      </div>
    </>
  );
}
