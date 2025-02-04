import { getMeServiceWithoutError } from '@oe/api/services/auth';
import { getCertByUserIdService } from '@oe/api/services/certificate';
import MyCertificatesContent from './_components/my-certificates-content';

export default async function LearnerMyCertificates() {
  const me = await getMeServiceWithoutError();
  const myCertificates = await getCertByUserIdService(undefined, {
    params: { user_id: me?.id ?? '' },
  });

  return <MyCertificatesContent certificates={myCertificates} />;
}
