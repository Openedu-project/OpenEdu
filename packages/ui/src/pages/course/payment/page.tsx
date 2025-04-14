import type { ICourseOutline } from '@oe/api';
import { PaymentPage } from './_components/payment';

export function Payment({ courseData }: { courseData: ICourseOutline }) {
  return <PaymentPage courseData={courseData} />;
}
