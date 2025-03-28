import { Link } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';
import { Card, CardContent } from '@oe/ui/shadcn/card';
import { ChevronRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  textButton: string;
  link?: string;
  isHighlighted?: boolean;
}

const ServiceCard = ({ title, description, textButton, link, isHighlighted = false }: ServiceCardProps) => (
  <Card
    className={`relative h-full rounded-br-[50px] border-0 border-primary ${
      isHighlighted ? 'bg-primary text-background' : 'border-t-8 bg-background'
    }`}
  >
    <CardContent
      className={`flex h-full flex-col gap-4 p-6 ${isHighlighted ? 'rounded-br-[48px]' : ''}
    `}
    >
      <h3 className={`font-semibold text-xl ${isHighlighted ? 'text-background' : 'text-primary'}`}>{title}</h3>
      <p className={`flex-grow ${isHighlighted ? 'text-background/90' : 'text-foreground'}`}>{description}</p>
      <Button variant="ghost">
        <Link href={link ?? '#'} className="w-full bg-inherit">
          {textButton}
          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </CardContent>
  </Card>
);

ServiceCard.displayName = 'ServiceCard';

export { ServiceCard, type ServiceCardProps };
