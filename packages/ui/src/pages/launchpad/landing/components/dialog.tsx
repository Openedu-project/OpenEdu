import { getMeService } from '@oe/api/services/auth';
import { getCoursesService } from '@oe/api/services/course';
import type { ICourseResponse } from '@oe/api/types/course/course';
import { getTranslations } from 'next-intl/server';
import { Dialog, DialogTrigger } from '#shadcn/dialog';
import LaunchpadDialogContent from './dialog-content';

async function LaunchpadDialog() {
  const [t, dataMe] = await Promise.all([getTranslations('launchpadHomepage.buttons'), getMeService()]);

  const partnerRoles = dataMe?.roles?.filter(role => role.role_id === 'partner') || [];
  const isPartner = partnerRoles.length > 0;

  let dataCouses: ICourseResponse | undefined;
  if (isPartner) {
    dataCouses = await getCoursesService(undefined, {
      params: {
        page: 1,
        has_launchpad: false,
        section_count_gte: 4,
        user_id: dataMe?.id as string,
        latest: true,
        version: 1,
        is_pay: true,
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full rounded-[12px] bg-primary px-4 py-3 font-semibold text-[16px] text-sm text-white leading-tight hover:bg-primary/90 sm:w-auto sm:px-5 sm:text-base md:px-8">
        {t('createLaunchpad')}
      </DialogTrigger>

      <LaunchpadDialogContent dataCouses={dataCouses} isPartner={isPartner} />
    </Dialog>
  );
}

export default LaunchpadDialog;
