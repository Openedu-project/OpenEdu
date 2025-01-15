import { cn } from '@oe/ui/utils/cn';
import type { SectionComponent } from '../../../_types/theme-page';
import { CreatorCard, type CreatorCardProps } from '../../_components/creator-card';
import { InfoSection, type InfoSectionProps } from '../../_components/info-section';

export interface VbiHomepageCreatorsProps extends InfoSectionProps {
  creators?: {
    creator1: CreatorCardProps;
    creator2: CreatorCardProps;
    creator3: CreatorCardProps;
  };
}

const VbiHomepageCreators: SectionComponent<'homepage', 'vbiCreators'> = ({ props, className, t }) => {
  if (!t) {
    return null;
  }

  const creators = [
    {
      name: t('creators.creator1.name'),
      role: t('creators.creator1.role'),
      story: t('creators.creator1.story'),
      avatar: props?.creators?.creator1?.avatar,
    },
    {
      name: t('creators.creator2.name'),
      role: t('creators.creator2.role'),
      story: t('creators.creator2.story'),
      avatar: props?.creators?.creator2?.avatar,
    },
    {
      name: t('creators.creator3.name'),
      role: t('creators.creator3.role'),
      story: t('creators.creator3.story'),
      avatar: props?.creators?.creator3?.avatar,
    },
  ];

  return (
    <div className={cn('space-y-4 md:space-y-6', className)}>
      <InfoSection title={t?.('title')} titleSub={t?.('titleSub')} className="flex flex-col items-center" />
      <div className="flex flex-col gap-4 md:flex-row">
        {creators?.map(item => (
          <CreatorCard key={item.name} name={item.name} role={item.role} story={item.story} avatar={item.avatar} />
        ))}
      </div>
    </div>
  );
};

export default VbiHomepageCreators;
