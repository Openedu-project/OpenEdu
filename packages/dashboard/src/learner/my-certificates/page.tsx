import { getMeServiceWithoutError } from '@oe/api';
import { MyCertificatesContent } from './_components/my-certificates-content';

export async function LearnerMyCertificates() {
  const me = await getMeServiceWithoutError();

  return <MyCertificatesContent meData={me} />;
}
