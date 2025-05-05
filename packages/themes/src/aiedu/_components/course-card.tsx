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
    <Card className="w-full rounded-lg p-4 md:p-6">
      <Image
        alt="image"
        src={image?.url}
        height={320}
        width={image?.width ?? 460}
        className="h-full w-full rounded-lg object-contain"
      />
      <h3>{title}</h3>
      <ul className="space-y-2">
        {benefits?.map((benefit, index) => (
          <li key={index.toString()} className="flex items-start">
            <div className="mt-1 mr-2 min-w-4">•</div>
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
