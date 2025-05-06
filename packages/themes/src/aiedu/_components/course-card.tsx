import { Card, type FileType, Image } from '@oe/ui';
import { AieduButton, type AieduButtonProps } from '../_components/button';

interface AieduCourseCardProps {
  image?: FileType;
  benefits?: string[];
  title?: string;
  button?: AieduButtonProps;
}

const AieduCourseCard = ({ image, benefits, title, button }: AieduCourseCardProps) => {
  return (
    <Card className="w-full space-y-2 overflow-hidden rounded-lg p-4 shadow-xs transition-shadow duration-300 hover:shadow-md md:space-y-4 md:p-6">
      <Image
        alt="image"
        src={image?.url}
        fill
        aspectRatio="16:9"
        containerHeight="auto"
        sizes="(max-width: 768px) 280px, 380px"
        className="h-full w-full rounded-lg object-cover transition-all duration-300 hover:scale-105"
      />
      <h3 className="text-xl md:text-2xl">{title}</h3>
      <ul className="space-y-2">
        {benefits?.map((benefit, index) => (
          <li key={index.toString()} className="flex items-start">
            <div className="mr-2 min-w-4">•</div>
            <div>{benefit}</div>
          </li>
        ))}
      </ul>
      <div className="text-center">
        <AieduButton link={button?.link} text={button?.text} />
      </div>
    </Card>
  );
};

export { type AieduCourseCardProps, AieduCourseCard };
