'use client';

import { useGetCourseById, usePutRelyFeedback } from '@oe/api';
import { useGetMe } from '@oe/api';
import { buildUrl } from '@oe/core';
import { toast } from '@oe/ui';
import { usePathname, useRouter } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';
import { DiscussItem } from './discuss-item';
import { SendReply } from './send-reply';

const FeedbackSection = ({ showFeedback }: { showFeedback: boolean }) => {
  const t = useTranslations('course.history.feedback');
  const tToast = useTranslations('course.history.toast');
  const params = useParams<{ courseId: string }>();
  const pathName = usePathname();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const courseId = params.courseId;
  const { course, mutateCourse } = useGetCourseById(courseId);
  const { dataMe: me } = useGetMe();
  const { triggerReplyFeedback } = usePutRelyFeedback(courseId as string);

  const renderedConversation = useMemo(() => {
    const orgDiscussion = course?.org_request?.props?.discussion || [];

    // const rootDiscussion = course?.root_request?.props?.discussion || [];
    const rootDiscussion: never[] = [];

    return [...orgDiscussion, ...rootDiscussion]?.sort((a, b) => {
      const dateA = new Date(a.send_date).getTime();
      const dateB = new Date(b.send_date).getTime();

      return dateA - dateB; // For ascending order. Use dateB - dateA for descending
    });
  }, [course]);

  const changeCurrentId = useCallback(
    (newId: string) => {
      const pathParts = pathName.split('/');
      const currentIdIndex = pathParts.indexOf(course?.id ?? '');

      if (currentIdIndex !== -1) {
        pathParts[currentIdIndex] = newId;
        const newPath = pathParts.join('/');
        // Add query params '?feedback=true' to open the feedback section when redirecting with new courseID
        router.push(buildUrl({ endpoint: newPath, queryParams: { feedback: true } }));
      }
    },
    [pathName, course?.id, router]
  );

  const scrollToBottom = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollIntoView();
    }
  }, []);

  const handleSubmit = useCallback(
    async (content: string, isIncludedCourse: boolean) => {
      // const requestId = isOrgFeedback ? course?.org_request?.id : course?.root_request?.id;
      const requestId = course?.org_request?.id;

      if (!requestId) {
        toast.error(tToast('missId'));
        return;
      }

      try {
        const res = await triggerReplyFeedback({
          id: requestId,
          content: content,
          entity_id: isIncludedCourse ? (courseId as string) : undefined,
        });

        if (!res) {
          throw new Error(tToast('replyFail'));
        }

        if (isIncludedCourse) {
          changeCurrentId(res.id);
        } else {
          await mutateCourse();
          scrollToBottom();
        }
      } catch {
        toast.error(tToast('replyFail'));
      }
    },
    [changeCurrentId, course?.org_request?.id, courseId, mutateCourse, scrollToBottom, tToast, triggerReplyFeedback]
  );

  return (
    <div
      className={`flex h-full shrink-0 flex-col gap-4 rounded-md bg-background p-4 transition-all duration-600 ease-in-out ${
        showFeedback
          ? 'w-1/3 translate-x-0 cursor-default opacity-100 md:flex'
          : 'pointer-events-none absolute right-0 w-0 translate-x-full opacity-0 md:flex'
      }`}
    >
      <div className="space-y-1 border-b p-2 ">
        <p className="font-bold text-lg">{t('title')}</p>
        <p className="text-foreground/80 text-xs">{t('subTitle')}</p>
      </div>

      <div className="flex min-h-[150px] flex-auto flex-auto flex-col gap-4 overflow-y-scroll">
        <div className="flex flex-col space-y-2">
          {renderedConversation?.map((discuss, index) => (
            <DiscussItem username={me?.username} discuss={discuss} key={`${discuss.id}${index}`} />
          ))}
        </div>
      </div>
      <SendReply onSubmit={handleSubmit} textareaRef={textareaRef} />
    </div>
  );
};

export { FeedbackSection };
