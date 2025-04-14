import Algro from "@oe/assets/images/openedu-homepage/partners/algro.png";
import Avail from "@oe/assets/images/openedu-homepage/partners/avail.png";
import Cardano from "@oe/assets/images/openedu-homepage/partners/cardano.png";
import Ethereum from "@oe/assets/images/openedu-homepage/partners/ethereum.png";
import Move from "@oe/assets/images/openedu-homepage/partners/move.png";
import Near from "@oe/assets/images/openedu-homepage/partners/near.png";
import Polkadot from "@oe/assets/images/openedu-homepage/partners/polkadot.png";
import Sui from "@oe/assets/images/openedu-homepage/partners/sui.png";
import Vbi from "@oe/assets/images/openedu-homepage/partners/vbi.png";
import { Image } from "@oe/ui";
import { Marquee } from "@oe/ui";

interface PartnerLogoProps {
  name: string;
  logo: string;
}

function PartnerLogo({ name, logo }: PartnerLogoProps) {
  return (
    <div className="relative h-8 w-[120px] md:w-[160px]">
      <Image
        src={logo}
        alt={`${name} logo`}
        width={160}
        height={32}
        className="h-[40px] w-auto object-contain"
        sizes="(max-width: 768px) 120px, 160px"
      />
    </div>
  );
}

const partners = [
  {
    name: "Polkadot",
    logo: Polkadot.src,
  },
  {
    name: "Algorand",
    logo: Algro.src,
  },
  {
    name: "Movement",
    logo: Move.src,
  },
  {
    name: "Ethereum",
    logo: Ethereum.src,
  },
  {
    name: "Sui",
    logo: Sui.src,
  },
  {
    name: "Cardano",
    logo: Cardano.src,
  },
  {
    name: "Avail",
    logo: Avail.src,
  },
  {
    name: "VBI",
    logo: Vbi.src,
  },
  {
    name: "Near",
    logo: Near.src,
  },
];

export function PartnerSection() {
  return (
    <section className="py-2 lg:py-4">
      <Marquee>
        {partners.map((partner) => (
          <PartnerLogo
            key={partner.name}
            name={partner.name}
            logo={partner.logo}
          />
        ))}
      </Marquee>
    </section>
  );
}
