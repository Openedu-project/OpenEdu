import { useGetMe } from '@oe/api/hooks/useMe';
import { createAPIUrl } from '@oe/api/utils/fetch';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { type MouseEvent, useCallback, useMemo } from 'react';
import { useRouter } from '#common/navigation';
import { useLoginRequiredStore } from '#components/login-required-modal';
import { ACTION_TYPES, type ActionType, type IPaymentButton } from './types';
import { determineAction, getFirstLessonInfo, hasValidOutlineItems } from './utils';

interface ActionHandler {
  handle: (params: ActionHandlerParams) => void;
  getText: (t: (key: string) => string) => string;
  shouldShowCart: boolean;
}

interface ActionHandlerParams {
  courseData: IPaymentButton['courseData'];
  isExternalDomain: boolean;
  domain?: string;
  router: ReturnType<typeof useRouter>;
  createCourseUrl: (type: 'learning' | 'detail', params: Record<string, string>) => string;
  isCourseDetail: boolean;
  setLoginRequiredModal: (show: boolean) => void;
}

const redirectToLearningPage = ({
  courseData,
  isExternalDomain,
  domain,
  router,
  createCourseUrl,
  isCourseDetail,
}: ActionHandlerParams) => {
  const hasOutlines = hasValidOutlineItems(courseData);
  const slug = courseData?.slug ?? '';
  const { current_lesson, current_section } = courseData?.learning_progress_overview ?? {};
  const firstLesson = getFirstLessonInfo(courseData);

  const lessonUid = current_lesson?.uid ?? firstLesson?.lessonUid ?? '';
  const sectionUid = current_section?.uid ?? firstLesson?.sectionUid ?? '';

  const url =
    hasOutlines && isCourseDetail
      ? createCourseUrl('learning', {
          slug,
          section: sectionUid,
          lesson: lessonUid,
        })
      : createCourseUrl('detail', { slug });

  const fullUrl = isExternalDomain ? `https://${domain}${url}` : url;
  isExternalDomain ? window.open(fullUrl, '_blank') : router.push(fullUrl);
};

const ACTION_HANDLERS: Record<ActionType, ActionHandler> = {
  [ACTION_TYPES.LOGIN_REQUIRED]: {
    handle: ({ setLoginRequiredModal }) => {
      setLoginRequiredModal(true);
    },
    getText: t => t('loginToEnroll'),
    shouldShowCart: false,
  },
  [ACTION_TYPES.PAY_NOT_PAID]: {
    handle: ({ courseData, isExternalDomain, domain, router }) => {
      const paymentUrl = createAPIUrl({
        endpoint: PLATFORM_ROUTES.payment,
        params: { slug: courseData.slug ?? '' },
      });
      const fullUrl = isExternalDomain ? `https://${domain}${paymentUrl}` : paymentUrl;
      isExternalDomain ? window.open(fullUrl, '_blank') : router.push(fullUrl);
    },
    getText: t => t('buyCourse'),
    shouldShowCart: true,
  },
  [ACTION_TYPES.NOT_PAY_ENROLLED]: {
    handle: params => {
      redirectToLearningPage(params);
    },
    getText: t => t('goToCourse'),
    shouldShowCart: false,
  },
  [ACTION_TYPES.TRIGGER]: {
    handle: params => {
      redirectToLearningPage(params);
    },
    getText: t => t('goToCourse'),
    shouldShowCart: false,
  },
  [ACTION_TYPES.DEFAULT]: {
    handle: params => {
      redirectToLearningPage(params);
    },
    getText: t => t('goToCourse'),
    shouldShowCart: false,
  },
};

export const usePaymentButton = ({ courseData, isCourseDetail = false }: IPaymentButton) => {
  const router = useRouter();
  const t = useTranslations('paymentButton');
  const { dataMe } = useGetMe();
  const { setLoginRequiredModal } = useLoginRequiredStore();

  const domain = courseData?.org?.domain;
  const isExternalDomain = useMemo(
    () => typeof window !== 'undefined' && domain && domain !== window.location.hostname,
    [domain]
  );

  const createCourseUrl = useCallback((type: 'learning' | 'detail', params: Record<string, string>) => {
    const endpoint = type === 'learning' ? PLATFORM_ROUTES.courseLearning : PLATFORM_ROUTES.courseDetail;
    return createAPIUrl({ endpoint, params });
  }, []);

  const baseAction = useMemo(
    () =>
      determineAction({
        is_pay: courseData.price_settings?.is_pay ?? false,
        is_paid: courseData.is_paid ?? false,
        is_enrolled: courseData.is_enrolled ?? false,
      }),
    [courseData]
  );

  const currentAction = useMemo(() => (dataMe ? baseAction : ACTION_TYPES.LOGIN_REQUIRED), [dataMe, baseAction]);

  const actionHandler = ACTION_HANDLERS[currentAction];

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const params: ActionHandlerParams = {
        courseData,
        isExternalDomain: isExternalDomain as boolean,
        domain,
        router,
        createCourseUrl,
        isCourseDetail,
        setLoginRequiredModal,
      };

      actionHandler.handle(params);
    },
    [
      actionHandler,
      courseData,
      domain,
      isExternalDomain,
      router,
      createCourseUrl,
      isCourseDetail,
      setLoginRequiredModal,
    ]
  );

  const buttonText = useMemo(() => actionHandler.getText(t), [actionHandler, t]);

  const showCart = useMemo(
    () =>
      Boolean(
        dataMe &&
          actionHandler.shouldShowCart &&
          courseData?.price_settings?.is_pay &&
          !courseData.is_paid &&
          !courseData.is_enrolled
      ),
    [actionHandler.shouldShowCart, courseData, dataMe]
  );

  return {
    buttonText,
    showCart,
    handleClick,
    currentAction,
  };
};
