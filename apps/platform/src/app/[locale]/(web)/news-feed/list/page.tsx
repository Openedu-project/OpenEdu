import { SearchBlogPage } from "@oe/ui";
// export const dynamic = "force-dynamic";
export default async function BlogListPage({
  searchParams,
}: {
  searchParams: { n?: string };
}) {
  const { n } = await searchParams;

  return <SearchBlogPage name={n} />;
}
