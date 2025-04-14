import { AIChatPage } from "@oe/ui";

export default async function AIImageDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <AIChatPage id={id} agent="ai_image_generate" />;
}
