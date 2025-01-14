import LaunchpadBackground from '@oe/assets/images/openedu-homepage/bg-course-launchpad.png';
import { Image } from '@oe/ui/components/image';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import HighlightTitle from './commons/highlight-title';

interface ICourseCardProps {
  imageSrc: string;
  progress?: number;
  daysLeft?: number;
  fundingAmount?: number;
  title?: string;
}

interface Course {
  id: number;
  imageSrc: string;
  title?: string;
  progress?: number;
  daysLeft?: number;
  fundingAmount?: number;
}

const CourseCard = ({ imageSrc, progress = 80, daysLeft = 30, fundingAmount = 10000, title }: ICourseCardProps) => {
  const t = useTranslations('homePageLayout.courseLaunchpadSection.card');

  return (
    <div className="w-full overflow-hidden rounded-[16px] bg-white shadow-[0px_4px_30px_0px_#F4F5F6]">
      <div className="relative h-48">
        <Image src={imageSrc} alt="Course thumbnail" fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="mcaption-semibold18 md:mcaption-semibold20 mb-0">{title || t('defaultTitle')}</h3>
          <Heart className="mt-2 h-5 w-5 cursor-pointer hover:text-primary" />
        </div>

        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between">
            <p className="mcaption-semibold16 flex items-end gap-1">
              <span>{fundingAmount.toLocaleString()} USDT</span>
              <span className="mcaption-regular12 ">{t('funded')}</span>
            </p>

            <span className="mcaption-semibold16 text-primary">{progress}%</span>
          </div>
          <p className="mcaption-semibold16 flex items-end gap-1">
            <span>{daysLeft} days</span>
            <span className="mcaption-regular12 ">{t('daysLeft')}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function CourseLaunchpadSection() {
  const t = useTranslations('homePageLayout.courseLaunchpadSection');

  const courses: Course[] = [
    {
      id: 1,
      imageSrc: '/path/to/blockchain-image.jpg',
      progress: 80,
      daysLeft: 30,
      fundingAmount: 10000,
    },
    {
      id: 2,
      imageSrc: '/path/to/defi-image.jpg',
      progress: 80,
      daysLeft: 30,
      fundingAmount: 10000,
    },
    {
      id: 3,
      imageSrc: '/path/to/deficon-image.jpg',
      progress: 80,
      daysLeft: 30,
      fundingAmount: 10000,
    },
    {
      id: 4,
      imageSrc: '/path/to/web3-image.jpg',
      progress: 80,
      daysLeft: 30,
      fundingAmount: 10000,
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 hidden h-full w-full lg:flex">
        <Image
          src={LaunchpadBackground.src}
          alt="background"
          containerHeight={720}
          fill
          className="w-full object-cover"
          priority
        />
      </div>

      <div className="relative z-10 mt-20 grid grid-cols-1 gap-6 px-0 pt-10 md:grid-cols-2 md:px-10 lg:grid-cols-4">
        {courses.map(course => (
          <CourseCard
            key={course.id}
            imageSrc={course.imageSrc}
            progress={course.progress}
            daysLeft={course.daysLeft}
            fundingAmount={course.fundingAmount}
            title={course.title}
          />
        ))}
      </div>
      <div className="container relative mx-auto mt-10">
        <div className="mb-10 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 text-primary">
            <HighlightTitle text={t('highlight')} className="mb-1 justify-center" />
          </div>
          <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-6">{t('title')}</h2>
          <p className="mcaption-regular16 md:mcaption-regular24 mx-auto sm:max-w-[95%] md:max-w-[90%] lg:max-w-[85%]">
            {t('description')}
          </p>
        </div>
      </div>
    </div>
  );
}
