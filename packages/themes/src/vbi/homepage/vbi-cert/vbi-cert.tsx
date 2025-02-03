import { Image } from '@oe/ui/components/image';
import { cn } from '@oe/ui/utils/cn';
import type { SectionComponent } from '../../../_types/theme-page';

import type { FileType } from '@oe/ui/components/uploader';
import { InfoSection, type InfoSectionProps } from '../../_components/info-section';

export interface VbiHomepageCertProps extends InfoSectionProps {
  image?: FileType;
}

const VbiHomepageCert: SectionComponent<'homepage', 'vbiCert'> = ({ props, className, t }) => {
  if (!t) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-lg bg-primary p-4 py-8 md:flex-row md:gap-4 md:p-8 lg:p-12',
        className
      )}
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <InfoSection
        title={t('title')}
        titleSub={t('titleSub')}
        button={{ text: t('button.text'), link: t('button.link') }}
        variant="outline"
        className="flex flex-col items-center justify-center text-center md:items-start md:text-left"
      />
      <Image
        src={props?.image?.url}
        height={props?.image?.height}
        width={props?.image?.width}
        alt="certificate"
        className="rounded-lg object-contain"
      />
    </div>
  );
};

export default VbiHomepageCert;
