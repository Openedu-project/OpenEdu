import { useTranslations } from 'next-intl';

import type { ICourseOutline } from '@oe/api';
import certificateImg from '@oe/assets/images/certificate.png';
import { Award } from 'lucide-react';
import { Image } from '#components/image';
import { Card, CardContent } from '#shadcn/card';
import { CourseSection } from '../course-section';
import { CourseCertificateRequirements } from './cert-requirements';
import { CertificateBadge } from './certificate-badge';

export function CourseCertificate({
  courseOutline,
}: {
  courseOutline: ICourseOutline;
}) {
  const tCourse = useTranslations('courseOutline.certificate');

  const { props, owner, org } = courseOutline;
  const { mint_cert_nft_settings, certificate_condition } = props;

  return courseOutline?.has_certificate ? (
    <CourseSection title={tCourse('title')}>
      <Card>
        <CardContent className="p-2 md:p-4">
          <div className="flex flex-col items-center sm:flex-row sm:items-start md:flex-col md:items-center lg:flex-row lg:items-start">
            <div className="mr-0 mb-3 sm:mr-4 sm:w-1/4 md:mr-0 md:w-full lg:mr-6 lg:mb-0 lg:w-1/4">
              {/* <div className="relative"> */}
              <Image
                src={certificateImg?.src}
                alt="Certificate Sample"
                width={166}
                height={117}
                rounded="lg"
                className="max-w-[320px]"
              />
              {/* </div> */}
            </div>
            <div className="w-full space-y-4 text-foreground/75 sm:w-3/4 md:w-full lg:w-3/4">
              {/* <h3 className="mcaption-semibold14 mb-3">{tCourse('subTitle')}</h3> */}
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <CertificateBadge badgeType="default" />
                {mint_cert_nft_settings?.enabled && (
                  <>
                    <CertificateBadge badgeType="nft" />
                    {mint_cert_nft_settings?.gas_fee_payer !== 'learner' && <CertificateBadge badgeType="sponsor" />}
                  </>
                )}
              </div>
              <p className="mcaption-regular14">{tCourse('desc')}</p>

              <CourseCertificateRequirements certificateCondition={certificate_condition} />

              {mint_cert_nft_settings?.enabled && mint_cert_nft_settings?.gas_fee_payer !== 'learner' && (
                <div className="flex items-center gap-2 bg-warning/10 p-2">
                  <Award color="var(--warning)" />
                  <span className="mcaption-regular14 flex-1">
                    {tCourse('nftSponsoredBy')}
                    <span className="mcaption-semibold14 ml-[3px]">
                      {mint_cert_nft_settings?.gas_fee_payer === 'creator' ? owner?.display_name : org?.name}
                    </span>
                    .<span className="ml-[3px]">{tCourse('thisDigital')}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </CourseSection>
  ) : null;
}
