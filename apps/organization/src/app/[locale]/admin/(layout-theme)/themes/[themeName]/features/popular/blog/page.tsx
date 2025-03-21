import { getCookie } from "@oe/core/utils/cookie";
import { ListBlogs } from "../../_components/list-blogs";

export default async function FeaturedContentsPage() {
  const domain =
    (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? "";

  return <ListBlogs domain={domain.split("/")?.[0]} />;
}
