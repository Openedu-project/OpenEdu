import { FeaturedBlog } from "@oe/dashboard";

export default function FeaturedContentsPage() {
  // const domain =
  //   (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? "";
  // const [orgData] = await Promise.all([
  //   getOrgByDomainService(undefined, {
  //     domain: domain?.split("/")?.[0] ?? domain,
  //   }),
  // ]);
  // return <ListBlogs domain={orgData?.domain ?? orgData?.alt_domain} />;
  return <FeaturedBlog />;
}
