import { getOrgByDomainService } from "@oe/api/services/organizations";
import { getCookie } from "@oe/core/utils/cookie";
import { ListPopularCourses } from "../../_components/list-popular-courses";

export default async function FeaturedContentsPage() {
  const domain =
    (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? "";
  const orgData = await getOrgByDomainService(undefined, { domain });

  return <ListPopularCourses orgId={orgData?.id} />;
}
