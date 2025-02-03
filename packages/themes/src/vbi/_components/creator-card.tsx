import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
interface CreatorCardProps {
  name: string;
  role: string;
  avatar?: FileType;
  story: string;
  className?: string;
}

const CreatorCard = ({ name, role, avatar, story, className = '' }: CreatorCardProps) => {
  return (
    <div className={`rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md ${className}`}>
      {/* Header with Avatar and Info */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full object-contain">
          <Image src={avatar?.url} alt="avatar" className="h-full w-full object-cover" noContainer fill />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-xl">{name}</h3>
          <p className="text-foreground/80">{role}</p>
        </div>
      </div>

      {/* Story */}
      <div className="relative">
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg
          className="-translate-x-2 -translate-y-2 absolute h-6 w-6 text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="line-clamp-3 pl-6 text-foreground/80 leading-relaxed md:line-clamp-4 lg:line-clamp-6">{story}</p>
      </div>
    </div>
  );
};

export { CreatorCard };
export type { CreatorCardProps };
