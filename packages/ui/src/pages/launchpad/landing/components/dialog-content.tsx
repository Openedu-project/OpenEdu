'use client';

import type { ICourseResponse } from '@oe/api/types/course/course';
import NoCourseNotice from './no-course-notice';
import NotCreator from './no-creator-notice';
import SelectCreateCourse from './select-create-course';

const LaunchpadDialogContent = ({
  dataCourses,
  isPartner,
}: {
  dataCourses: ICourseResponse | undefined;
  isPartner: boolean;
}) => {
  if (!isPartner) {
    return <NotCreator />;
  }

  if (dataCourses?.results.length === 0) {
    return <NoCourseNotice />;
  }

  return <SelectCreateCourse dataCouses={dataCourses?.results || null} />;
};

export default LaunchpadDialogContent;
