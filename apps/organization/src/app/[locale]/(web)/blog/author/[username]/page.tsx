import { AuthorPage } from "@oe/ui";

export default function BlogAuthorPage({
  params,
}: {
  params: { username: string };
}) {
  return <AuthorPage params={params} />;
}
