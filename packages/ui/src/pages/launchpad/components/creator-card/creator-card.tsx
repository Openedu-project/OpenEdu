import type { IUser } from '@oe/api';
import DefaultImg from '@oe/assets/images/defaultimage.png';
import { Image } from '#components/image';

const CreatorCard = ({ educator }: { educator: IUser | undefined }) => {
  return (
    <div className="space-y-4 rounded-2xl bg-white p-2 shadow-[0px_4px_30px_0px_#F4F5F6] md:p-6">
      <div className="flex items-center gap-4">
        <div className="relative h-full min-h-[120px] min-w-[120px] cursor-pointer rounded-full">
          <Image
            className="h-full w-full rounded-full"
            alt="creator image"
            src={educator?.avatar || DefaultImg.src}
            fill
            containerHeight={120}
          />
        </div>
        <div className="flex flex-col space-y-1 md:space-y-3">
          <p className="font-semibold text-lg sm:text-2xl">{educator?.display_name}</p>
          <p className="text-xs sm:text-base">{educator?.headline || 'Educator'}</p>
        </div>
      </div>

      {/* TODO: backend don't have it, need to fix it */}
      {/* <h4 className="text-xl font-semibold">{educator?.about}</h4> */}
      {/* <p className="flex items-center gap-4 text-lg text-primary font-semibold ">
        <span>{educator?.followers} Followers</span>
        <span>{educator?.total_courses} Courses</span>
        <span>{educator?.total_blogs} Blogs</span>
      </p> */}
    </div>
  );
};

export { CreatorCard };
