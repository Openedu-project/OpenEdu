import type { ICourseOutline } from "@oe/api/types/course/course";
import PaymentPage from "./_components/payment";

export default function Payment({
  courseData,
}: {
  courseData: ICourseOutline;
}) {
  return <PaymentPage courseData={courseData} />;
}
