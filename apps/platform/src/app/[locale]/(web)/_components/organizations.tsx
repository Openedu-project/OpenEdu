import { getFeaturedOrgs } from "@oe/api/services/featured-contents";
import { Link } from "@oe/ui/common/navigation";
import { Image } from "@oe/ui/components/image";
import { getTranslations } from "next-intl/server";

export default async function OrganizationSection() {
  const [t, organizations] = await Promise.all([
    getTranslations("homePageLayout.organizationSection"),
    getFeaturedOrgs(),
  ]);

  return (
    <section className="">
      <div className="container mx-auto px-0 md:px-4">
        <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-4 font-bold md:mb-8">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {organizations?.map((org) => (
            <Link
              href={`https://${org?.domain}`}
              key={org.name}
              target="_blank"
              className="block h-auto space-y-4 bg-gradient-to-b from-25% from-white via-60% via-primary-20 to-100% to-primary-20/30 p-4 text-black hover:no-underline"
            >
              <div className="relative flex overflow-hidden rounded-3xl">
                <Image
                  src={org?.banner?.url}
                  alt={`${org.name} card`}
                  height={384}
                  width={540}
                  className="object-contain "
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full p-2">
                  <Image
                    src={org?.thumbnail?.url}
                    alt={org.name}
                    width={68}
                    height={68}
                    className="rounded-full"
                  />
                </div>
                <span className="giant-iheading-semibold20 md:giant-iheading-semibold24 font-medium uppercase">
                  {org?.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
