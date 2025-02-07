import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
import { Card, CardContent } from '@oe/ui/shadcn/card';

interface SolutionCardProps {
  name?: string;
  icon?: FileType;
  description?: string;
}

const SolutionCard = ({ name, icon, description }: SolutionCardProps) => {
  return (
    <Card key={name} className="transition-shadow hover:shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-start space-x-2">
          <div className="h-12 w-12">
            <Image src={icon?.url} alt="icon" className="h-12 w-12 rounded-full" />
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { SolutionCard, type SolutionCardProps };
export default SolutionCard;
