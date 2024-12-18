import { useGetMe } from '@oe/api/hooks/useMe';
import { createAPIUrl } from '@oe/api/utils/fetch';
import Cart from '@oe/assets/icons/cart';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { type MouseEvent, useCallback, useMemo } from 'react';
import { useLoginRequiredStore } from '#components/login-required-modal';
import { Button } from '#shadcn/button';
import { ACTION_TYPES, type IPaymentButton } from './types';
import { determineAction, getFirstLessonInfo, hasValidOutlineItems } from './utils';

export default function PaymentButton({ rightSection, courseData, isCourseDetail = false, ...props }: IPaymentButton) {
  // Hooks
  const router = useRouter();
  const t = useTranslations('paymentButton');
  const { dataMe } = useGetMe();
  const { setLoginRequiredModal } = useLoginRequiredStore();

  //   const { triggerEnrollCourse } = useEnrollCourse(courseData.cuid);
  //   const { mutateCourse } = useGetCourseOutline(isCourseDetail ? courseData.slug : undefined);

  // Constants
  const domain = courseData?.org?.domain;
  const isExternalDomain = typeof window !== 'undefined' && domain && domain !== window.location.hostname;

  const createCourseUrl = useCallback((type: 'learning' | 'detail', params: Record<string, string>) => {
    const endpoint = type === 'learning' ? PLATFORM_ROUTES.courseLearning : PLATFORM_ROUTES.courseDetail;
    return createAPIUrl({ endpoint, params });
  }, []);

  const handleRedirectToLearningPage = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const hasOutlines = hasValidOutlineItems(courseData);
    const slug = courseData.slug ?? '';
    const learning_progress_overview = courseData?.learning_progress_overview;

    const lessonUid =
      learning_progress_overview?.current_lesson?.uid ?? getFirstLessonInfo(courseData)?.lessonUid ?? '';
    const sectionUid =
      learning_progress_overview?.current_section?.uid ?? getFirstLessonInfo(courseData)?.sectionUid ?? '';

    const url =
      hasOutlines && isCourseDetail
        ? createCourseUrl('learning', {
            slug,
            section: sectionUid,
            lesson: lessonUid,
          })
        : createCourseUrl('detail', { slug });

    const fullUrl = isExternalDomain ? `https://${domain}${url}` : url;

    if (isExternalDomain) {
      window.open(fullUrl, '_blank');
    } else {
      router.push(fullUrl);
    }
  }, [courseData, isExternalDomain, isCourseDetail, domain, router, createCourseUrl]);

  // Action handlers
  const actionHandlers = useMemo(
    () => ({
      [ACTION_TYPES.PAY_NOT_PAID]: () => {
        const paymentUrl = createAPIUrl({
          endpoint: PLATFORM_ROUTES.payment,
          params: { slug: courseData.slug },
        });
        const fullUrl = isExternalDomain ? `https://${domain}${paymentUrl}` : paymentUrl;
        isExternalDomain ? window.open(fullUrl, '_blank') : router.push(fullUrl);
      },
      [ACTION_TYPES.NOT_PAY_ENROLLED]: () => {
        console.log(ACTION_TYPES.NOT_PAY_ENROLLED);
        // if (
        //   checkActivedTrigger({
        //     relations: courseData.form_relations,
        //     entityId,
        //     type: 'clicked_on',
        //   })
        // ) {
        //   activedTrigger({ relations: courseData.form_relations, entityId });
        // } else {
        handleRedirectToLearningPage();
        // }
      },
      [ACTION_TYPES.TRIGGER]: () => {
        if (isCourseDetail) {
          console.log(ACTION_TYPES.TRIGGER);
          //   activedTrigger({ relations: courseData.form_relations, entityId });
        } else {
          handleRedirectToLearningPage();
        }
      },
      [ACTION_TYPES.DEFAULT]: ({ event }: { event: MouseEvent<HTMLButtonElement> }) => {
        try {
          if (!courseData.is_enrolled) {
            const entityId = event.currentTarget.id;
            console.log(entityId);
            //   activedTrigger({ relations: courseData.form_relations, entityId });
          }
          if (isCourseDetail) {
            // await mutateCourse();
            console.log(isCourseDetail, 'isCourseDetail');
          }
          handleRedirectToLearningPage();
        } catch (error) {
          console.error('Error enroll', error);
        }
      },
    }),
    [courseData, isExternalDomain, domain, router, isCourseDetail, handleRedirectToLearningPage]
  );

  const handleClickPayment = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (!dataMe) {
        setLoginRequiredModal(true);
        return;
      }

      const action = determineAction({
        is_pay: courseData.price_settings?.is_pay ?? false,
        is_paid: courseData.is_paid ?? false,
        is_enrolled: courseData.is_enrolled ?? false,
      });

      if (action === ACTION_TYPES.DEFAULT) {
        void actionHandlers[action]({ event });
      } else {
        void actionHandlers[action]();
      }
    },
    [dataMe, courseData, determineAction, setLoginRequiredModal, actionHandlers]
  );

  const buttonText = useMemo(() => {
    if (!dataMe) {
      return t('loginToEnroll');
    }
    if (courseData.is_enrolled) {
      return t('goToCourse');
    }
    return courseData?.price_settings?.is_pay && !courseData.is_paid ? t('buyCourse') : t('goToCourse');
  }, [courseData, dataMe, t]);

  const showCart = dataMe && courseData?.price_settings?.is_pay && !courseData.is_paid && !courseData.is_enrolled;

  return (
    <Button
      //   id={TRIGGER_CLICKED_ON_ID.enroll_course}
      leftSection={showCart ? <Cart /> : undefined}
      rightSection={rightSection}
      onClick={handleClickPayment}
      {...props}
    >
      {buttonText}
    </Button>
  );
}
