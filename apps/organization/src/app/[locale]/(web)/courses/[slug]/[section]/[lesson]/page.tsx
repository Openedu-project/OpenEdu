import { LearningPage } from "@oe/ui";

export default async function CourseLearningPage({
  params,
}: {
  params: Promise<{ slug: string; section: string; lesson: string }>;
}) {
  const slug = (await params).slug;
  const section = (await params).section;
  const lesson = (await params).lesson;

  return (
    <div>
      <LearningPage slug={slug} section={section} lesson={lesson} />
    </div>
  );
}
