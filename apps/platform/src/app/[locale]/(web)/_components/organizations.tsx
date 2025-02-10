import type { IOrganization } from "@oe/api/types/organizations";
// import AvailLogo from "@oe/assets/images/openedu-homepage/organizations/logo-avail.png";
// import VBILogo from "@oe/assets/images/openedu-homepage/organizations/logo-vbi.png";
// import OrgAvail from "@oe/assets/images/openedu-homepage/organizations/org-avail.png";
// import OrgVbi from "@oe/assets/images/openedu-homepage/organizations/org-vbi.png";
import { Link } from "@oe/ui/common/navigation";
import { Image } from "@oe/ui/components/image";
import { useTranslations } from "next-intl";

export default function OrganizationSection({
  organizations,
}: {
  organizations?: IOrganization[];
}) {
  const t = useTranslations("homePageLayout.organizationSection");

  return (
    <section className="py-5 lg:py-10">
      <div className="container mx-auto px-0 md:px-4">
        <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-4 font-bold md:mb-8">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {organizations?.map((org) => (
            <Link
              href={org?.domain}
              key={org.name}
              target="_blank"
              className="block h-auto space-y-4 bg-gradient-to-b from-25% from-white via-60% via-[#F2F1FF] to-100% to-[#F2F1FF]/30 p-4 text-black hover:no-underline"
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
                <span className="giant-iheading-semibold20 md:giant-iheading-semibold24 font-medium">
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
