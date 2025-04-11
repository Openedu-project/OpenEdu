import type { FileType } from '@oe/ui';
import { Image } from '@oe/ui';
import { Card, CardContent } from '@oe/ui';

interface SolutionCardProps {
  name?: string;
  icon?: FileType;
  description?: string;
}

const SolutionCard = ({ name, icon, description }: SolutionCardProps) => {
  return (
    <Card key={name} className="transition-shadow hover:shadow-lg">
      <CardContent className="grid grid-cols-[64px_1fr] gap-4 p-4">
        <Image
          src={icon?.url}
          alt="icon"
          height={64}
          width={64}
          className="aspect-square h-[64px] w-[64px] rounded-full"
        />

        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export { SolutionCard, type SolutionCardProps };
