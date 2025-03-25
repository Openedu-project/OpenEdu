import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { SectionHeader, type SectionHeaderProps } from '../_components/section-header';

import { TestimonialCard, type TestimonialCardProps } from '../_components/testimonial-card';

export interface ScholarHomepageTestimonialsProps extends SectionHeaderProps {
  testimonial1: TestimonialCardProps;
  testimonial2: TestimonialCardProps;
  testimonial3: TestimonialCardProps;
}

const ScholarHomepageTestimonials: SectionComponent<'homepage', 'scholarTestimonials'> = ({ className, props }) => {
  const t = useTranslations('themePage.scholar.homepage.scholarTestimonials');
  const testimonials = [props?.testimonial1, props?.testimonial2, props?.testimonial3];
  return (
    <div className={cn('bg-background py-12 md:py-16 lg:py-20', className)}>
      <div className="container space-y-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} description={t('description')} variant="primary" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials?.filter(Boolean)?.map((value, index) => (
            <TestimonialCard
              key={value?.name ?? index}
              quote={value?.quote}
              rating={value?.rating}
              avatar={value?.avatar}
              name={value?.name}
              position={value?.position}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarHomepageTestimonials;
