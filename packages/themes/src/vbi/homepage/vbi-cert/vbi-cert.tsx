import { Image } from '@oe/ui';
import { cn } from '@oe/ui';
import type { SectionComponent } from '../../../_types/theme-page';

import type { FileType } from '@oe/ui';
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
      className="rounded-lg bg-primary"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1.2px, transparent 1.2px)',
        backgroundSize: '20px 20px',
      }}
    >
      <div className={cn('container flex flex-col gap-2 p-4 py-8 md:flex-row md:gap-4 md:p-8 lg:p-12', className)}>
        <InfoSection
          title={t('title')}
          titleSub={t('titleSub')}
          button={{ text: t('button.text'), link: props?.button?.link }}
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
    </div>
  );
};

export { VbiHomepageCert };
