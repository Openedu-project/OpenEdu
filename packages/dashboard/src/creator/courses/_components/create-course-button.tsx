'use client';
import type { ICreateBaseCourse, ICreateYoutubeCourse } from '@oe/api/schemas/courses/createCourseSchema';
import { createAICourseService, createCourseService } from '@oe/api/services/course';
import YoutubeIcon from '@oe/assets/icons/social-icon/youtube';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { useRouter } from '@oe/ui/common/navigation';
import { ButtonDropdown } from '@oe/ui/components/button-dropdown';
import { useTable } from '@oe/ui/components/table';
import { toast } from '@oe/ui/shadcn/sonner';
import { PlusIcon, SparklesIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import CreateCourseModal from './create-course-modal';
import CreateCourseYoutubeModal from './create-course-youtube';

export default function CreateCourseButton() {
  const tCourses = useTranslations('courses');
  const router = useRouter();
  const { mutate } = useTable();

  const [showBasicModal, setShowBasicModal] = useState(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);

  const handleOptionSelect = (value: string) => {
    switch (value) {
      case 'create':
        setShowBasicModal(true);
        break;
      case 'youtube':
        setShowYoutubeModal(true);
        break;
      default:
        break;
    }
  };

  const handleBasicCourseSubmit = async (data: ICreateBaseCourse) => {
    const course = await createCourseService(undefined, data);
    await mutate?.();
    toast.success(tCourses('formValidation.createCourseSuccess'));
    router.push(
      buildUrl({
        endpoint: CREATOR_ROUTES.courseSettingUp,
        params: { courseId: course.id },
      })
    );
  };

  const handleYoutubeCourseSubmit = async (data: ICreateYoutubeCourse) => {
    const course = await createAICourseService(undefined, {
      ...data,
      type: 'youtube_playlist',
    });
    await mutate?.();
    toast.success(tCourses('formValidation.createCourseSuccess'));
    router.push(
      buildUrl({
        endpoint: CREATOR_ROUTES.courseSettingUp,
        params: { courseId: course.id },
      })
    );
  };

  return (
    <>
      <ButtonDropdown
        label={tCourses('create.title')}
        icon={<PlusIcon className="mr-2 h-4 w-4" />}
        onClick={() => setShowBasicModal(true)}
        className="ml-auto"
        options={[
          {
            label: tCourses('create.title'),
            value: 'create',
            icon: <PlusIcon className="mr-2 h-4 w-4" />,
            onClick: () => handleOptionSelect('create'),
          },
          {
            label: tCourses('create.youtube'),
            value: 'youtube',
            icon: <YoutubeIcon className="mr-2 h-4 w-4" />,
            onClick: () => handleOptionSelect('youtube'),
          },
          {
            label: tCourses('create.ai'),
            value: 'ai',
            icon: <SparklesIcon className="mr-2 h-4 w-4" />,
            href: '/creator/ai',
          },
        ]}
      />
      <CreateCourseModal
        open={showBasicModal}
        onClose={() => setShowBasicModal(false)}
        onSubmit={handleBasicCourseSubmit}
      />
      <CreateCourseYoutubeModal
        open={showYoutubeModal}
        onClose={() => setShowYoutubeModal(false)}
        onSubmit={handleYoutubeCourseSubmit}
      />
    </>
  );
}
