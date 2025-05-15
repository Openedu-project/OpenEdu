import { BlogCreationPage } from "@oe/ui";
// export const dynamic = "force-dynamic";

export default async function CreationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return <BlogCreationPage id={id} action="update" />;
}
