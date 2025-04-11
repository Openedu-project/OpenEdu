import { AIGenCourseInfoPage } from "@oe/dashboard";

export default async function AIGeneralCourseInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <AIGenCourseInfoPage id={id} />;
}
