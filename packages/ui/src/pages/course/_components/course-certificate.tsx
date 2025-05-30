import { useTranslations } from 'next-intl';

import type { ICourseOutline } from '@oe/api/types/course/course';
import certificateImg from '@oe/assets/images/certificate.png';
import { Image } from '#components/image';
import { Card, CardContent } from '#shadcn/card';
import { CourseSection } from './course-section';

export default function CourseCertificate({
  courseOutline,
}: {
  courseOutline: ICourseOutline;
}) {
  const tCourse = useTranslations('courseOutline.certificate');

  return courseOutline?.has_certificate ? (
    <CourseSection title={tCourse('title')}>
      <Card>
        <CardContent className="p-2 md:p-4">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <div className="mr-0 mb-3 md:mr-6 md:mb-0 md:w-1/4">
              <div className="relative">
                <Image src={certificateImg?.src} alt="Certificate Sample" width={166} height={117} rounded="lg" />
              </div>
            </div>
            <div className="w-full text-foreground/75 md:w-3/4">
              <h3 className="mcaption-semibold14 mb-3">{tCourse('subTitle')}</h3>
              <p className="mcaption-regular14">{tCourse('desc')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </CourseSection>
  ) : null;
}
