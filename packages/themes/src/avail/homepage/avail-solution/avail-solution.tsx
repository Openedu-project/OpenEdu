import line from '@oe/assets/images/theme/line.avif';
import { Image } from '@oe/ui/components/image';
import { cn } from '@oe/ui/utils/cn';
import type { SectionComponent } from '../../../_types/theme-page';

import { Link } from '@oe/ui/common/navigation';
import type { FileType } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@oe/ui/shadcn/carousel';
import { useTranslations } from 'next-intl';
import SolutionCard, { type SolutionCardProps } from '../_components/solution-card';

export interface AvailHomepageSolutionProps {
  banner?: FileType;
  solutions: {
    'solutions-0': SolutionCardProps;
    'solutions-1': SolutionCardProps;
    'solutions-2': SolutionCardProps;
    'solutions-3': SolutionCardProps;
    'solutions-4': SolutionCardProps;
  };
  carouselTitle?: string;
  carousels: FileType[];
  button: {
    text?: string;
    link?: string;
  };
}

const AvailHomepageSolution: SectionComponent<'homepage', 'availSolution'> = ({ className, props }) => {
  const t = useTranslations('themePage.avail.homepage.availSolution');

  return (
    <div className={cn('py-4 md:py-8 lg:py-12', className)}>
      <div className="bg-accent p-4 md:space-y-8 md:p-8 lg:flex lg:min-h-[80vh] lg:gap-4 lg:p-12">
        <Image alt="banner" src={props?.banner?.url} className="rounded-lg object-cover" />
        <div className="space-y-2 lg:space-y-0">
          {props?.solutions &&
            Object.entries(props.solutions).map(([key, value]) => (
              <SolutionCard key={key} name={value.name} icon={value.icon} description={value.description} />
            ))}
        </div>
      </div>
      <div className="flex flex-col items-center bg-accent/80">
        <Image
          src={line?.src}
          alt="line"
          className="h-full w-full object-contain"
          height={55}
          width={line?.width ?? 1000}
        />
        <h2 className="p-4 pt-4 font-bold text-xl uppercase leading-tight md:pt-8 lg:text-3xl">{t('carouselTitle')}</h2>
        <div className="relative w-full p-4 md:p-8 lg:gap-4 lg:p-12">
          <Carousel
            className="w-full"
            opts={{
              align: 'start',
            }}
          >
            <CarouselContent className="-ml-1 flex">
              {props?.carousels.map((c, index) => (
                <CarouselItem key={index.toString()} className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                  <div className="p-1">
                    <Image src={c?.url} alt="image" className="h-full object-contain" height={100} width={200} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden lg:block">
              <CarouselPrevious className="-translate-x-1/2 absolute top-[-40px] right-0 inline-flex h-[48px] w-[48px] items-center justify-center whitespace-nowrap rounded-full border border-input bg-white font-medium text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
              <CarouselNext className="absolute top-[-40px] right-0 inline-flex h-[48px] w-[48px] items-center justify-center whitespace-nowrap rounded-full border border-input bg-primary font-medium text-sm shadow-sm transition-colors hover:bg-primary hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
            </div>
          </Carousel>
        </div>
        <Button className="mt-4 md:mt-8">
          <Link
            href={props?.button?.link ? props?.button?.link : '#'}
            className={cn('bg-inherit text-primary-foreground hover:bg-transparent hover:no-underline')}
          >
            {props?.button?.text}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AvailHomepageSolution;
