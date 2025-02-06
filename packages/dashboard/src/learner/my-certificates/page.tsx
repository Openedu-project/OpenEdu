import { getMeServiceWithoutError } from '@oe/api/services/auth';
import MyCertificatesContent from './_components/my-certificates-content';

export default async function LearnerMyCertificates() {
  const me = await getMeServiceWithoutError();

  return <MyCertificatesContent meData={me} />;
}
