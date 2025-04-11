import { OrgBlogCreation } from "@oe/dashboard";

export default async function EditOrgBlogPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { next: string };
}) {
  const [{ id }, { next }] = await Promise.all([params, searchParams]);
  return <OrgBlogCreation id={id} action="update" prevUrl={next} />;
}
