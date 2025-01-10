import { Image } from '@oe/ui/components/image';
import { InputPhoneNumber } from '@oe/ui/components/input-phonenumber';
import type { FileType } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../_types/theme-page';
import HexagonLayout from './_components/hexagon-layout';

export interface ScholarHomepageHeroProps {
  title?: string;
  subTitle?: string;
  bannerMain?: FileType;
  bannerTop?: FileType;
  bannerBottom?: FileType;
  partners?: FileType[];
}

const ScholarHomepageHero: SectionComponent<'homepage', 'scholarHero'> = ({ props, className }) => {
  const t = useTranslations('themePage.scholar.homepage.scholarHero');

  return (
    <div className={cn('min-h-[80vh] bg-primary p-8', className)}>
      <div className="mx-auto max-w-7xl space-y-4 md:space-y-2">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between md:gap-12">
          {/* Right Column - Image Grid */}
          <div className="w-full md:order-last lg:p-8">
            <HexagonLayout
              bannerMain={props?.bannerMain}
              bannerTop={props?.bannerTop}
              bannerBottom={props?.bannerBottom}
            />
          </div>

          <div className="w-full space-y-6 text-background md:w-[80%] lg:w-full">
            <h1 className="font-bold text-xl leading-tight md:text-2xl lg:text-3xl">{t('title')}</h1>
            <p className="text-background/80 text-md md:text-lg">{t('subTitle')}</p>
            <div className="flex max-w-md gap-2">
              <InputPhoneNumber placeholder="Enter your phone number" />
              <Button type="submit" variant="secondary">
                Submit
              </Button>
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-3 md:gap-x-8 md:gap-y-4 lg:grid-cols-6">
          {props?.partners?.map((file: FileType, index) => (
            <Image
              key={index?.toString()}
              src={file?.url}
              height={file.height}
              width={file.width}
              alt=""
              className="h-[40px] object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarHomepageHero;
