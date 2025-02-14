'use client';

import { useGetLearningProgress } from '@oe/api/hooks/useLearningProgress';
import { useGetMe } from '@oe/api/hooks/useMe';
import { getCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { ICourseOutline } from '@oe/api/types/course/course';
import { createAPIUrl } from '@oe/api/utils/fetch';
import availBot from '@oe/assets/images/avail_bot.png';
import { Image } from '#components/image';
import { Button } from '#shadcn/button';
import { cleanUrl, getFormInfo, isLessonCompleted, isSectionCompleted } from './helpers';
import { PlayToEarnWarningModal } from './require-learning-complete';

interface IPlayToEarnProps {
  courseOutline: ICourseOutline;
}

const PlayToEarn = ({ courseOutline }: IPlayToEarnProps) => {
  const t = useTranslations('courseOutline.playToEarn');

  const [learningRequiredModal, setLearningRequiredModal] = useState<boolean>(false);

  const { dataMe } = useGetMe();
  const { dataLearningProgress } = useGetLearningProgress({ id: dataMe && courseOutline ? courseOutline?.slug : '' });

  const formResults = useMemo(() => {
    if (!courseOutline?.form_relations) {
      return [];
    }

    return courseOutline.form_relations
      .filter(
        relation =>
          relation.enabled && relation.type === 'notification' && relation?.confirmation_settings?.display_on_detail
      )
      .map(relation => {
        const formInfo = getFormInfo(relation.start_when, courseOutline.outline);

        return {
          start_when: relation.start_when,
          button_link:
            cleanUrl(
              relation.confirmation_settings?.buttons?.find(button => button?.type?.includes('http'))?.type ?? ''
            ) || null,
          segment_type: formInfo.type,
          segment_name:
            formInfo.type === 'lesson'
              ? `${formInfo?.lesson?.title} of section ${formInfo?.section?.index}`
              : formInfo.type === 'section'
                ? `section ${formInfo?.section?.index}`
                : 'Unknown',
        };
      });
  }, [courseOutline?.form_relations, courseOutline?.outline]);

  const completionResults = useMemo(() => {
    if (!dataLearningProgress?.sections || formResults.length === 0) {
      return [];
    }

    return formResults.map(result => {
      return {
        ...result,
        is_completed:
          result.start_when.type === 'completed_lesson'
            ? isLessonCompleted(dataLearningProgress.sections, result.start_when.entity_id)
            : result.start_when.type === 'completed_section'
              ? isSectionCompleted(dataLearningProgress.sections, result.start_when.entity_id)
              : false,
      };
    });
  }, [dataLearningProgress?.sections, formResults]);

  const handleOpenLinkGame = () => {
    if (completionResults.length === 0) {
      return;
    }

    if (completionResults[0]?.is_completed) {
      const accessTokenKey = process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY;
      const accessToken = getCookie(accessTokenKey);
      const directLink = createAPIUrl({
        endpoint: completionResults[0]?.button_link ?? '',
        queryParams: {
          access_token: accessToken,
          course_cuid: courseOutline?.cuid,
          course_name: courseOutline?.name,
        },
      });

      window.open(directLink, '_blank');
    } else {
      setLearningRequiredModal(true);
    }
  };

  return (
    dataMe &&
    completionResults?.length > 0 && (
      <>
        <hr className="my-4" />

        <Button
          onClick={handleOpenLinkGame}
          className="!mbutton-semibold16 relative w-full border-[2px] border-foreground bg-[#44D14A] text-foreground capitalize hover:bg-[#44D14A] hover:opacity-85"
        >
          <Image
            noContainer
            fill
            src={availBot.src}
            alt=""
            className="-top-2 !h-10 absolute left-2 z-40 w-auto max-w-10"
          />

          <div className="absolute top-[2px] right-2 z-50 flex h-[3px] w-full max-w-[calc(100%-68px)] gap-4">
            <div className="h-full w-4/5 rounded-full bg-[#C7FABF]" />
            <div className="h-full w-1/5 max-w-5 rounded-full bg-white" />
          </div>
          <div className="absolute top-0 left-0 h-[90%] w-[98%] rounded-md bg-[#72EC60]" />
          <span className="z-40 w-full">{t('button')}</span>
        </Button>

        {learningRequiredModal && (
          <PlayToEarnWarningModal
            segment_name={completionResults[0]?.segment_name ?? ''}
            segment_type={completionResults[0]?.segment_type ?? ''}
            courseOutline={courseOutline}
            isOpen={learningRequiredModal}
            setIsOpen={setLearningRequiredModal}
          />
        )}
      </>
    )
  );
};

export default PlayToEarn;
