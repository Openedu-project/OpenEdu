// "use client";
import { formatDate } from '@oe/core/utils/datetime';
import { Calendar1 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const LastUpdated = ({ update_at }: { update_at: number }) => {
  const tCourse = useTranslations('courseOutline');
  // const [updateAt, setUpdateAt] = useState<number>(update_at ?? 0);

  // useEffect(() => {
  //   if (update_at) {
  //     setUpdateAt(update_at);
  //   }
  // }, [update_at]);

  return update_at ? (
    <div className="mcaption-regular12 sm:mcaption-regular14 flex items-center gap-2">
      <Calendar1 width={20} height={20} />
      <span>
        {tCourse('lastUpdate')} {formatDate(update_at)}
      </span>
    </div>
  ) : null;
};
