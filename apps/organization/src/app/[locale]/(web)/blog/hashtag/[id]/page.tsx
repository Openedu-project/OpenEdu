import { HashtagBlogPage } from "@oe/ui";

export default async function HashtagBlog({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <HashtagBlogPage
      id={id.split("%20")[0] ?? ""}
      name={id.split("%20").slice(1).join(" ")}
    />
  );
}
