import { createAPIUrl } from '@oe/api/utils/fetch';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { Image } from '@oe/ui/components/image';
import { Card, CardContent } from '@oe/ui/shadcn/card';
import { useTranslations } from 'next-intl';

interface CreatorLaunchpadCardProps {
  id: string;
  title: string;
  creator: string;
  date: string;
  thumbnail: string;
}

export const CreatorLaunchpadCard = ({ id, title, creator, date, thumbnail }: CreatorLaunchpadCardProps) => {
  const t = useTranslations('creatorLaunchpad');
  return (
    <Link
      className="block h-full p-0 hover:no-underline"
      href={createAPIUrl({
        endpoint: CREATOR_ROUTES.creatorLaunchpadDetail,
        params: { id },
      })}
    >
      <Card className="h-full w-full rounded-xl">
        <CardContent className="p-4">
          <div className="relative mb-4 h-[150px] w-full">
            <Image src={thumbnail} alt={title} fill containerHeight={150} className="w-full rounded-md object-cover" />
          </div>

          <h3 className="mcaption-semibold20 mb-2 line-clamp-2 whitespace-pre-wrap">{title}</h3>
          <div className="mcaption-semibold14">
            <p className="mb-2">
              <span className="mcaption-regular12">{t('createdBy')}</span>&nbsp;
              {creator}
            </p>
            <p>
              <span className="mcaption-regular12">{t('createdAt')}</span>&nbsp;
              {date}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
