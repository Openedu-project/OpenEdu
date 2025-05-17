'use client';
import type { IEnrollCoursePayload } from '@oe/api';
import { usePostEnrollCourse } from '@oe/api';
import { useGetMe } from '@oe/api';
import { AUTH_ROUTES, PLATFORM_ROUTES, buildUrl } from '@oe/core';
import { getCookieClient, setCookieClient } from '@oe/core';
import { useTranslations } from 'next-intl';
import { type ReadonlyURLSearchParams, useParams, useSearchParams } from 'next/navigation';
import { type MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from '#common/navigation';
import { useActivedTrigger } from '#components/course-form-trigger';
import { useLoginRequiredStore } from '#components/login-required-modal';
import { createCourseUrl } from '#utils/course-url';
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
  isCourseDetail: boolean;
  refBy?: string;
  fromSource?: string;
  slug?: string;
  setIsLoading?: (isLoading: boolean) => void;
  setLoginRequiredModal: (show: boolean) => void;
  triggerPostEnrollCourse: (params: IEnrollCoursePayload) => void;
  shouldActiveTrigger?: boolean;
  handleShowTrigger: () => void;
  searchParams?: ReadonlyURLSearchParams;
}

type FromSourceType = {
  courseSlug: string;
  fromSource: string;
}[];

export const defaultExpiredTime = 365 * 86400; // 365 days for token expired

const redirectToLearningPage = ({
  courseData,
  isExternalDomain,
  domain,
  router,
  setIsLoading,
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

  (isExternalDomain || !hasOutlines) && setIsLoading?.(false);
};

const handleEnrollCourse = async (params: ActionHandlerParams) => {
  let source = '';
  let ref_by = '';
  const fromSourceStorage = getCookieClient(String(process.env.NEXT_PUBLIC_COOKIE_FROM_SOURCE));
  const refByStorage = getCookieClient(String(process.env.NEXT_PUBLIC_COOKIE_REF_BY));

  if (fromSourceStorage) {
    const fromSourceData: { fromSource: string; courseSlug: string }[] = fromSourceStorage
      ? typeof fromSourceStorage === 'string'
        ? JSON.parse(fromSourceStorage)
        : fromSourceStorage
      : [];
    // Filter entries with matching courseSlug and sort by most recent (assuming they're added in order)
    const matchingEntries = fromSourceData
      ?.filter(entry => entry?.courseSlug === params.slug)
      ?.sort((a, b) => fromSourceData?.indexOf(b) - fromSourceData?.indexOf(a));

    if (matchingEntries?.length > 0) {
      source = matchingEntries[0]?.fromSource ?? '';
    }
  }

  if (refByStorage) {
    const fromUserStorage: { fromSource: string; courseSlug: string }[] = refByStorage
      ? typeof refByStorage === 'string'
        ? JSON.parse(refByStorage)
        : refByStorage
      : [];
    // Filter entries with matching courseSlug and sort by most recent (assuming they're added in order)
    const matchingEntries = fromUserStorage
      ?.filter(entry => entry?.courseSlug === params.slug)
      ?.sort((a, b) => fromUserStorage?.indexOf(b) - fromUserStorage?.indexOf(a));

    if (matchingEntries?.length > 0) {
      ref_by = matchingEntries[0]?.fromSource ?? '';
    }
  }
  await params.triggerPostEnrollCourse({
    source,
    ref_by,
  });
};

const ACTION_HANDLERS: Record<ActionType, ActionHandler> = {
  [ACTION_TYPES.LOGIN_REQUIRED]: {
    handle: ({ setLoginRequiredModal, isCourseDetail, router, slug, setIsLoading, searchParams }) => {
      if (isCourseDetail) {
        const pathname = slug && createCourseUrl('detail', { slug });
        const nextPath = searchParams && searchParams?.size > 0 ? `${pathname}?${searchParams.toString()}` : pathname;
        const loginroute = `${AUTH_ROUTES.login}?next=${nextPath}`;

        router.push(loginroute);
      } else {
        setLoginRequiredModal(true);
        setIsLoading?.(false);
      }
    },
    getText: t => t('loginToEnroll'),
    shouldShowCart: false,
  },
  [ACTION_TYPES.PAY_NOT_PAID]: {
    handle: ({ courseData, isExternalDomain, domain, router }) => {
      const paymentUrl = buildUrl({
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
      if (params?.shouldActiveTrigger) {
        params?.setIsLoading?.(false);
        params.handleShowTrigger();
      } else {
        redirectToLearningPage(params);
      }
    },
    getText: t => t('goToCourse'),
    shouldShowCart: false,
  },
  [ACTION_TYPES.TRIGGER]: {
    handle: params => {
      redirectToLearningPage(params);
      if (params?.isCourseDetail) {
        params?.setIsLoading?.(false);
        params.handleShowTrigger;
      } else {
        redirectToLearningPage(params);
      }
    },
    getText: t => t('goToCourse'),
    shouldShowCart: false,
  },
  [ACTION_TYPES.DEFAULT]: {
    handle: async params => {
      if (!params) {
        return;
      }

      // Handle loading state based on trigger condition
      params.setIsLoading?.(!params.shouldActiveTrigger);

      // Handle course enrollment if needed
      params.isCourseDetail && (await handleEnrollCourse(params));

      // Show trigger or redirect based on condition
      params.shouldActiveTrigger
        ? !params.courseData?.is_enrolled && params.handleShowTrigger?.()
        : redirectToLearningPage(params);
    },
    getText: t => t('goToCourse'),
    shouldShowCart: false,
  },
};

export const usePaymentButton = ({ courseData, isCourseDetail = false, onClick }: IPaymentButton) => {
  const router = useRouter();
  const t = useTranslations('paymentButton');
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref_code') ?? '';
  const fromSource = searchParams.get('name') ?? searchParams.get('utm') ?? '';
  const fromUser = searchParams.get('ref_by') ?? '';
  const { slug } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { dataMe } = useGetMe();
  const { setLoginRequiredModal } = useLoginRequiredStore();
  const { activedTrigger, checkActivedTrigger } = useActivedTrigger();

  const fromSourceStorage = getCookieClient(String(process.env.NEXT_PUBLIC_APP_COOKIE_FROM_SOURCE));
  const refByStorage = getCookieClient(String(process.env.NEXT_PUBLIC_APP_COOKIE_REF_BY));
  const { triggerPostEnrollCourse } = usePostEnrollCourse(courseData?.cuid ?? '');

  const domain = courseData?.org?.alt_domain?.length > 0 ? courseData?.org?.alt_domain : courseData?.org?.domain;
  const isExternalDomain = useMemo(() => {
    if (process.env.NODE_ENV !== 'development' && typeof window !== 'undefined') {
      const isExternalLink =
        courseData?.org?.alt_domain !== new URL(location.origin).host &&
        courseData?.org?.domain !== new URL(location.origin).host;
      return isExternalLink;
    }
    return false;
  }, [courseData?.org]);

  useEffect(() => {
    if (refCode) {
      setCookieClient(process.env.NEXT_PUBLIC_COOKIE_REF_CODE, refCode, { maxAge: defaultExpiredTime });
    }
  }, [refCode]);

  useEffect(() => {
    let fromSourceVal = fromSource;

    if (fromUser && !fromSourceVal && courseData?.slug) {
      fromSourceVal = 'direct';
    }

    if (!fromSourceVal) {
      return;
    }
    if (!courseData?.slug) {
      return;
    }

    const newFromSource: FromSourceType = fromSourceStorage
      ? typeof fromSourceStorage === 'string'
        ? JSON.parse(fromSourceStorage)
        : fromSourceStorage
      : [];

    const existingEntry = newFromSource?.find(
      entry => entry?.courseSlug === courseData.slug && entry?.fromSource === fromSourceVal
    );

    if (!existingEntry) {
      newFromSource.push({
        fromSource: fromSourceVal,
        courseSlug: courseData.slug,
      });
      setCookieClient(process.env.NEXT_PUBLIC_COOKIE_FROM_SOURCE, JSON.stringify(newFromSource), {
        maxAge: defaultExpiredTime,
      });
    }
  }, [courseData, fromSource, fromSourceStorage, fromUser]);

  useEffect(() => {
    if (!fromUser) {
      return;
    }
    if (!courseData?.slug) {
      return;
    }

    const newFromUser: FromSourceType = refByStorage
      ? typeof refByStorage === 'string'
        ? JSON.parse(refByStorage)
        : refByStorage
      : [];

    const existingEntry = newFromUser?.find(
      entry => entry?.courseSlug === courseData.slug && entry?.fromSource === fromUser
    );

    if (!existingEntry) {
      newFromUser.push({
        fromSource: fromUser,
        courseSlug: courseData.slug,
      });
      setCookieClient(process.env.NEXT_PUBLIC_COOKIE_REF_BY, JSON.stringify(newFromUser), {
        maxAge: defaultExpiredTime,
      });
    }
  }, [courseData, fromUser, refByStorage]);

  const baseAction = useMemo(
    () =>
      determineAction({
        is_pay: courseData.price_settings?.is_pay ?? false,
        is_paid: courseData.is_paid ?? false,
        is_enrolled: courseData.is_enrolled ?? false,
        form_relations: courseData.form_relations ?? [],
        entityId: '',
      }),
    [courseData]
  );

  const currentAction = useMemo(() => (dataMe ? baseAction : ACTION_TYPES.LOGIN_REQUIRED), [dataMe, baseAction]);

  const actionHandler = ACTION_HANDLERS[currentAction];

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setIsLoading(true);
      event.preventDefault();
      event.stopPropagation();

      const entityId = event.currentTarget.id;
      const handleShowTrigger = () => {
        activedTrigger({ relations: courseData?.form_relations, entityId });
      };
      const shouldActiveTrigger = checkActivedTrigger({
        relations: courseData?.form_relations,
        entityId,
        type: 'clicked_on',
      });

      const params: ActionHandlerParams = {
        slug: slug as string,
        courseData,
        isExternalDomain: isExternalDomain as boolean,
        domain,
        router,
        setIsLoading,
        isCourseDetail,
        setLoginRequiredModal,
        triggerPostEnrollCourse,
        shouldActiveTrigger,
        handleShowTrigger,
        searchParams,
      };

      void actionHandler.handle(params);

      onClick?.(event);
      // setIsLoading(false)
    },
    [
      actionHandler,
      courseData,
      domain,
      isExternalDomain,
      router,
      isCourseDetail,
      setLoginRequiredModal,
      triggerPostEnrollCourse,
      slug,
      onClick,
      activedTrigger,
      checkActivedTrigger,
      searchParams,
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
    isLoading,
  };
};
