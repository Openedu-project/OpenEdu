import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
import { cn } from '@oe/ui/utils/cn';
// import { useTranslations } from "next-intl";
import type { SectionComponent } from '../../_types/theme-page';

export interface VbiHomepagePartnersProps {
  partners?: FileType[];
}

const VbiHomepagePartners: SectionComponent<'homepage', 'vbiPartners'> = ({ className, props }) => {
  //   const t = useTranslations("themePage.vbi.homepage.vbiPartners");

  return (
    <div className={cn('mt-0 grid grid-cols-3 gap-x-4 gap-y-2 md:grid-cols-5 md:gap-x-8 md:gap-y-4', className)}>
      {props?.partners?.map(
        (file: FileType) =>
          file?.url && (
            <Image
              key={file.url.toString()}
              src={file.url}
              height={file.height}
              width={file.width}
              alt=""
              className="h-[40px] object-contain"
            />
          )
      )}
    </div>
  );
};

export default VbiHomepagePartners;
