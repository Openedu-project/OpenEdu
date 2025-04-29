'use client';

import { useGetMe } from '@oe/api';
import { useGetLearningProgress } from '@oe/api';
import { getCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import type { ICourseOutline } from '@oe/api';
import { createAPIUrl } from '@oe/api';
import availBot from '@oe/assets/images/avail_bot.png';
import { Image } from '#components/image';
import { Button } from '#shadcn/button';
import { cleanUrl, getFormInfo, isLessonCompleted, isLessonStarted, isSectionCompleted } from './helpers';
import { PlayToEarnWarningModal } from './require-learning-complete';

interface IPlayToEarnProps {
  courseOutline: ICourseOutline;
}

const PlayToEarn = ({ courseOutline }: IPlayToEarnProps) => {
  const t = useTranslations('courseOutline.playToEarn');

  const [learningRequiredModal, setLearningRequiredModal] = useState<boolean>(false);

  const { dataMe } = useGetMe();
  const { dataLearningProgress } = useGetLearningProgress({
    id: dataMe && courseOutline ? courseOutline?.slug : '',
  });

  const formResults = useMemo(() => {
    const { form_relations, outline } = courseOutline || {};

    if (!form_relations) {
      return [];
    }

    return form_relations
      .filter(
        relation =>
          relation.enabled && relation.type === 'notification' && relation?.confirmation_settings?.display_on_detail
      )
      .map(relation => {
        const { start_when } = relation;
        const formInfo = getFormInfo(start_when, outline || []);
        const buttonLink = relation.confirmation_settings?.buttons?.find(button =>
          button?.type?.includes('http')
        )?.type;

        let segment_name = 'Unknown';
        if (formInfo.type === 'lesson') {
          segment_name = `${formInfo?.lesson?.title} of section ${formInfo?.section?.index}`;
        } else if (formInfo.type === 'section') {
          segment_name = `Section ${formInfo?.section?.index}: ${formInfo?.section?.title}`;
        }

        return {
          start_when,
          button_link: buttonLink ? cleanUrl(buttonLink) : null,
          segment_type: formInfo.type,
          segment_state: 'state' in formInfo ? formInfo.state : 'completed',
          segment_name,
        };
      });
  }, [courseOutline]);

  const completionResults = useMemo(() => {
    const sectionByUid = dataLearningProgress?.section_by_uid;

    if (!sectionByUid || formResults.length === 0) {
      return [];
    }

    return formResults.map(result => {
      const { type, entity_id } = result.start_when;

      let is_completed = false;

      switch (type) {
        case 'completed_lesson':
          is_completed = isLessonCompleted(sectionByUid, entity_id);
          break;
        case 'completed_section':
          is_completed = isSectionCompleted(sectionByUid, entity_id);
          break;
        case 'started_lesson':
          is_completed = isLessonStarted(courseOutline, sectionByUid, entity_id);
          break;
        default:
          is_completed = false;
          break;
      }

      return {
        ...result,
        is_completed,
      };
    });
  }, [dataLearningProgress?.section_by_uid, formResults, courseOutline]);

  const handleOpenLinkGame = useCallback(() => {
    if (completionResults.length === 0) {
      return;
    }

    const firstResult = completionResults[0];

    if (firstResult?.is_completed) {
      const accessTokenKey = process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY;
      const accessToken = getCookie(accessTokenKey);

      const directLink = createAPIUrl({
        endpoint: firstResult.button_link ?? '',
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
  }, [completionResults, courseOutline?.cuid, courseOutline?.name, completionResults[0]?.button_link]);

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
            segmentName={completionResults[0]?.segment_name ?? ''}
            segmentState={completionResults[0]?.segment_state ?? ''}
            courseOutline={courseOutline}
            isOpen={learningRequiredModal}
            setIsOpen={setLearningRequiredModal}
          />
        )}
      </>
    )
  );
};

export { PlayToEarn };
