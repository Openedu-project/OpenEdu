'use client';

import type { ICourseResponse } from '@oe/api/types/course/course';
import NotCreator from './no-creator-notice';
import SelectCreateCourse from './select-create-course';

const LaunchpadDialogContent = ({
  dataCouses,
  isPartner,
}: {
  dataCouses: ICourseResponse | undefined;
  isPartner: boolean;
}) => {
  return <>{isPartner ? <SelectCreateCourse dataCouses={dataCouses?.results || null} /> : <NotCreator />}</>;
};

export default LaunchpadDialogContent;
