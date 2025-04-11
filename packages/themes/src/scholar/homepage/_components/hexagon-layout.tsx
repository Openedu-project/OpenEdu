import type { FileType } from '@oe/ui';
import { Image } from '@oe/ui';
import { HexagonShape } from './hexagon-shape';
interface HexagonLayoutProps {
  bannerMain?: FileType;
  bannerTop?: FileType;
  bannerBottom?: FileType;
}

const HexagonLayout = ({ bannerMain, bannerTop, bannerBottom }: HexagonLayoutProps) => {
  return (
    <div className="flex min-h-1/2 items-center justify-center bg-primary p-8 pr-0 md:pr-8">
      <div className="relative aspect-square w-full max-w-3xl">
        {/* Main Large Hexagon */}
        <HexagonShape size="full" borderColor="#FFFFFF" borderWidth={4}>
          <Image src={bannerMain?.url} alt="Team member working" className="object-cover" noContainer />
        </HexagonShape>

        {/* Top Small Hexagon */}
        <div className="-translate-x-1/2 absolute top-0 left-0">
          <HexagonShape size="md" borderColor="#FFFFFF" borderWidth={4}>
            <Image src={bannerTop?.url} alt="Team member working" className="object-cover" noContainer />
          </HexagonShape>
        </div>

        {/* Bottom Small Hexagon */}
        <div className="absolute bottom-0 left-0 translate-x-1/4">
          <HexagonShape size="sm" borderColor="#FFFFFF" borderWidth={4}>
            <Image src={bannerBottom?.url} alt="Team member working" className="object-cover" noContainer />
          </HexagonShape>
        </div>
      </div>
    </div>
  );
};

export { HexagonLayout };
