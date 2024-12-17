import { useTranslations } from 'next-intl';

import certificateImg from '@oe/assets/images/certificate.png';
import { Image } from '#components/image';
import { Card, CardContent } from '#shadcn/card';
import { useCourseOutlineDetailStore } from '../_store/useCourseOutlineStore';
import { CourseSection } from './course-section';

export default function CourseCertificate() {
  const tCourse = useTranslations('courseOutline.certificate');

  const { courseOutline } = useCourseOutlineDetailStore();

  return courseOutline?.has_certificate ? (
    <CourseSection title={tCourse('title')}>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <div className="mr-0 mb-3 md:mr-6 md:mb-0 md:w-1/4">
              <div className="relative">
                <Image src={certificateImg?.src} alt="Certificate Sample" width={166} height={117} rounded="lg" />
              </div>
            </div>
            <div className="w-full text-foreground/75 md:w-3/4">
              <h3 className="mcaption-semibold16 mb-3">{tCourse('subTitle')}</h3>
              <p className="mcaption-regular16">{tCourse('desc')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </CourseSection>
  ) : null;
}
