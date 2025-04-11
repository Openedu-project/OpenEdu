import type { ICourse } from '@oe/api';
import DefaultImg from '@oe/assets/images/defaultimage.png';
import { Image } from '#components/image';
import { cn } from '#utils/cn';

const CourseCardCompact = ({
  course,
  onClick,
  isSelected,
}: {
  course: ICourse;
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <button
      type="button"
      className={cn(
        'cursor-pointer gap-3 rounded-2xl bg-white p-4 shadow-[0px_4px_30px_0px_#F4F5F6]',
        isSelected && 'border-2 border-primary'
      )}
      onClick={onClick}
    >
      <div className="relative min-h-[120px] overflow-hidden rounded-2xl">
        <Image
          className="h-full w-full"
          alt="campain full card image"
          src={course.thumbnail?.url || DefaultImg.src}
          fill
          containerHeight={120}
        />
      </div>
      <h4 className="mt-4 mb-0 w-full truncate font-semibold text-lg">{course.name}</h4>
    </button>
  );
};

export { CourseCardCompact };
