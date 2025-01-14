import AvailLogo from '@oe/assets/images/openedu-homepage/organizations/logo-avail.png';
import VBILogo from '@oe/assets/images/openedu-homepage/organizations/logo-vbi.png';
import OrgAvail from '@oe/assets/images/openedu-homepage/organizations/org-avail.png';
import OrgVbi from '@oe/assets/images/openedu-homepage/organizations/org-vbi.png';
import { Image } from '@oe/ui/components/image';
import { useTranslations } from 'next-intl';

const createOrganizations = () => [
  {
    name: 'vbi',
    cardImage: OrgVbi.src,
    logo: VBILogo.src,
  },
  {
    name: 'avail',
    cardImage: OrgAvail.src,
    logo: AvailLogo.src,
  },
];

export default function OrganizationSection() {
  const t = useTranslations('homePageLayout.organizationSection');
  const organizations = createOrganizations();

  return (
    <section className="py-5 lg:py-10">
      <div className="container mx-auto px-0 md:px-4">
        <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-4 font-bold md:mb-8">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {organizations.map(org => (
            <div key={org.name} className="space-y-4">
              <div className="relative flex overflow-hidden rounded-3xl bg-white">
                <Image
                  src={org.cardImage}
                  alt={`${org.name} card`}
                  height={384}
                  width={540}
                  className="object-contain "
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white p-2">
                  <Image src={org.logo} alt={org.name} width={68} height={68} className="rounded-full" />
                </div>
                <span className="giant-iheading-semibold20 md:giant-iheading-semibold24 font-medium">{org.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
