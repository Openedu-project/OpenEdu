import { useTranslations } from 'next-intl';
import { SocialIcon } from '#components/social-icon';
import { useCourseOutlineDetailStore } from '../_store/useCourseOutlineStore';
import { CourseSection } from './course-section';

const SupportingChannels = () => {
  const tCourse = useTranslations('courseOutline');

  const { courseOutline } = useCourseOutlineDetailStore();
  const channels = courseOutline?.props?.support_channel?.channels;

  return (
    <>
      {channels?.length > 0 ? (
        <CourseSection title={tCourse('supportingChannels')}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
            {channels
              ?.filter(channel => channel?.length > 0)
              ?.map((channel, index) => (
                <SocialIcon
                  key={`channel_${index}`}
                  url={channel}
                  shortenedLink
                  linkClassName="mcaption-regular16 text-foreground/90 ml-3 line-clamp-1 p-0"
                />
              ))}
          </div>
        </CourseSection>
      ) : null}
    </>
  );
};

export default SupportingChannels;
